<template>
  <div class="mx-auto custom">
    <v-slide-group show-arrows prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
      <v-slide-item v-for="n in 16" :key="n" >
        <!-- <v-card  elevation="0"> -->
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
          height="200"
          width="250"
          class="ma-12 img-class"
        >
        <p class="text-h1">{{n}}</p>
        </v-img>
        <!-- </v-card> -->
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {};
</script>

<style >
.custom .v-icon.v-icon {
  font-size: 200px;
}
.custom .img-class {
  border-radius: 20px;
}
</style>