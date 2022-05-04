<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      persistent
    >
      <template v-slot:activator="{ props }">
        <EditButton v-bind="props" :textBtn="$t('accountPage.updateUser.form.descriptionTooltip')"></EditButton>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ $t('accountPage.updateUser.form.descriptionTitle') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form
            @change="disableButton"
            @blur="disableButton">
            <v-row>
              <v-textarea
                v-model="v$.description.$model"
                no-resize
                filled
                rows="5"
                :error-messages="descriptionErrors"
                :counter="1000"
                @input="v$.description.$touch()"
                @blur="v$.description.$touch()"
                >
              <template v-slot:label>
                {{ $t('accountPage.updateUser.form.description') }}
              </template></v-textarea>
            </v-row>
          </v-form>
        <v-spacer></v-spacer>
        <v-card-actions>
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
            width=150
          >
            <v-progress-circular
              class='mx-auto'
              v-if="updateStatus==='loading'"
              indeterminate
            ></v-progress-circular>
            <div v-else>{{ $t('accountPage.updateUser.form.saveBtn') }}</div>
          </v-btn>
        </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useVuelidate from '@vuelidate/core'
import { maxLength } from '@vuelidate/validators'
import EditButton from '../EditButton.vue'
import { useI18n } from 'vue-i18n'
import { store } from '../../store'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'UserDescriptionUpdateForm',

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
      description: this.descriptionLabel,
      valid: true,
      dialog: false,
    }
  },

  validations () {
    return {
      description: {
        maxLength: maxLength(1000),
        $lazy: true
      },
    }
  },

  components:{
      EditButton
  },

  props: {
    descriptionLabel: {
        type: String,
        required: true,
    },
  },
  computed: {
    ...mapGetters({
      updateStatus: 'getUserUpdateRequestStatus',
    }),
    descriptionErrors () {
      const errors: string[] = []
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!this.v$.description.$dirty) return errors
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.v$.description.maxLength.$invalid && errors.push(this.$t('signUpPage.registration.form.description.maxLength'))
      return errors
    },
  },
  methods: {
    disableButton () {
      this.valid = this.v$.$errors.length === 0
    },
    async update () {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        const { description } = this
        store.dispatch('updateUser', { description } ).then(() => {
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