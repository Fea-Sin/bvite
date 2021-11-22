<template>
  <div class="con">
    <div class="box">
      <vf-alert title="info alert" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="less" scoped>
.box {
  font-size: 20px;
  color: blueviolet;
  width: 500px;
  margin: 0 auto;
}

.con {
  padding-top: 40px;
}
</style>
