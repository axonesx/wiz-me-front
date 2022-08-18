<template>
  <div class="ma-8">
    <v-expansion-panels class="mb-6">
        <v-expansion-panel
          style="border-radius: 4px !important;">
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          color="blue-darken-2"
        >
          {{ $t('activity.form.button') }}
        </v-expansion-panel-title>
        <v-expansion-panel-text class="d-flex justify-center">
          <AddActivity/>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card>
      <v-tabs
        fixed-tabs
        background-color="blue-darken-2"
      >
        <v-tab :value="1">GROUP</v-tab>
        <v-tab :value="2">DUO</v-tab>
      </v-tabs>
      <div class="d-flex justify-center mb-6">
      <h1>Title Exemple</h1>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import AddActivity from '../../components/activity/AddActivity.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { defineComponent } from "vue"

export default defineComponent ({
  components: { AddActivity },
  setup () {
    return {
    }
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters({
    }),
  },

  methods: {
  }
})
</script>
