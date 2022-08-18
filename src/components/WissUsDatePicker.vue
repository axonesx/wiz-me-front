<template>
    <Datepicker
      style="min-width: 48%;"
      v-model="date"
      :locale="locale"
      @update:modelValue="formatDate"
      autoApply
      :minDate="minDate"
      :maxDate="maxDate"
      :enableTimePicker="hour"
      @blur="dateSetted"
      @cleared="dateSetted"
    >
      <template #trigger>
          <v-text-field
              :clearable="isClearable"
              readonly
              :value="date"
              v-model="v$.date.$model"
              :error-messages="dateErrors"
              required
              @input="v$.date.$touch()"
              @blur="v$.date.$touch()"
          >
          <template v-slot:label>
          {{ $t('app.form.placeHolder') + title}}
          </template></v-text-field>
      </template>
  </Datepicker>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { defineComponent, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { required } from '@vuelidate/validators'
import { formatDateInput } from '../services/date.service'

export default defineComponent ({
  name: 'WissUsDatePicker',
  components: { Datepicker },
  setup () {
    const flow = ref(['year', 'month', 'calendar'])
    return {
      flow,
      v$: useVuelidate(),
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    minDate: {
      type: Date || undefined,
      required: true,
    },
    maxDate: {
      type: Date || undefined,
    },
    locale: {
      type: String,
      default: 'fr',
    },
    isClearable: {
      type: Boolean,
      default: true,
    },
    hour: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      date: '',
      valid: true,
    }
  },

  validations() {
    return {
      date: {
          required,
          $lazy: true
      },
    }
  },

  computed: {
    ...mapGetters({
    }),
    dateErrors () {
      const errors: string[] = []
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-ignore
      if (!this.v$.date.$dirty) return errors
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-ignore
      this.v$.date.required.$invalid && errors.push(this.$t('app.form.errors.required'))
      return errors
    },
  },

  methods: {
    formatDate (dateToFormat: Date): void {
      this.date = formatDateInput(dateToFormat, this.hour)
    },
    dateSetted (): void {
      this.$emit('dateSetted')
    },
  }
})
</script>
