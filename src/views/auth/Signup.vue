<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { projectAuth } from '@/firebase/config';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const displayName = ref('');
    const error = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      error.value = null;
      isPending.value = true;

      try {
        const res = await createUserWithEmailAndPassword(projectAuth, email.value, password.value);
        await updateProfile(res.user, { displayName: displayName.value });

        isPending.value = false;

        if (!error.value) {
          router.push({ name: 'UserPlaylists' });
        }
      } catch (err) {
        console.error(err.message);
        error.value = err.message;
        isPending.value = false;
      }
    };

    return { email, password, displayName, handleSubmit, error, isPending };
  },
};
</script>
