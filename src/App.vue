<template>
  <div id="app">
    <Upload />
    <div class="app-header">
      <ShowItems />
      <SearchItems />
    </div>

    <TableData />

    <div class="app-footer">
      <Info />
      <Pagination />
    </div>
  </div>
</template>
<script>
import TableData from "@/views/Table.vue";
import ShowItems from "@/components/ShowItems.vue";
import SearchItems from "@/components/SearchItems.vue";
import Pagination from "@/components/Pagination.vue";
import Info from "@/components/Info.vue";
import Upload from "@/components/Upload.vue";

export default {
  name: "App",
  components: {
    TableData,
    ShowItems,
    SearchItems,
    Pagination,
    Info,
    Upload
  }
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  color: #73879c;
  font-size: 14px;
}

.app-header,
.app-footer {
  display: flex;
  justify-content: space-between;
  padding: 8px 2px;
}

.app-upload {
  padding: 10px 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px 20px;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

i {
  display: inline-block;
  font-style: normal;
  background-color: rgb(255, 255, 0);
}
</style>
