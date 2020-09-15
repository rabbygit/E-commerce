<template>
  <div>
    <v-carousel
      cycle
      :interval="interval"
      :show-arrows-on-hover="show_arrows_on_hover"
      :show-arrows="show_arrows"
    >
      <v-carousel-item v-for="(banner,i) in banners" :key="i" :src="banner.image_link">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">{{banner.content}}</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      interval: 3000,
      cycle: true,
      show_arrows_on_hover: true,
      show_arrows: true,
    };
  },
  mounted() {
    // Banner of the site
    this.$axios
      .get("https://tango99.herokuapp.com/site/banner/")
      .then((response) => {
        if (response.data.success) {
          this.banners = response.data.images;

          if (this.banners.length == 1) {
            this.cycle = false;
            this.show_arrows_on_hover = false;
            this.show_arrows = false;
          } else {
            this.interval = response.data.banner_data.set_time;
          }
        }
      });
  },
};
</script>