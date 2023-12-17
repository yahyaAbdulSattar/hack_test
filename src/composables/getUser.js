import { ref, watchEffect } from 'vue';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { projectAuth } from '../firebase/config';

// refs
const user = ref(projectAuth.currentUser);

// auth changes
const unsub = onAuthStateChanged(projectAuth, (_user) => {
  console.log('User state change. Current user is:', _user);
  user.value = _user;
});

// Watch effect to clean up the subscription when the component is unmounted
watchEffect((onInvalidate) => {
  onInvalidate(() => unsub());
});

const getUser = () => {
  return { user };
};

export default getUser;
