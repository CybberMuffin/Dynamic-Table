<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="`f${index}`"
            @click="setKey(field)"
            :class="
              sortField === field ? (order === 1 ? 'sortDesc' : 'sortAsc') : ''
            "
          >{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="`r${index}`">
          <td
            v-for="(item, key) in row"
            :key="`r${key}`"
            contenteditable="true"
            @input="collectText"
            @blur="onSaveCell(index, key)"
          >
            <span v-html="replaceText(item.toString())"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Table",

  data: () => ({
    cellText: ""
  }),

  computed: {
    ...mapState(["searchText", "sortField", "order", "curPage", "perPage"]),
    ...mapGetters(["fields", "rows"]),

    currentPage() {
      return Number(this.$route.params.page);
    }
  },

  methods: {
    replaceText(text) {
      return text.replace(
        new RegExp("(" + this.searchText + ")", "gim"),
        "<i>$1</i>"
      );
    },

    setKey(key) {
      this.$store.commit("setSortKey", key);
    },

    collectText(event) {
      this.cellText = event.target.innerText.trim();
    },

    onSaveCell(tableIndex, key) {
      const text = this.cellText;
      const index = (this.curPage - 1) * this.perPage + tableIndex;
      this.cellText = "";
      if (text.length !== 0)
        this.$store.commit("setDataChanges", { index, key, text });
    }
  },

  created() {
    if (this.currentPage) this.$store.commit("setPage", this.currentPage);
  }
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 5px;
}

tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

th {
  text-align: left;
  border: 1px solid #ddd;
  border-bottom: 3px solid #ddd;
  font-family: "Glyphicons Halflings";
  position: relative;
  cursor: pointer;
}

th::after {
  content: "";
  position: absolute;
  top: 12px;
  right: 8px;
  display: block;
  opacity: 0.2;
  font-size: 0.7em;
}

th.sortAsc::after {
  content: "\25b2";
  opacity: 0.8;
}

th.sortDesc::after {
  content: "\25bc";
  opacity: 0.8;
}

td {
  border: 1px solid #ddd;
}

td,
th {
  padding: 8px;
}
</style>
