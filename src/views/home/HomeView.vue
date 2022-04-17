<template>
  <v-card class="ma-8 pa-8">
    <h1>Title Exemple</h1>
    <AddActivity>
    </AddActivity>
  </v-card>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import AddActivity from '../../components/AddActivity.vue'

export default {

  components: {
    AddActivity,
  },
  computed: {
    ...mapGetters({
    })
  }
}
</script>
