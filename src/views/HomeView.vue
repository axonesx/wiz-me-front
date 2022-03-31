<template>
  <AddActivity v-if='user'>
  </AddActivity>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

// Components
import AddActivity from '../components/AddActivity.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    AddActivity
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
});
</script>
