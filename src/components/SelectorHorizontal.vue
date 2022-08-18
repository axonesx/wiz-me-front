<template>
  <div
      style="width: 48%"
      class="mt-5 text-center">
    <v-btn
      style="max-width: 20%"
      variant="text"
      icon="mdi-chevron-left"
      @click="previous"
      :disabled="!isPrevious"
    ></v-btn>
    <v-chip
      style="width: 60%"
    >
      <span
        style="width: 100%"
        class="text-center"
      >{{ itemSelected }}</span>
    </v-chip>
    <v-btn
      style="max-width: 20%"
      variant="text"
      icon="mdi-chevron-right"
      @click="next"
      :disabled="!isNext"
    ></v-btn>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { defineComponent } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent ({
  name: 'SelectorHorizontal',
  setup () {
    return {
    }
  },
  props: {
    item: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
    isPrevious: false,
    isNext: true,
    itemKey: 0,
    itemSelected: this.item[0],
    }
  },

  computed: {
    ...mapGetters({
    }),
  },

  methods: {
    previous (): void {
      if(this.itemKey > 0) {
        this.isPrevious = true
        this.isNext = true
        this.itemKey = this.itemKey - 1
        this.itemSelected = this.item[this.itemKey]
      }
      if(this.itemKey === 0) this.isPrevious = false
    },
    next (): void {
      if(this.itemKey < this.item.length - 1) {
        this.isPrevious = true
        this.isNext = true
        this.itemKey = this.itemKey + 1
        this.itemSelected = this.item[this.itemKey]
      }
      if(this.itemKey === this.item.length - 1) this.isNext = false
    },
  }
})
</script>
