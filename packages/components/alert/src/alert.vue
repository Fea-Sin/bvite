<template>
  <div
    v-show="visible"
    class="vf-alert"
    :class="[typeClass, 'is-' + effect]"
    role="alert"
  >
    <div class="vf-alert__content">
      <div class="vf-alert__title" v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
      </div>
      <p class="vf-alert__description" v-if="$slots.default && !description">
        <slot></slot>
      </p>
      <p class="vf-alert__description" v-if="description && !$slots.default">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { alertProps, alertEmites } from "./alert";

export default defineComponent({
  name: "VfAlert",
  props: alertProps,
  emits: alertEmites,
  setup(props, { emit }) {
    // state
    const visible = ref(true);

    // computed
    const typeClass = computed(() => `vf-alert--${props.type}`);

    // methodss
    const close = (evt: MouseEvent) => {
      visible.value = false;
      emit("close", evt);
    };

    return {
      visible,
      typeClass,
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
