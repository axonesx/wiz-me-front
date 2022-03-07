<template>
    <AddButton></AddButton>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import AddButton from './AddButton.vue'


export default defineComponent({
    name: 'AddActivity',
    components:{
        AddButton
    },
    data () {
        return {
        }
    },
})
</script>
