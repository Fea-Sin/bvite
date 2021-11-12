<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "Bvite",
    },
  },
});
</script>

<template>
  <div class="sayBox">
    {{ name }}
  </div>
</template>

<style lang="less" scoped>
.sayBox {
  padding: 30px;
  font-size: 30px;
  text-align: center;
  color: blueviolet;
}
</style>
