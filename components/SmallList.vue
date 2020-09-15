<template>
  <div>
    <ul class="wraper">
      <li
        class="list"
        v-for="(item ) in collection"
        :key="item.id"
        @mouseover="onOver(item)"
        @mouseleave="onLeave(item)"
      >
        {{item.label}}
        <v-icon v-if="item.open" small right>mdi-chevron-double-right</v-icon>
        <List v-show="item.open" v-if="hasChildren(item)" :collection="item.children" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "List",
  props: {
    collection: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    hasChildren(item) {
      return Array.isArray(item.children) && item.children.length;
    },
    onOver: function (item) {
      if (item.children != null) {
        item.open = true;
      }
    },
    onLeave: function (item) {
      item.open = false;
    },
  }
};
</script>

<style scoped>
.active {
 background: #ffcdd2 !important;
}
.wraper {
  padding: 0;
  margin: 0;
  z-index: 4;
  width: 100%;
  height: 100%;
}
.wraper li {
  list-style: none;
  cursor: pointer;
  padding: 8px 15px;
  background:white;
  width: 150px;
  position: relative;
  z-index: 4;
}
.wraper li .wraper {
  list-style: none;
  cursor: pointer;
  padding: 0;
  width: 150px;
}
</style>