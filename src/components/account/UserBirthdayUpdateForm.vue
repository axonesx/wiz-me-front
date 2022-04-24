<template>
  <v-row>
    <v-col cols=8>
      <v-form
        @change="disableButton"
        @blur="disableButton">
        <v-row class="justify-start">
          <Datepicker
            v-model="birthday"
            @blur="disableButton"
            @cleared="disableButton"
            :flow="flow"
            :format="format"
            :previewFormat="format"
            monthNameFormat="long"
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
        </v-row>
      </v-form>
    </v-col>
    <v-col cols=4>
      <v-btn
        flat
        text-color="blue"
        :disabled="!valid"
        @click="update"
      >
        {{ $t('accountPage.updateUser.form.saveBtn') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { store } from '../../store'
import { isAllItemsExist } from '../../services/utils.service'
import { dateFormat } from '../../services/date.service'


export default defineComponent({
  name: 'UserBirthdayUpdateForm',
  components: {
    Datepicker
  },

  setup: () => {
    const flow = ref(['year', 'month', 'calendar'])
    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    const format = (date: Date) => {
      return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/')
    }
    const now = new Date()
    const { t } = useI18n()
    const v$ = useVuelidate()
    return {
      flow,
      format,
      now,
      t,
      v$,
    }
  },

  data () {
    return {
      birthday: this.format(new Date(this.birthdayLabel)),
      valid: true,
      locale: 'fr',
    }
  },

 validations() {
    return {
      birthday: {
          required,
          $lazy: true
      },
    }
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
      if (!this.v$.birthday.$dirty) return errors
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.v$.birthday.required.$invalid && errors.push(this.$t('signUpPage.registration.form.birthday.required'))
      return errors
    },
  },
  methods: {
    formatDate (date: Date) {
      this.birthday = this.format(date)
    },
    disableButton () {
      const isAllRequiredItemsExist = isAllItemsExist([this.birthday])
      if (isAllRequiredItemsExist) {
        this.valid=true
      } else {
        this.valid=false
      }
    },
    async update () {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        const birthday = dateFormat(this.birthday)
        await store.dispatch('updateUser', { birthday } ).then(() => {
          this.$emit('displayForm')
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
  .dp__main {
    width:100% !important;
  }
</style>