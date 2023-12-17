import { ref, watchEffect } from 'vue';
import { collection, query, onSnapshot, where, getFirestore, serverTimestamp } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

const getCollection = (collectionName, queryConditions) => {
  const documents = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  const collectionRef = collection(projectFirestore, collectionName);
  const orderedCollection = query(collectionRef, orderBy('createdAt'));

  let finalCollection = orderedCollection;

  if (queryConditions) {
    finalCollection = where(...queryConditions)(orderedCollection);
  }

  const unsub = onSnapshot(finalCollection, (snap) => {
    let results = [];
    snap.docs.forEach((doc) => {
      // must wait for the server to create the timestamp & send it back
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
    });

    // update values
    documents.value = results;
    error.value = null;
  }, (err) => {
    console.error(err.message);
    documents.value = null;
    error.value = 'Could not fetch the data';
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
