<template>
  <div v-show="visible">
    <div class="box">ALERT</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "VfAlert",
  setup(props) {
    // state
    const visible = ref(true);

    return {
      visible,
    };
  },
});
</script>
<style lang="less" scoped>
.box {
  text-align: center;
  color: green;
  font-size: 30px;
}
</style>
