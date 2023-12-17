<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { projectAuth } from '@/firebase/config';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      error.value = null;
      isPending.value = true;

      try {
        const res = await signInWithEmailAndPassword(projectAuth, email.value, password.value);
        isPending.value = false;

        if (!error.value) {
          router.push({ name: 'UserPlaylists' });
        }
      } catch (err) {
        console.error(err.message);
        error.value = 'Incorrect login credentials';
        isPending.value = false;
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>
