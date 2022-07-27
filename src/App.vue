<template>
  <div id="app">
    <h1>App 根组件</h1>
    <div class="btns">
      <router-link to="/demo1">demo1</router-link>
      <router-link to="/demo2">demo2</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
