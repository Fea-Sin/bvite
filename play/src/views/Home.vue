<template>
  <div class="con">
    <div class="logo">
      <img alt="Bvite Logo" src="../assets/logo.png" />
    </div>
    <Say name="Bvite Vite Vue3" />
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Say from "../components/Say.vue";

export default defineComponent({
  components: {
    Say,
  },
});
</script>

<style lang="less" scoped>
.con {
  padding-top: 40px;
}
.logo {
  width: 200px;
  height: 200px;
  margin: 0 auto;

  img {
    width: 100%;
  }
}
</style>
