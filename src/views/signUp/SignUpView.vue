<template>
  <v-card
    class="signup-card pa-6 mt-12 mx-auto">


    <v-alert v-if="signUpStatus === 'error'"
      type="error"
      variant="contained-text"
      closable
      close-label="Close Alert"
      color="red"
    >
      <template v-slot:title>
        {{ $t('signUpPage.registration.error.title') }}
      </template>
        {{ $t('signUpPage.registration.error.text') }}
      
    </v-alert>
    <v-card-header>
      <v-card-header-text>
        <v-card-title>{{ $t('signUpPage.registration.title') }}</v-card-title>
        <v-card-subtitle>
          <span class="mr-1">{{ $t('signUpPage.registration.subtitle') }}</span>
        </v-card-subtitle>
      </v-card-header-text>
    </v-card-header>

    <v-form
      @change="disableButton"
      @blur="disableButton"
    >
      <v-text-field
        v-model="v$.email.$model"
        :error-messages="emailErrors"
        required
        @input="v$.email.$touch()"
        @blur="v$.email.$touch()"
      >
      <template v-slot:label>
        {{ $t('signUpPage.registration.form.email') }}
      </template></v-text-field>
      <v-text-field
        v-model="v$.password.$model"
        label="Enter your Password"
        :error-messages="passwordErrors"
        type="password"
        required
        @input="v$.password.$touch()"
        @blur="v$.password.$touch()"
      >
      <template v-slot:label>
        {{ $t('signUpPage.registration.form.password') }}
      </template></v-text-field>
      <v-text-field
        v-model="v$.confirmPassword.$model"
        label="Confirme your Password"
        :error-messages="confirmPasswordErrors"
        type="password"
        required
        @input="v$.confirmPassword.$touch()"
        @blur="v$.confirmPassword.$touch()"
      >
      <template v-slot:label>
        {{ $t('signUpPage.registration.form.confirmPassword') }}
      </template></v-text-field>
      <v-text-field
        v-model="v$.firstName.$model"
        label="Enter your first Name"
        :error-messages="firstNameErrors"
        required
        @input="v$.firstName.$touch()"
        @blur="v$.firstName.$touch()"
      >
      <template v-slot:label>
        {{ $t('signUpPage.registration.form.firstName') }}
      </template></v-text-field>
      <v-text-field
        v-model="v$.lastName.$model"
        label="Enter your last Name"
        :error-messages="lastNameErrors"
        required
        @input="v$.lastName.$touch()"
        @blur="v$.lastName.$touch()"
      >
      <template v-slot:label>
        {{ $t('signUpPage.registration.form.lastName') }}
      </template></v-text-field>
      <v-card-subtitle>
        <span class="mr-1">{{ $t('signUpPage.registration.form.birthday') }}</span>
      </v-card-subtitle>
      <Datepicker
        class="mb-6"
        v-model="date"
        :enableTimePicker="false"
        @blur="disableButton"
        @cleared="disableButton"
        required
      />
      <v-btn
        class="mb-6"
        color="success"
        :disabled="valid"
        @click="signUp"
      >
      {{ $t('signUpPage.registration.button') }}
      </v-btn>
      <v-divider></v-divider>
      <span>{{ $t('signUpPage.registration.login.span') }}<a href="/login">{{ $t('signUpPage.registration.login.link') }}</a></span>
    </v-form>
  </v-card>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import { store } from '../../store'
import router from '../../router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { isAllItemsExist } from '../../services/utils.service'
import { mapGetters } from 'vuex'

const passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
const isPassword = (value) => value.match(passwordRegex)

export default {
  components: { Datepicker },
  setup () {
    return {
      v$: useVuelidate(),
    }
  },

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      date: '',
      menu: false,
      valid: true,
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
          isPassword,
          $lazy: true
      },
      confirmPassword: {
          required,
          sameAsPassword: sameAs(this.password),
          $lazy: true
      },
      firstName: {
          required,
          $lazy: true
      },
      lastName: {
          required,
          $lazy: true
      },
      date: {
          required,
          $lazy: true
      },
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  computed: {
    ...mapGetters({
      signUpStatus: 'getSignUpStatus',
    }),
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
      this.v$.password.isPassword.$invalid && errors.push('Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:.')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.v$.confirmPassword.$dirty) return errors
      this.v$.confirmPassword.required.$invalid && errors.push('Password is required.')
      this.v$.confirmPassword.sameAsPassword.$invalid && errors.push('Must be the same as password.')
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.v$.firstName.$dirty) return errors
      this.v$.firstName.required.$invalid && errors.push('First name is required.')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.v$.lastName.$dirty) return errors
      this.v$.lastName.required.$invalid && errors.push('Last name is required.')
      return errors
    },
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    async disableButton () {
      const isAllRequiredItemsExist = isAllItemsExist([this.email,this.password,this.confirmPassword,this.firstName,this.lastName,this.date])
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
        const { email, password, firstName, lastName } = this
        const birthday = this.date
        store.dispatch('signupUser', { email, password, firstName, lastName, birthday } ).then(() => {
          router.push('/')
        })
      }
    },
  },
}
</script>


<style scoped>
a {
  text-decoration: none
}
.signup-card {
    max-width:450px
}
</style>
