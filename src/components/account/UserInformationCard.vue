<template>
  <v-card class="ma-8">
    <v-row>
      <v-col cols="2" class="d-flex align-center">
        <v-avatar
        color="info"
        size="x-large"
        class="ml-6 my-4">
          <v-icon dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>
        </v-col>
      <v-col cols="7"
        class="pa-4">
        <v-card-title>{{ user.firstName }} {{ user.lastName }}</v-card-title>
        <v-card-subtitle>Wizzer depuis : {{ durationBeingUser.duration }} {{ durationBeingUser.type === 0 ? durationBeingUser.duration > 1 ? $t('app.days') : $t('app.day') : durationBeingUser.type === 1 ? durationBeingUser.duration > 1 ? $t('app.monthes') : $t('app.month') : durationBeingUser.duration > 1 ? $t('app.years') : $t('app.year')}}</v-card-subtitle>
      </v-col>
      <v-col cols="3" class="d-flex align-center justify-end">
        <UserInformationUpdateForm>
        </UserInformationUpdateForm>
      </v-col>
    </v-row>
    <v-divider class="mx-4 mb-1"></v-divider>
    <v-card-text>
      <v-row class="ma-4">
        <v-col cols="4">
          <v-row class="ma-4">
            <span><h4>Email :</h4>{{ user.email }}</span>
          </v-row>
          <v-row class="ma-4">
            <span><h4>Anniversaire :</h4>{{ birthday }}</span>
          </v-row>
        </v-col>
        <v-col cols="8">
          <v-row class="ma-4">
            <span v-if="user.description"><h4>Description :</h4>{{ user.description }}</span>
            <span v-else><h4>Description :</h4>Aucune Description</span>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import UserInformationUpdateForm from './UserInformationUpdateForm.vue'

export default defineComponent({
  name: 'UserInformationCard',
    components:{
        UserInformationUpdateForm
    },

  computed: {
    ...mapGetters({
      user: 'getProfile',
      birthday: 'getBirthday',
      durationBeingUser: 'getDurationBeingUser',
    })
  }
})
</script>