<template>
  <div class="app">
    <div id="nav">
      <router-link class="item" to="/">Home</router-link>
      <router-link class="item" to="/alert">Alert</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .item {
    padding: 0 8px;
  }
}
</style>
