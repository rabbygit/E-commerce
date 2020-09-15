<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card width="50%">
        <v-container>
          <v-row justify="center">
            <v-col class="text-center">
              <v-icon large color="teal">mdi-check-circle</v-icon>
              <v-card-title
                class="justify-center text-h4 teal--text text--lighten-2"
              >Payment Successfull</v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-row justify-center px-14">
              <p class="text-h6">Payment Type</p>
              <v-spacer></v-spacer>
              <p class="text-h6">World</p>
            </v-col>
          </v-row>
          <v-row></v-row>
          <v-row></v-row>
          <v-row></v-row>
          <v-row></v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
};
</script>

<style>
</style>