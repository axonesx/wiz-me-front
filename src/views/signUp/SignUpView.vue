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
        {{ $t('signUpPage.registration.form.email.label') }}
      </template></v-text-field>
      <v-text-field
        v-model="v$.password.$model"
        :error-messages="passwordErrors"
        type="password"
        required
        @input="v$.password.$touch()"
        @blur="v$.password.$touch()"
      >
      <template v-slot:label>
        {{ $t('signUpPage.registration.form.password.label') }}
      </template></v-text-field>
      <v-text-field
        v-model="v$.confirmPassword.$model"
        :error-messages="confirmPasswordErrors"
        type="password"
        required
        @input="v$.confirmPassword.$touch()"
        @blur="v$.confirmPassword.$touch()"
      >
      <template v-slot:label>
        {{ $t('signUpPage.registration.form.confirmPassword.label') }}
      </template></v-text-field>
      <v-text-field
        v-model="v$.firstName.$model"
        :error-messages="firstNameErrors"
        :counter="200"
        required
        @input="v$.firstName.$touch()"
        @blur="v$.firstName.$touch()"
      >
      <template v-slot:label>
        {{ $t('signUpPage.registration.form.firstName.label') }}
      </template></v-text-field>
      <v-text-field
        v-model="v$.lastName.$model"
        :error-messages="lastNameErrors"
        :counter="200"
        required
        @input="v$.lastName.$touch()"
        @blur="v$.lastName.$touch()"
      >
      <template v-slot:label>
        {{ $t('signUpPage.registration.form.lastName.label') }}
      </template></v-text-field>

      <Datepicker
        class="mb-6"
        v-model="birthday"
        @blur="disableButton"
        @cleared="disableButton"
        :flow="flow"
        :locale="locale"
        autoApply
        :maxDate="now"
        @update:modelValue="formatDate"
        :enableTimePicker="false"
      >
        <template #trigger>
            <v-text-field
              clearable
              readonly
              v-model="v$.birthday.$model"
              :error-messages="birthdayErrors"
              required
              @input="v$.birthday.$touch()"
              @blur="v$.birthday.$touch();disableButton()"
              @clear="disableButton"
            >
          <template v-slot:label>
            {{ $t('signUpPage.registration.form.birthday.label') }}
          </template></v-text-field>
        </template>
      </Datepicker>
      <v-btn
        class="mb-6"
        color="success"
        :disabled="valid"
        @click="signUp"
        width=150
      >
        <v-progress-circular
          class='mx-auto'
          v-if="signUpStatus==='loading'"
          indeterminate
        ></v-progress-circular>
        <div v-else>{{ $t('signUpPage.registration.button') }}</div>
      </v-btn>
      <v-divider></v-divider>
      <span>{{ $t('signUpPage.registration.login.span') }}<a href="/login">{{ $t('signUpPage.registration.login.link') }}</a></span>
    </v-form>
  </v-card>
</template>

<script>
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, maxLength, minLength } from '@vuelidate/validators'
import { store } from '../../store'
import router from '../../router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { isAllItemsExist } from '../../services/utils.service'
import { mapGetters } from 'vuex'
import { formatDateInput, dateFormat } from '../../services/date.service'

const passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
const isPassword = (value) => value.match(passwordRegex)

export default {
  components: { Datepicker },
  setup () {
    const flow = ref(['year', 'month', 'calendar'])
    const now = new Date()
    return {
      flow,
      now,
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
      birthday: '',
      valid: true,
      locale: 'fr',
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
          maxLength: maxLength(200),
          minLength: minLength(2),
          $lazy: true
      },
      lastName: {
          required,
          maxLength: maxLength(200),
          minLength: minLength(2),
          $lazy: true
      },
      birthday: {
          required,
          $lazy: true
      },
    }
  },
  computed: {
    ...mapGetters({
      signUpStatus: 'getSignUpStatus',
    }),
    emailErrors () {
      const errors = []
      if (!this.v$.email.$dirty) return errors
      this.v$.email.required.$invalid && errors.push(this.$t('signUpPage.registration.form.email.required'))
      this.v$.email.email.$invalid && errors.push(this.$t('signUpPage.registration.form.email.isEmail'))
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.v$.password.$dirty) return errors
      this.v$.password.required.$invalid && errors.push(this.$t('signUpPage.registration.form.password.required'))
      this.v$.password.isPassword.$invalid && errors.push(this.$t('signUpPage.registration.form.password.isPassword'))
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.v$.confirmPassword.$dirty) return errors
      this.v$.confirmPassword.required.$invalid && errors.push(this.$t('signUpPage.registration.form.confirmPassword.required'))
      this.v$.confirmPassword.sameAsPassword.$invalid && errors.push(this.$t('signUpPage.registration.form.confirmPassword.sameAsPassword'))
      return errors
    },
    firstNameErrors () {
      const errors = []
      if (!this.v$.firstName.$dirty) return errors
      this.v$.firstName.required.$invalid && errors.push(this.$t('signUpPage.registration.form.firstName.required'))
      this.v$.firstName.maxLength.$invalid && errors.push(this.$t('signUpPage.registration.form.firstName.maxLength'))
      this.v$.firstName.minLength.$invalid && errors.push(this.$t('signUpPage.registration.form.firstName.minLength'))
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.v$.lastName.$dirty) return errors
      this.v$.lastName.required.$invalid && errors.push(this.$t('signUpPage.registration.form.lastName.required'))
      this.v$.lastName.maxLength.$invalid && errors.push(this.$t('signUpPage.registration.form.lastName.maxLength'))
      this.v$.lastName.minLength.$invalid && errors.push(this.$t('signUpPage.registration.form.lastName.minLength'))
      return errors
    },
    birthdayErrors () {
      const errors = []
      if (!this.v$.birthday.$dirty) return errors
      this.v$.birthday.required.$invalid && errors.push(this.$t('signUpPage.registration.form.birthday.required'))
      return errors
    },
  },
  methods: {
    formatDate (date) {
      this.birthday = formatDateInput(date)
    },
    async disableButton () {
      const isAllRequiredItemsExist = isAllItemsExist([this.email,this.password,this.confirmPassword,this.firstName,this.lastName,this.birthday])
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
        const birthday = dateFormat(this.birthday)
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
