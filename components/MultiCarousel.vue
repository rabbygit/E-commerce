<template>
  <div class="mx-auto custom">
    <v-slide-group show-arrows prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
      <v-slide-item v-for="(slider , index) in sliders" :key="index" >
        <!-- <v-card  elevation="0"> -->
        <v-img
          :src="slider.image"
          height="200"
          width="250"
          class="ma-12 img-class"
        >
        </v-img>
        <!-- </v-card> -->
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sliders:[
        {
          image : "images/slider1.jpg"
        },
        {
          image : "images/slider2.jpg"
        },
        {
          image : "images/slider3.jpg"
        },
        {
          image : "images/slider4.jpg"
        },
        {
          image : "images/slider5.jpg"
        },
        {
          image : "images/slider1.jpg"
        },
        {
          image : "images/slider2.jpg"
        },
        {
          image : "images/slider3.jpg"
        },
        {
          image : "images/slider4.jpg"
        },
        {
          image : "images/slider5.jpg"
        },
        {
          image : "images/slider1.jpg"
        },
        {
          image : "images/slider2.jpg"
        },
        {
          image : "images/slider3.jpg"
        },
        {
          image : "images/slider4.jpg"
        },
        {
          image : "images/slider5.jpg"
        },
        {
          image : "images/slider1.jpg"
        },
        {
          image : "images/slider2.jpg"
        },
        {
          image : "images/slider3.jpg"
        },
        {
          image : "images/slider4.jpg"
        },
        {
          image : "images/slider5.jpg"
        },
      ]
    }
  },
};
</script>

<style >
.custom .v-icon.v-icon {
  font-size: 200px;
}
.custom .img-class {
  border-radius: 20px;
}
</style>