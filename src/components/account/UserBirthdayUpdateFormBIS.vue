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
            <v-row class="row-datepicker justify-center">
              <!-- <Datepicker
                v-model="birthday"
                :enableTimePicker="false"
                @blur="disableButton"
                @cleared="disableButton"
                required
              /> -->
              <!-- <template v-slot:label>
                {{ $t('accountPage.updateUser.form.birthday') }}
              </template> -->
              <datepicker
                class="datepicker"
                v-model="birthday"
                :starting-view="month"
                :upper-limit="now"
                :style="{...styleObj, padding: '10px'}"
                :clearable="true"
              >
                <template v-slot:clear="{ onClear }">
                  <button @click="onClear">x</button>
                </template>
              </datepicker>
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
import { computed, defineComponent, ref, reactive } from 'vue'
import { isAllItemsExist } from '../../services/utils.service'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import EditButton from '../EditButton.vue'
import { useI18n } from 'vue-i18n'
import { store } from '../../store'
import router from '../../router'
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from 'vue3-datepicker'


export default defineComponent({
  name: 'UserbirthdayUpdateForm',
  components: {
    EditButton,
    Datepicker
  },

  setup: () => {
    const { t } = useI18n()
    const v$ = useVuelidate()
    const birthday = ref(new Date())
    const styleObj = computed(() =>
      Object.entries(variables)
        .map(([k, { value }]) => [k, value])
        .reduce((acc: string[], [k, v]) => {
          acc[k  as any] = v
          return acc
        }, {}  as any)
    )

return {
      t,
      v$,
      birthday,
      styleObj,
    }
  },

  data () {
    return {
      now: new Date(),
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

  props: {
    birthdayLabel: {
        type: Date,
        required: true,
    },
  },
  computed: {
    // birthdayErrors () {
    //   const errors: string[] = []
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   if (!this.v$.date.$dirty) return errors
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   this.v$.birthday.required.$invalid && errors.push(this.$t('signUpPage.registration.form.birthday.maxLength'))
    //   return errors
    // },
  },
  methods: {
    disableButton () {
      // const isAllRequiredItemsExist = isAllItemsExist([this.date])
      // const isFormCorrect = this.v$.$errors.length === 0 && isAllRequiredItemsExist
      // if (isFormCorrect) {
      //   this.valid=true
      // } else {
      //   this.valid=false
      // }
    },
    async update () {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        // const { birthday } = this
        // await store.dispatch('updateUser', { birthday } ).then(() => {
          // this.dialog = false
          // router.push('/account')
        // })
      }
    },
  },
})

const variables = reactive({
  '--vdp-bg-color': { value: '#ffffff', type: 'color' },
  '--vdp-text-color': { value: '#000000', type: 'color' },
  '--vdp-box-shadow': { value: '0 4px 10px 0 rgba(128, 144, 160, 0.1), 0 0 1px 0 rgba(128, 144, 160, 0.81)', type: 'shadow' },
  '--vdp-border-radius': { value: '10px', type: 'size' },
  '--vdp-heading-size': { value: '2.5em', type: 'size' },
  '--vdp-heading-weight': { value: 'bold', type: 'weight' },
  '--vdp-heading-hover-color': { value: '#eeeeee', type: 'color' },
  '--vdp-arrow-color': { value: 'currentColor', type: 'color' },
  '--vdp-elem-color': { value: 'currentColor', type: 'color' },
  '--vdp-disabled-color': { value: '#d5d9e0', type: 'color' },
  '--vdp-hover-color': { value: '#ffffff', type: 'color' },
  '--vdp-hover-bg-color': { value: '#1e88e5', type: 'color' },
  '--vdp-selected-color': { value: '#ffffff', type: 'color' },
  '--vdp-selected-bg-color': { value: '#1e88e5', type: 'color' },
  '--vdp-elem-font-size': { value: '0.8em', type: 'size' },
  '--vdp-elem-border-radius': { value: '6px', type: 'size' },
  '--vdp-divider-color': { value: '#d5d9e0', type: 'color' },
})
</script>

<style scoped>
  .v-btn--disabled {
    color: grey !important;
  }
  .row-datepicker {
    min-height: 300px;
  }
  .datepicker {
    height: 40px;
    border-style: solid;
  }
</style>