<template>
  <v-card class="ma-8">
    <v-row class="mx-4 mt-2 d-flex align-center justify-space-between">
      <v-col cols="2" class="d-flex justify-center">
      </v-col>
      <v-col cols="8" class="d-flex justify-center">
        <v-avatar
        color="info"
        size="128"
        >
          <img
            v-if="user.avatarPath"
            :src="user.avatarPath"
          >
          <span v-else class="white--text text-h5">{{ initial }}</span>
        </v-avatar>
      </v-col>
      <v-col cols="2">
        <UserAvatarUpdateForm
          class="edit-btn by-row"
        >
        </UserAvatarUpdateForm>
      </v-col>
    </v-row>
    <v-row class="mx-4 d-flex align-center justify-space-between">
      <v-col cols="2" class="d-flex justify-center">
      </v-col>
      <v-col cols="8" class="d-flex justify-center">
        <div>
          <v-card-title class="d-flex justify-center">{{ user.firstName }} {{ user.lastName }}</v-card-title>
          <v-card-subtitle class="d-flex justify-center"><h4><pre>{{$t('accountPage.updateUser.email')}}</pre></h4> {{ user.email }}</v-card-subtitle>
          <v-card-subtitle class="d-flex justify-center">{{$t('accountPage.updateUser.wizzerSince')}}{{ durationBeingUser.duration }} {{ durationBeingUser.type === 0 ? durationBeingUser.duration > 1 ? $t('app.days') : $t('app.day') : durationBeingUser.type === 1 ? durationBeingUser.duration > 1 ? $t('app.monthes') : $t('app.month') : durationBeingUser.duration > 1 ? $t('app.years') : $t('app.year')}}</v-card-subtitle>
        </div>
      </v-col>
      <v-col cols="2">
        <UserNameUpdateForm
          class="edit-btn by-row"
          :firstNameLabel="user.firstName"
          :lastNameLabel="user.lastName"
        >
        </UserNameUpdateForm>
      </v-col>
    </v-row>
    <v-divider class="mx-16 my-4"></v-divider>
    <v-row class="ma-4 d-flex align-center">
      <v-col cols="10" class="pl-10">
          <span><h4>{{$t('accountPage.updateUser.birthday')}}</h4>{{ birthday }}</span>
      </v-col>
      <v-col cols="2" class="d-flex justify-center">
        <EditButton
          class="edit-btn by-row"
          :textBtn="$t('accountPage.updateUser.form.birthdayTooltip')"
          @click="displayForm"
        >
        </EditButton>
      </v-col>
    </v-row>
    <v-row class="mx-6 d-flex align-center">
      <v-col cols="12">
          <div
            :style="{ display: 'none' }"
            ref="editUserBirthday">
            <UserBirthdayUpdateForm
              :birthdayLabel="new Date(user.birthday)"
              @displayForm="displayForm"
            ></UserBirthdayUpdateForm>
          </div>
      </v-col>
    </v-row>

    <v-row class="mx-4 mb-4 d-flex align-center">
      <v-col cols="10" class="pl-10">
        <span class="description" v-if="user.description"><h4>Description :</h4>{{ user.description }}</span>
        <span v-else><h4>{{$t('accountPage.updateUser.description')}}</h4>Aucune Description</span>
      </v-col>
      <v-col cols="2">
        <UserDescriptionUpdateForm class="edit-btn by-row"
        :descriptionLabel="user.description">
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
import EditButton from '../EditButton.vue'

export default defineComponent({
  name: 'UserInformationCard',
  components:{
      UserNameUpdateForm,
      UserAvatarUpdateForm,
      UserDescriptionUpdateForm,
      EditButton,
      UserBirthdayUpdateForm,
  },

  computed: {
    ...mapGetters({
      user: 'getProfile',
      birthday: 'getBirthday',
      durationBeingUser: 'getDurationBeingUser',
      initial: 'getInitial',
    })
  },
  methods: {
    displayForm() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if(this.$refs.editUserBirthday.style.display === "none"){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$refs.editUserBirthday.style.display = "flex"
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$refs.editUserBirthday.style.display = "none"
      }
    }
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
  .description {
    white-space: pre-wrap;
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>