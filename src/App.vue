<template>
  <div id="app">
    <router-view />
  </div>
</template>
    
<script>
  export default {
    name: 'App'
  }
</script>
<style>
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }

  .avatar {
    height: 100px;
    display: block;
  }

  .small-padding i {
    cursor: pointer;
  }
</style>
