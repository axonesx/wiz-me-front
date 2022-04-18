<template>
      <v-btn
        color="success"
        icon="mdi-plus"
        @click="test"
      ></v-btn>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
// import { isAfter, isBefore, dayBetweenTwoDates, monthBetweenTwoDates, yearBetweenTwoDates, durationBetweenTwoDates } from '../services/date.service'

export default defineComponent({
  name: 'AddButton',

  data () {
    return {
    }
  },
  methods:{
    test() {
      // const date1 = new Date('2022-01-01')
      // const date2 = new Date('2020-01-01')
      // console.log("date1")
      // console.log(date1)
      // console.log("date2")
      // console.log(date2)
      // console.log("dayBetweenTwoDates(date1,date2)")
      // console.log(dayBetweenTwoDates(date1,date2))
      // console.log("monthBetweenTwoDates(date1,date2)")
      // console.log(monthBetweenTwoDates(date1,date2))
      // console.log("dayBetweenTwoDates(date1,date2)/30")
      // console.log(dayBetweenTwoDates(date1,date2)/30)
      // console.log("yearBetweenTwoDates(date1,date2)")
      // console.log(yearBetweenTwoDates(date1,date2))
      // console.log("(dayBetweenTwoDates(date1,date2)/30)/12")
      // console.log((dayBetweenTwoDates(date1,date2)/30)/12)
      // const date3 = new Date('2020-01-28')
      // const date4 = new Date('2020-01-01')
      // console.log(durationBetweenTwoDates(date3,date4))
      // console.log("dayBetweenTwoDates(date2,date1)")
      // console.log(dayBetweenTwoDates(date2,date1))
      // console.log("isAfter(date1,date2)")
      // console.log(isAfter(date1,date2))
      // console.log("isBefore(date1,date2)")
      // console.log(isBefore(date1,date2))
    }
  }
})
</script>
