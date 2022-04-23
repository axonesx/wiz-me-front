<template>
  <v-dialog
    v-model="isGlobalError"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title>
        {{ $t('errors.title') }}
      </v-card-title>
      <v-card-text>
        {{ $t(`errors.${globalError}`) }}
      </v-card-text>
      <v-card-actions>
        <v-btn block @click="resetError">
          {{ $t(`errors.closeBtn`) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { store } from '../store'

export default defineComponent({
  name: 'GlobalError',

  computed: {
    ...mapGetters({
      isGlobalError: 'existGlobalError',
      globalError: 'getGlobalError',
    })
  },
  methods: {
    resetError(): void {
      store.dispatch('setGlobalError', '')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
