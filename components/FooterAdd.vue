<template>
  <div>
    <v-row no-gutters>
      <v-col v-for="(image , index) in images" :key="index" cols="3">
        <v-hover v-slot:default="{ hover }">
          <div style="height:400px ; width:100%;">
            <v-img :src="image.image" max-height="100%" max-width="100%">
              <v-expand-transition>
                <v-overlay v-if="hover" absolute color="#535151">
                  <v-btn outlined dark>See more info</v-btn>
                </v-overlay>
              </v-expand-transition>
            </v-img>
          </div>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          image: "images/FooterAdd/add1.jpg",
        },
        {
          image: "images/FooterAdd/add2.jpg",
        },
        {
          image: "images/FooterAdd/add3.jpg",
        },
        {
          image: "images/FooterAdd/add4.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>