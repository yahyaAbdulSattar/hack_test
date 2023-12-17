<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a New Playlist</router-link>
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';
import { ref, onUnmounted } from 'vue';
import { projectAuth } from '@/firebase/config'; // Update this import

export default {
  components: { ListView },
  setup() {
    // const { user } = getUser();
    const playlists = ref(null);

    // Ensure the user is authenticated before fetching the playlists
    const unsubscribe = projectAuth.onAuthStateChanged(async (_user) => {
      if (_user) {
        const { documents } = getCollection('playlists', ['userId', '==', _user.uid]);
        playlists.value = documents;
      } else {
        playlists.value = null;
      }
    });

    // Cleanup the subscription when the component is unmounted
    onUnmounted(() => {
      unsubscribe();
    });

    return { playlists };
  }
}
</script>

<style scoped>
  h2 {
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--secondary)
  }
  .btn {
    margin-top: 20px;
  }
</style>