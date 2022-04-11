<template>
  <v-card
    class="login-card pa-6 mt-12 mx-auto">

    <v-card-header>
      <v-card-header-text>
        <v-card-title>{{ $t('loginPage.login.title') }}</v-card-title>
        <v-card-subtitle>
          <span class="mr-1">{{ $t('loginPage.login.subtitle') }}</span>
        </v-card-subtitle>
      </v-card-header-text>
    </v-card-header>

    <form
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
        {{ $t('loginPage.login.form.email') }}
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
        {{ $t('loginPage.login.form.password') }}
      </template></v-text-field>
      <v-btn
        class="mb-6"
        color="success"
        :disabled="valid"
        @click="login"
      >
      {{ $t('loginPage.login.button') }}
      </v-btn>
      <v-divider></v-divider>
      <span class="mt-6">{{ $t('loginPage.login.registration.span') }}<a href="/sign-up">{{ $t('loginPage.login.registration.link') }}</a></span>
    </form>

    <v-alert v-if="signUpStatus === 'success'"
      type="success"
      variant="contained-text"
      closable
      close-label="Close Alert"
      class="mt-6"
      color="green"
    >
      <template v-slot:title>
        {{ $t('loginPage.registration.success.title') }}
      </template>
        {{ $t('loginPage.registration.success.text') }}
    </v-alert>
    <v-alert v-if="logoutStatus === 'success'"
      type="success"
      variant="contained-text"
      closable
      close-label="Close Alert"
      class="mt-6"
      color="green"
    >
      <template v-slot:title>
        {{ $t('loginPage.logout.success.title') }}
      </template>
        {{ $t('loginPage.logout.success.text') }}
    </v-alert>
    <v-alert v-if="authStatus === 'error'"
      type="error"
      variant="contained-text"
      closable
      close-label="Close Alert"
      class="mt-6"
      color="red"
    >
      <template v-slot:title>
        {{ $t('loginPage.logout.success.title') }}
      </template>
        {{ $t('loginPage.logout.success.text') }}
    </v-alert>
  </v-card>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { store } from '../../store'
import router from '../../router'
import { isAllItemsExist } from '../../services/utils.service'
import { mapGetters } from 'vuex'
import { useI18n } from 'vue-i18n'

export default {
  setup () {
    const { t } = useI18n()
    return {
      t,
      v$: useVuelidate() 
    }
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
    ...mapGetters({
      signUpStatus: 'getSignUpStatus',
      authStatus: 'getAuthStatus',
      logoutStatus: 'getLogoutStatus',
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
      return errors
    },
  },
  methods: {
    async disableButton () {
      const isAllRequiredItemsExist = isAllItemsExist([this.email,this.password])
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
  text-decoration: none
}
.login-card {
    max-width:450px
}
</style>