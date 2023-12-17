import { watchEffect, ref } from 'vue';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

const getDocument = (collectionName, id) => {
  const document = ref(null);
  const error = ref(null);

  // register the firestore document reference
  const documentRef = doc(projectFirestore, collectionName, id);

  const unsub = onSnapshot(documentRef, (doc) => {
    // need to make sure the doc exists & has data
    if (doc.exists()) {
      document.value = { ...doc.data(), id: doc.id };
      error.value = null;
    } else {
      error.value = 'That document does not exist';
    }
  }, (err) => {
    console.error(err.message);
    error.value = 'Problem fetching the document';
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
