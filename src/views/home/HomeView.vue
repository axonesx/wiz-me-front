<template>
  <AddActivity>
  </AddActivity>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

import AddActivity from '../../components/AddActivity.vue';

export default {

  components: {
    AddActivity,
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
}
</script>
