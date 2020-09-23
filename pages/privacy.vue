<template>
  <v-container>
    <v-container fluid>
      <v-img src="terms_policy/policy_02.png"></v-img>
    </v-container>
    <div class="myClass" v-if="companyInfo.policy">
      <p v-for="(policy , index) in companyInfo.policy" :key="index">{{policy}}</p>
    </div>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      companyInfo: {},
      loading: false,
      overlay: false,
      progress: true,
    };
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
  mounted() {
    this.$axios
      .get("https://tango99.herokuapp.com/site/info")
      .then((response) => {
        if (response.data) {
          this.companyInfo = response.data.data[0];
        }
      });
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

ul li:before {
  content: "";

  background-color: red;
  float: left;
  margin: 0.25em 0.25em 0;
  border-radius: 50%;
}

body {
  font-family: Helvetica;
}

.myClass {
  width: 300px;
  margin: auto;
}

p {
  border-top: 2px dashed;
  border-color: blue !important;
  margin: 0;
  padding: 30px;
  counter-increment: section;
  position: relative;
}

p:nth-child(even):before {
  content: counter(section);
  right: 100%;
  margin-right: -20px;
  position: absolute;
  border-radius: 50%;
  padding: 10px;
  height: 40px;
  width: 40px;
  background-color: blue;
  text-align: center;
  color: white;
  font-size: 110%;
}

p:nth-child(odd):before {
  content: counter(section);
  left: 100%;
  margin-left: -20px;
  position: absolute;
  border-radius: 50%;
  padding: 10px;
  height: 40px;
  width: 40px;
  background-color: blue;
  text-align: center;
  color: white;
  font-size: 110%;
}

p:nth-child(even) {
  border-left: 2px dashed;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  margin-right: 30px;
  padding-right: 0;
}

p:nth-child(odd) {
  border-right: 2px dashed;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-left: 30px;
  padding-left: 0;
}

p:first-child {
  border-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

p:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>