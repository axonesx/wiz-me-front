<template>
      <v-btn
        color="success"
        icon="mdi-plus"
        @click="test"
      ></v-btn>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { store } from '../store'
export default defineComponent({
  name: 'AddButton',

  data () {
    return {
    }
  },
  methods:{
    test() {
      console.log(store.getters.isAuthenticated)
      console.log(store.getters.getProfile)
      console.log(store.getters.getAuthStatus)
    }
  }
})
</script>
