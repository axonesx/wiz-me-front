<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      persistent
    >
      <template v-slot:activator="{ props }">
        <EditButton v-bind="props" textBtn="accountPage.updateUser.form.birthdayTooltip"></EditButton>
      </template>
      <v-card width="550">
        <v-card-title>
          <span class="text-h5">{{ $t('accountPage.updateUser.form.birthdayTitle') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form
            @change="disableButton"
            @blur="disableButton">
            <v-row>
              <Datepicker
                class="mb-6"
                v-model="birthday"
                :enableTimePicker="false"
                @blur="disableButton"
                @cleared="disableButton"
                required
              />
              <template v-slot:label>
                {{ $t('accountPage.updateUser.form.birthday') }}
              </template>
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
            {{ $t('accountPage.updateUser.form.saveBtn') }}
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
import { required } from '@vuelidate/validators'
import EditButton from '../EditButton.vue'
import { useI18n } from 'vue-i18n'
import { store } from '../../store'
import router from '../../router'
import Datepicker from '@vuepic/vue-datepicker'

export default defineComponent({
  name: 'UserbirthdayUpdateForm',
  components: {
    Datepicker,
    EditButton
  },

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
      birthday: this.birthdayLabel,
      menu: false,
      valid: true,
      dialog: false,
    }
  },

  validations () {
    return {
      birthday: {
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

  props: {
    birthdayLabel: {
        type: Date,
        required: true,
    },
  },
  computed: {
    birthdayErrors () {
      const errors: string[] = []
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!this.v$.date.$dirty) return errors
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.v$.birthday.required.$invalid && errors.push(this.$t('signUpPage.registration.form.birthday.maxLength'))
      return errors
    },
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    disableButton () {
      const isAllRequiredItemsExist = isAllItemsExist([this.date])
      const isFormCorrect = this.v$.$errors.length === 0 && isAllRequiredItemsExist
      if (isFormCorrect) {
        this.valid=true
      } else {
        this.valid=false
      }
    },
    async update () {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        const { birthday } = this
        await store.dispatch('updateUser', { birthday } ).then(() => {
          this.dialog = false
          router.push('/account')
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