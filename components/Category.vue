<template>
  <v-card class="d-flex flex-column" elevation="2" max-height="500" width="100%" tile>
    <v-card max-width="100%" class="mx-auto">
      <v-list>
        <v-list-group v-for="item in items" :key="item.title" v-model="item.active" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.items" :key="subItem.title">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
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
            {
              action: "restaurant",
              title: "Dining2",
              items: [{ title: "List Item" }],
            },
            { title: "New American" },
            { title: "Sushi" },
          ],
        },
        {
          action: "school",
          title: "Education",
          items: [{ title: "List Item" }],
        },
        {
          action: "directions_run",
          title: "Family",
          items: [{ title: "List Item" }],
        },
        {
          action: "healing",
          title: "Health",
          items: [{ title: "List Item" }],
        },
        {
          action: "content_cut",
          title: "Office",
          items: [{ title: "List Item" }],
        },
        {
          action: "local_offer",
          title: "Promotions",
          items: [{ title: "List Item" }],
        },
      ],
    };
  },
};
</script>