<template>
  <v-container>
      <v-row>
          <v-col>
              <product-details></product-details>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    auth:false,
    components:{
        ProductDetails: () => import('~/components/ProductDetails.vue'),
    }
}
</script>

<style>

</style>