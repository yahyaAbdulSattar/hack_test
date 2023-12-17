import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { projectAuth } from '../firebase/config';

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await signInWithEmailAndPassword(projectAuth, email, password);
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    console.error(err.message);
    error.value = 'Incorrect login credentials';
    isPending.value = false;
  }
};

const useLogin = () => {
  return { error, login, isPending };
};

export default useLogin;
