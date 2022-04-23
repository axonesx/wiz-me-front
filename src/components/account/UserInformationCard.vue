<template>
  <v-card class="ma-8">
    <v-row class="ma-4">
      <v-col cols="3" class="d-flex align-center">
        <v-avatar
        color="info"
        size="128"
        class="ml-6">
          <span class="white--text text-h5">AW</span>
        </v-avatar>
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <UserAvatarUpdateForm
          class="edit-btn by-col"
          :firstNameLabel=user.firstName
          :lastNameLabel=user.lastName
        >
        </UserAvatarUpdateForm>
      </v-col>
      <v-col cols="6"
        class="pt-7">
        <v-card-title>{{ user.firstName }} {{ user.lastName }}</v-card-title>
        <v-card-subtitle><h4><pre>Email : </pre></h4> {{ user.email }}</v-card-subtitle>
        <v-card-subtitle>Wizzer depuis : {{ durationBeingUser.duration }} {{ durationBeingUser.type === 0 ? durationBeingUser.duration > 1 ? $t('app.days') : $t('app.day') : durationBeingUser.type === 1 ? durationBeingUser.duration > 1 ? $t('app.monthes') : $t('app.month') : durationBeingUser.duration > 1 ? $t('app.years') : $t('app.year')}}</v-card-subtitle>
      </v-col>
      <v-col cols="2" class="d-flex align-center justify-end">
        <UserNameUpdateForm
          class="edit-btn by-col"
          :firstNameLabel=user.firstName
          :lastNameLabel=user.lastName
        >
        </UserNameUpdateForm>
      </v-col>
    </v-row>
    <v-divider class="mx-16 mb-1"></v-divider>
      <v-row class="ma-5">
        <v-col cols="10" class="pl-10">
            <span><h4>Anniversaire :</h4>{{ birthday }}</span>
        </v-col>
        <v-col cols="2" class="d-flex align-center">
          <UserBirthdayUpdateForm class="edit-btn by-row">
          </UserBirthdayUpdateForm>
        </v-col>
      </v-row>

      <v-row class="ma-4">
        <v-col cols="10" class="pl-10">
          <span v-if="user.description"><h4>Description :</h4>{{ user.description }}</span>
          <span v-else><h4>Description :</h4>Aucune Description</span>
        </v-col>
        <v-col cols="2" class="d-flex align-center">
          <UserDescriptionUpdateForm class="edit-btn by-row"
          :descriptionLabel=user.description>
          </UserDescriptionUpdateForm>
        </v-col>
      </v-row>

  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import UserNameUpdateForm from './UserNameUpdateForm.vue'
import UserAvatarUpdateForm from './UserAvatarUpdateForm.vue'
import UserDescriptionUpdateForm from './UserDescriptionUpdateForm.vue'
import UserBirthdayUpdateForm from './UserBirthdayUpdateForm.vue'

export default defineComponent({
  name: 'UserInformationCard',
    components:{
        UserNameUpdateForm,
        UserAvatarUpdateForm,
        UserDescriptionUpdateForm,
        UserBirthdayUpdateForm,
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

<style scoped>
  .edit-btn{
    display: none;
  }
  .v-row:hover > .v-col > .by-row{
    display: flex;
  }

  .v-col:hover + .v-col > .by-col{
    display: flex;
  }

  .v-col:hover > .by-col{
    display: flex;
  }
</style>