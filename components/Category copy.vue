<template>
  <v-card class="mx-auto" width="300">
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Dropdown</v-btn>
        </template>

        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile v-for="subItem in item.items" :key="subItem.title">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <!-- <v-icon>{{ subItem.action }}</v-icon> -->
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-menu>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    admins: [
      ["Management", "people_outline"],
      ["Settings", "settings"],
    ],
    cruds: [
      ["Create", "add"],
      ["Read", "insert_drive_file"],
      ["Update", "update"],
      ["Delete", "delete"],
    ],
    items: [
      {
        action: "local_activity",
        title: "Attractions",
        items: [{ title: "List Item" }],
      },
      {
        action: "restaurant",
        title: "Dining",
        active: true,
        items: [
          { title: "Breakfast & brunch" },
          { title: "New American" },
          { title: "Sushi" },
        ],
      },
    ],
  }),
};
</script>