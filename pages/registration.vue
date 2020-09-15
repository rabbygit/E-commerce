<template>
  <v-layout>
    <v-flex class="text-center">
      <Registration />
    </v-flex>
  </v-layout>
</template>

<script>
import Registration from '~/components/Registration.vue'

export default {
auth: 'guest',
components: {
  Registration
  }
}
</script>

<style>

</style>