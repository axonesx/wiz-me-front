<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      persistent
    >
      <template v-slot:activator="{ props }">
        <EditButton v-bind="props" :textBtn="$t('accountPage.updateUser.form.nameTooltip')"></EditButton>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ $t('accountPage.updateUser.form.nameTitle') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form
            @change="disableButton"
            @blur="disableButton">
            <v-row>
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
            </v-row>
            <v-row>
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
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            text
            @click="dialog = false"
          >
            {{ $t('accountPage.updateUser.form.closeBtn') }}
          </v-btn>
          <v-btn
            color="blue-darken-1"
            text
            :disabled="!valid"
            @click="update"
          >
            <v-progress-circular
              class='mx-auto'
              v-if="updateStatus==='loading'"
              indeterminate
            ></v-progress-circular>
            <div v-else>{{ $t('accountPage.updateUser.form.saveBtn') }}</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isAllItemsExist } from '../../services/utils.service'
import useVuelidate from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'
import EditButton from '../EditButton.vue'
import { useI18n } from 'vue-i18n'
import { store } from '../../store'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'UserNameUpdateForm',

  setup: () => {
    const { t } = useI18n()
    const v$ = useVuelidate()
    return {
      t,
      v$
    }
  },

  data () {
    return {
      firstName: this.firstNameLabel,
      lastName: this.lastNameLabel,
      valid: true,
      dialog: false,
    }
  },

  validations () {
    return {
      firstName: {
        required,
        maxLength: maxLength(200),
        minLength: minLength(2),
        $lazy: true,
      },
      lastName: {
        required,
        maxLength: maxLength(200),
        minLength: minLength(2),
        $lazy: true
      },
    }
  },

  components:{
      EditButton
  },

  props: {
    firstNameLabel: {
        type: String,
        required: true,
    },
    lastNameLabel: {
        type: String,
        required: true,
    },
  },
  computed: {
    ...mapGetters({
      updateStatus: 'getUserUpdateRequestStatus',
    }),
    firstNameErrors () {
      const errors: string[] = []
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!this.v$.firstName.$dirty) return errors
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.v$.firstName.required.$invalid && errors.push(this.$t('signUpPage.registration.form.firstName.required'))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.v$.firstName.maxLength.$invalid && errors.push(this.$t('signUpPage.registration.form.firstName.maxLength'))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.v$.firstName.minLength.$invalid && errors.push(this.$t('signUpPage.registration.form.firstName.minLength'))
      return errors
    },
    lastNameErrors () {
      const errors: string[] = []
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!this.v$.lastName.$dirty) return errors
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.v$.lastName.required.$invalid && errors.push(this.$t('signUpPage.registration.form.lastName.required'))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.v$.lastName.maxLength.$invalid && errors.push(this.$t('signUpPage.registration.form.lastName.maxLength'))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.v$.lastName.minLength.$invalid && errors.push(this.$t('signUpPage.registration.form.lastName.minLength'))
      return errors
    },
  },
  methods: {
    disableButton () {
      this.valid = this.v$.$errors.length === 0 && isAllItemsExist([this.firstName,this.lastName])
    },
    async update () {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        const { firstName, lastName } = this
        store.dispatch('updateUser', { firstName, lastName } ).then(() => {
          this.dialog = false
        })
      }
    },
  },
})
</script>

<style scoped>
  .v-btn--disabled {
    color: grey !important;
  }
</style>