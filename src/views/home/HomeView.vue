<template>
  <v-card>
    <v-list density="compact">
      <v-list-subheader>Bienvenue !</v-list-subheader>
      <v-list-item active-color="primary">
        <v-list-item-title v-text="user.firstName"></v-list-item-title>
      </v-list-item>
      <v-list-item active-color="primary">
        <v-list-item-title v-text="user.lastName"></v-list-item-title>
      </v-list-item>
      <v-list-item active-color="primary">
        <v-list-item-title v-text="user.email"></v-list-item-title>
      </v-list-item>
      <v-list-item active-color="primary">
        <v-list-item-title v-text="user.birthday"></v-list-item-title>
      </v-list-item>
    </v-list>


    <h1>Start by adding activity :</h1>
    <AddActivity>
    </AddActivity>
  </v-card>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import AddActivity from '../../components/AddActivity.vue'

export default {

  components: {
    AddActivity,
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  }
}
</script>
