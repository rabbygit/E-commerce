<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card flat>
      <v-card-title dark class="deep-purple lighten-1">
        <span class="headline ml-5 white--text">Update Profile</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Name" v-model="user.name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Phone Number" v-model="user.phone_number"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="City" v-model="user.city"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="District" v-model="user.district"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
        <v-btn
          color="deep-purple lighten-1 white--text"
          tile
          large
          @click="updateProfile"
        >Update Profile</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
      required: true,
    },
    user: {
      type: Object,
    },
  },
  methods: {
    updateProfile() {
      this.$emit("onUpdate", this.user);
    },
    close() {
      this.$emit("onClose");
    },
  },
};
</script>

<style>
</style>