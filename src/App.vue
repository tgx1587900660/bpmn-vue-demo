<template>
  <div id="app">
    <h1>App 根组件</h1>
    <div class="btns">
      <router-link to="/demo1" :title="demo1Title">demo1</router-link>
      <router-link to="/demo2">demo2</router-link>
      <router-link to="/custom-palette">custom-palette</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      demo1Title: '提供了图形的.bpmn .svg下载功能、图形的编辑功能'
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid #000;
}
.btns {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  border-bottom: 1px solid #000;
}
</style>
