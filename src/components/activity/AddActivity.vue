<template>
    <div>
          <form
            @change="disableButton"
            @blur="disableButton"
          >
            <div class="d-flex justify-space-between">
                <SelectorHorizontal :item="types"/>
                <v-text-field class="mt-4"
                style="max-width: 48% !important"
                v-model="v$.title.$model"
                :error-messages="titleErrors"
                required
                @input="v$.title.$touch()"
                @blur="v$.title.$touch()"
                counter
                >
                <template v-slot:label>
                    {{ $t('activity.form.title') }}
                </template>
                </v-text-field>
            </div>
            <div class="d-flex justify-space-between">
              <WissUsDatePicker
                :locale="locale"
                v-model="startDate"
                :title="$t('app.form.date.startDate')"
                :minDate="now"
                :maxDate="maxStartDate"
                :isClearable="false"
                :hour="true"
                @dateSetted="disableButton();defineMinEndDate();"
              />
              <WissUsDatePicker
                :locale="locale"
                v-model="endDate"
                :title="$t('app.form.date.endDate')"
                :minDate="minEndDate"
                :isClearable="false"
                :hour="true"
                @dateSetted="disableButton();defineMaxStartDate();"
              />
            </div>
            <div class="d-flex justify-space-between">
              <div
                class="d-flex justify-space-between"
                style="width: 48% !important">
                <v-autocomplete
                  auto-select-first
                  chips
                  clearable
                  deletable-chips
                  dense
                  filled
                  multiple
                  rounded
                  small-chips>
                </v-autocomplete>
              </div>
              <v-text-field
                style="max-width: 48% !important"
              >
                <!-- v-model="v$.place.$model"
                :error-messages="placeErrors"
                required
                @input="v$.place.$touch()"
                @blur="v$.place.$touch()" -->
              </v-text-field>
            </div>
            <v-textarea
              counter
              :label="$t('activity.form.description')"
              clearable
              clear-icon="mdi-close-circle"
              rows="3"
              v-model="v$.description.$model"
              :error-messages="descriptionErrors"
              @input="v$.description.$touch()"
              @blur="v$.description.$touch()"
            >
            </v-textarea>
            <v-btn
              block
              class="mb-4"
              color="primary"
              :loading="true"
              :disabled="valid"
            >
              <!-- @click="addActivity" -->
              <v-progress-circular
                class='mx-auto'
                v-if="activityStatus==='loading'"
                indeterminate
              ></v-progress-circular>
              <div v-else>{{ $t('activity.form.button') }}</div>
            </v-btn>
          </form>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import WissUsDatePicker from '../../components/WissUsDatePicker.vue'
import SelectorHorizontal from '../../components/SelectorHorizontal.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { required, maxLength, minLength } from '@vuelidate/validators'
import { formValidation } from '../../services/utils.service'
import { defineComponent } from "vue"

export default defineComponent ({
  components: { WissUsDatePicker, SelectorHorizontal },
  setup () {
    const now: Date | null = new Date() ||null
    const minEndDate: Date | undefined = now
    const maxStartDate: Date | undefined = undefined
    return {
      now,
      minEndDate,
      maxStartDate,
      v$: useVuelidate(),
    }
  },

  data() {
    return {
      title: '',
      place: '',
      description: '',
      startDate: null,
      endDate: null,
      valid: true,
      locale: 'fr',
      types: [
        'GROUPE',
        'DUO',
      ],
    }
  },

  validations() {
    return {
      title: {
          required,
          maxLength: maxLength(200),
          minLength: minLength(2),
          $lazy: true
      },
      description: {
          maxLength: maxLength(1000),
          $lazy: true
      },
      place: {
          required,
          $lazy: true
      }
    }
  },

  computed: {
    ...mapGetters({
      activityStatus: 'getActivityStatus',
    }),
    titleErrors () {
      const errors: string[] = []
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-ignore
      if (!this.v$.title.$dirty) return errors
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-ignore
      this.v$.title.required.$invalid && errors.push(this.$t('app.form.errors.required'))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-ignore
      this.v$.title.maxLength.$invalid && errors.push(this.$t('app.form.errors.maxLength'))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-ignore
      this.v$.title.minLength.$invalid && errors.push(this.$t('app.form.errors.minLength'))
      return errors
    },
    descriptionErrors () {
      const errors: string[] = []
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-ignore
      if (!this.v$.description.$dirty) return errors
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //  @ts-ignore
      this.v$.description.maxLength.$invalid && errors.push(this.$t('app.form.errors.maxLength'))
      return errors
    },
  },

  methods: {
    disableButton () {
      this.valid = formValidation(this.v$.$errors, [this.title,this.startDate,this.endDate])
    },
    defineMaxStartDate () {
      this.maxStartDate = this.endDate === null ? undefined : this.endDate;
    },
    defineMinEndDate () {
      this.minEndDate = this.startDate === null ? this.now : this.startDate;
    }
  }
})
</script>
