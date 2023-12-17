import { projectStorage } from '../firebase/config';
import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  // Initialize user as a ref
  const user = ref(null);

  // Listen to authentication state changes
  onAuthStateChanged(projectAuth, (_user) => {
    user.value = _user;
  });

  const uploadImage = async (file) => {
    if (!user.value) {
      error.value = 'User not authenticated';
      return;
    }

    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.error(err.message);
      error.value = err;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      await storageRef.delete();
    } catch (err) {
      console.error(err.message);
      error.value = err;
    }
  };

  return { uploadImage, deleteImage, url, filePath, error };
};

export default useStorage;
