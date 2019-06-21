<template>
  <div class="info-page">
    <div class="header">Page information</div>
    <p>
      Current page:
      <b>{{ curPage }}</b>
    </p>
    <p>
      Entries per page:
      <b>{{ perPage }}</b>
    </p>
    <p>
      Entries range on page:
      <b>from {{ entriesRange.from }} to {{ entriesRange.to }}</b>
    </p>
    <p>
      Total quantity of entries:
      <b>{{ dataLength }}</b>
    </p>
    <p>
      Search text:
      <b>{{ searchTextValue }}</b>
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["curPage", "perPage"]),
    ...mapGetters(["searchTextValue", "dataLength", "entriesRange"])
  }
};
</script>

<style lang="scss" scoped>
.info-page {
  .header {
    font-size: 22px;
    font-weight: bold;
  }
  text-align: left;
  border: #2c3e50 solid 1px;
  padding: 15px;
  border-radius: 10px;
  p {
    margin: 8px 0;
  }
}
</style>
