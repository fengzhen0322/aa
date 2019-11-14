<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .chatRecord_left .el-select .el-input {
    width: 90px;
  }
  .chatRecord_left .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .chatRecord_left .input-with-select .el-input-group__append {
    background: #409eff;
    color: #fff;
  }
</style>
