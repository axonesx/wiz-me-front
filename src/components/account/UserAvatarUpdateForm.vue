<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
    >
      <template v-slot:activator="{ props }">
        <EditButton v-bind="props" textBtn="Edit Description"></EditButton>
      </template>
      <v-card width="550">
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-form
            @change="disableButton"
            @blur="disableButton">
            <v-row>
              <v-file-input
                label="File input"
                filled
                prepend-icon="mdi-camera"
              >
              <template v-slot:label>
                {{ $t('updateUser.form.file') }}
              </template></v-file-input>
            </v-row>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { isAllItemsExist } from '../../services/utils.service'
import useVuelidate, { ValidationRuleWithoutParams, ValidationRuleWithParams } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { store } from '../../store'
import router from '../../router'
import EditButton from '../EditButton.vue'

const passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
const isPassword = (value: string) => value.match(passwordRegex)

export default defineComponent({
  name: 'UserAvatarUpdateForm',
  setup () {
    return {
      v$: useVuelidate(),
    }
  },
  components:{
      EditButton
  },
  props: {
    firstNameLabel: {
        type: String,
    },
    lastNameLabel: {
        type: String,
    },
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      valid: true,
      dialog: false,
    }
  },

  validations() {
    return {
      firstName: {
          required,
          $lazy: true
      },
      lastName: {
          required,
          $lazy: true
      },
    }
  },

  computed: {
    ...mapGetters({
    }),
    // firstNameErrors () {
    //   const errors: string[] = []
    //   const firstName = this.v$.firstName.$dirty
    //   if (!this.v$.firstName.$dirty) return errors
    //   this.v$.firstName.required.$invalid && errors.push('First name is required.')
    //   return errors
    // },
    // lastNameErrors () {
    //   const errors: string[] = []
    //   if (!this.v$.lastName.$dirty) return errors
    //   this.v$.lastName.required.$invalid && errors.push('Last name is required.')
    //   return errors
    // },
  },
  methods: {
    async disableButton () {
      const isAllRequiredItemsExist = isAllItemsExist([this.firstName,this.lastName])
      const isFormCorrect = this.v$.$errors.length === 0 && isAllRequiredItemsExist
      if (isFormCorrect) {
        this.valid=false
      } else {
        this.valid=true
      }
    },
    async signUp () {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        const {firstName, lastName } = this
        store.dispatch('updateUser', { firstName, lastName } ).then(() => {
          router.push('/')
        })
      }
    },
  },
})
</script>

<style scoped>

</style>