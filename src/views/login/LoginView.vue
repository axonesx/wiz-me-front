<template>
  <v-card
    width="450px"
    class="pa-6 mt-12 mx-auto min-width=300px">

    <v-card-header>
      <v-card-header-text>
        <v-card-title>Log-In</v-card-title>
        <v-card-subtitle>
          <span class="mr-1">Please identify yourself</span>
        </v-card-subtitle>
      </v-card-header-text>
    </v-card-header>

    <form
    @change="disableButton"
    @blur="disableButton">
      <v-text-field
        v-model="v$.email.$model"
        label="Enter your E-mail"
        :error-messages="emailErrors"
        required
        @input="v$.email.$touch()"
        @blur="v$.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="v$.password.$model"
        label="Enter your Password"
        :error-messages="passwordErrors"
        required
        @input="v$.password.$touch()"
        @blur="v$.password.$touch()"
      ></v-text-field>
      <span class="float-left">Not yet registered ? <a href="/sign-up">Sign Up here</a></span>
      <v-btn
        class="float-right"
        color="success"
        :disabled="valid"
        @click="login"
      >
        login
      </v-btn>
    </form>
  </v-card>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { store } from '../../store'
import router from '../../router'
import { isItemsExist } from '../../services/utils.service'

export default {
  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      email: '',
      password: '',
      valid:true
    }
  },
    
  validations() {
    return {
      email: {
          required, 
          email, 
          $lazy: true
      },
      password: {
          required, 
          $lazy: true
      },
    }
  },

  computed: {
    emailErrors () {
      const errors = []
      if (!this.v$.email.$dirty) return errors
      this.v$.email.required.$invalid && errors.push('Email is required.')
      this.v$.email.email.$invalid && errors.push('Must be an email')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.v$.password.$dirty) return errors
      this.v$.password.required.$invalid && errors.push('Password is required.')
      return errors
    },
  },  
  methods: {  
    async disableButton () {
      const isAllRequiredItemsExist = isItemsExist([this.email,this.password])
      const isFormCorrect = this.v$.$errors.length === 0 && isAllRequiredItemsExist
      if (isFormCorrect) {
        this.valid=false
      } else {
        this.valid=true
      }
    },
    async login () {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        const { email, password } = this
        store.dispatch('loginUser', { email, password }).then(() => {
          router.push('/')
        })
      } 
    },
  },
  
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>