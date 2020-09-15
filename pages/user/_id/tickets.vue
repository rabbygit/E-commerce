<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" offset-md="1" lg="2">
        <user-sidebar></user-sidebar>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <v-container v-if="loading">
          <page-loading></page-loading>
        </v-container>

        <v-container fluid v-else>
          <v-row no-gutters>
            <v-col lg="10" md="10">
              <v-card>
                <v-container fluid>
                  <v-row>
                    <v-col class="d-flex flex-row">
                      <p class="text-h6">My Tickets</p>
                      <v-spacer></v-spacer>
                      <v-btn tile large color="success" @click.stop="dialog = true">
                        <v-icon>mdi-plus</v-icon>Create A ticket
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
                <v-divider></v-divider>
                <v-container>
                  <p
                    v-if="tickets.length == 0"
                    class="text-center text--red"
                  >You don't open any ticket.</p>
                  <div v-else>
                    <v-container fluid>
                      <v-row justify="start" no-guuters>
                        <v-text-field
                          style="max-width:300px"
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-row>
                    </v-container>

                    <v-simple-table fixed-header>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left text-button pl-0">ID</th>
                            <th class="text-center text-button">Subject</th>
                            <th class="text-right text-button">Created date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(ticket , index) in filtered" :key="index">
                            <td class="px-0">
                              <p class="text-left">{{index+1}}</p>
                            </td>
                            <td>
                              <p
                                class="text-center ticket purple--text"
                                @click="viewTicket(ticket)"
                              >{{ticket.title}}</p>
                            </td>
                            <td>
                              <p class="text-right">{{ticket.created}}</p>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="50%">
      <v-card color="#F5F5F5">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="form" v-model="valid">
                  <v-col class="d-flex pa-0" cols="12" sm="6">
                    <v-select :items="items" v-model="department" label="Department" outlined></v-select>
                  </v-col>
                  <v-text-field
                    label="Subject"
                    required
                    outlined
                    v-model="subject"
                    :rules="subjectRules"
                    type="text"
                  ></v-text-field>
                  <v-textarea
                    v-model="complain"
                    :rules="complainRules"
                    auto-grow
                    filled
                    color="deep-purple"
                    label="Your problem"
                    rows="2"
                  ></v-textarea>
                </v-form>

                <v-btn color="primary" tile @click="dialog = false">Close</v-btn>
                <v-btn
                  class="ml-12"
                  color="orange"
                  tile
                  @click="submitTicket"
                  :disabled="!valid"
                >Submit ticket</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="ticketDialog" max-width="50%">
      <v-card color="#F5F5F5" class="pa-4">
        <v-card-title>{{ticket.title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <div class="d-flex flex-row align-center">
              <v-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
              </v-avatar>
              <p class="ml-5">{{ticket.sender_name}}</p>
            </div>
            <p class="ml-5 mt-5 text-subtitle-2">{{ticket.complain || "User Complain"}}</p>
            <v-divider></v-divider>

            <div
              class="d-flex flex-row align-center ma-3"
              v-for="(reply , index) in ticket.replies"
              :key="index"
            >
              <v-avatar v-if="$auth.user && $auth.user.picture">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
              </v-avatar>
              <v-avatar color="indigo" v-else>
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
              <p class="ml-5">{{reply.reply}}</p>
            </div>

            <v-row v-if="ticket.replies.length > 0">
              <v-col cols="12">
                <v-form ref="form" v-model="valid">
                  <v-col class="d-flex pa-0" cols="12">
                    <v-textarea
                      v-model="reply"
                      :rules="replyRules"
                      auto-grow
                      filled
                      color="deep-purple"
                      label="Your Reply"
                      rows="2"
                      class="pl-0"
                    ></v-textarea>
                  </v-col>
                </v-form>

                <v-btn color="primary" tile @click="ticketDialog = false">Close</v-btn>
                <v-btn
                  class="ml-12"
                  color="orange"
                  tile
                  @click="submitReply"
                  :disabled="!valid"
                >Submit Reply</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    // middleware: "auth",
    auth: false,
    components: {
      updateProfileDialog: () => import("@/components/updateProfileDialog"),
      UserSidebar: () => import("@/components/UserSidebar"),
      PageLoading: () => import("~/components/PageLoading.vue"),
    },
    data() {
      return {
        search: "",
        tickets: [],
        valid: true,
        dialog: false,
        loading: true,
        items: ["Admin", "Account"],
        department: "",
        subject: "",
        subjectRules: [(v) => !!v || "Subject is required"],
        complain: "",
        complainRules: [(v) => !!v || "Please provide your problem"],

        ticketDialog: false,
        ticket: {
          replies: [],
        },
        reply: "",
        replyRules: [(v) => !!v || "Reply is required"],
      };
    },
    methods: {
      submitTicket() {
        let ticket = {
          sender_id: this.$route.params.id,
          department: this.department,
          title: this.subject,
          complain: this.complain,
        };

        this.$axios
          .post("https://tango99.herokuapp.com/supports/create_ticket/", ticket)
          .then((response) => {
            this.tickets.push(response.data.data);
          });

        this.dialog = false;
      },
      viewTicket(ticket) {
        this.ticket = ticket;
        console.log("My ticket ", ticket);
        this.ticketDialog = true;
      },
      submitReply() {
        let reply = {
          reply: this.reply,
          ticket_id: this.ticket.id,
          user_id: 1,
        };

        console.log(reply);

        // Make api call
        this.$axios
          .post("https://tango99.herokuapp.com/supports/create_reply/", reply)
          .then((response) => {
            if (response.data.success) {
              let index = this.tickets.findIndex(
                (ticket) => ticket.id == this.ticket.id
              );
              this.tickets[index].replies.push(response.data.data);
              this.reply = "";
            }
          });

        this.ticketDialog = false;
      },
    },
    computed: {
      filtered() {
        return this.tickets.filter((ticket) => {
          return ticket.title.toLowerCase().includes(this.search.toLowerCase());
        });
      },
    },
    mounted() {
      this.$axios
        .get("https://tango99.herokuapp.com/supports/ticket_list")
        .then((response) => {
          console.log("Tickets for 10 :", response.data.data);
          if (response.data.success) {
            this.tickets = response.data.data;
            this.loading = false;
          }
        });
    },
  };
</script>

<style scoped>
  .ticket {
    cursor: pointer;
  }
</style>