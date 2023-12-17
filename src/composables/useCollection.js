import { ref } from 'vue';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

const useCollection = (collectionName) => {
  const error = ref(null);
  const isPending = ref(false);

  // add a new document
  const addDocToCollection = async (doc) => {
    error.value = null;
    isPending.value = true;

    try {
      const collectionRef = collection(projectFirestore, collectionName);
      const res = await addDoc(collectionRef, doc);
      isPending.value = false;
      return res;
    } catch (err) {
      console.error(err.message);
      error.value = 'Could not send the message';
      isPending.value = false;
    }
  };

  return { error, addDocToCollection, isPending };
};

export default useCollection;
