<template>
      <v-btn
        color="success"
        icon="mdi-plus"
        @click='test'
      ></v-btn>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import router from '../router'
import { store } from '../store'


export default defineComponent({
  name: 'AddButton',

  data () {
    return {
    }
  },
  methods:{
    test () {
      store.dispatch('logoutUser').then(() => {
          router.push('/login')
      })
    },
  }
})
</script>
