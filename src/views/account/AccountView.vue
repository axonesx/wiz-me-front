<template>
  <UserInformationCard></UserInformationCard>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import UserInformationCard from '../../components/account/UserInformationCard.vue'

export default {

  components: {
    UserInformationCard,
  },
  computed: {
    ...mapGetters({
    })
  }
}
</script>
