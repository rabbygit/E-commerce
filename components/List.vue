<template>
  <div>
    <ul class="wraper">
      <li
        class="list"
        :class="item.open ? 'active' : '' "
        v-for="(item ) in collection"
        :key="item.id"
        @mouseover="onOver(item)"
        @mouseleave="onLeave(item)"
        @click.stop="search(item)"
      >
        {{item.label}}
        <v-icon v-if="item.open" small class="float-right">mdi-chevron-double-right</v-icon>
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
    // Check if the parent category has any child category
    hasChildren(item) {
      return Array.isArray(item.children) && item.children.length;
    },

    // On Hover open the category if it has child category
    onOver: function (item) {
      if (item.children != null) {
        item.open = true;
      }
    },

    // On hover leave close child category
    onLeave: function (item) {
      item.open = false;
    },

    // Click event to search
    search(item) {
      // Push to search page
      this.$router.push({
        name: "search-terms",
        params: { terms: item.label },
      });
    },
  },
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
  background: #fff;
  width: 200px;
  position: relative;
  z-index: 4;
}
.wraper li .wraper {
  list-style: none;
  cursor: pointer;
  padding: 0;
  width: 200px;
  position: absolute;
  top: 0;
  left: 200px;
}

.wraper li .wraper li .wraper li {
  background: #ffcdd2 !important;
}

@media screen and (max-width: 1150px) {
  .wraper li {
    width: 50px;
  }

  .wraper li .wraper {
    left: 50px;
  }
}

@media screen and (max-width: 1235px) {
  .wraper li {
    width: 150px;
  }

  .wraper li .wraper {
    left: 150px;
  }
}

@media screen and (max-width: 1400px) {
  .wraper li {
    width: 180px;
  }

  .wraper li .wraper {
    left: 180px;
  }
}

@media screen and (max-width: 1150px) {
  .wraper li {
    width: 140px;
  }

  .wraper li .wraper {
    left: 140px;
  }
}

@media screen and (min-width: 1400px) {
  .wraper li {
    width: 225px;
  }

  .wraper li .wraper {
    left: 225px;
  }
}
</style>