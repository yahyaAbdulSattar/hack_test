import { ref } from 'vue';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

const useDocument = (collectionName, id) => {
  const error = ref(null);
  const isPending = ref(false);
  const docRef = doc(projectFirestore, collectionName, id);

  const deleteDocFromCollection = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await deleteDoc(docRef);
      isPending.value = false;
      return res;
    } catch (err) {
      console.error(err.message);
      isPending.value = false;
      error.value = 'Could not delete the document';
    }
  };

  const updateDocInCollection = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await updateDoc(docRef, updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.error(err.message);
      isPending.value = false;
      error.value = 'Could not update the document';
    }
  };

  return { error, isPending, deleteDocFromCollection, updateDocInCollection };
};

export default useDocument;
