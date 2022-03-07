<template>
  <AddActivity>
  </AddActivity>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import AddActivity from '../components/AddActivity.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    AddActivity
  },
});
</script>
