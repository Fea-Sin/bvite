import { buildProps } from "@bvite/utils/props";

import type { ExtractPropTypes } from "vue";

export type AlertEffect = "light" | "dark";

export const alertProps = buildProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "info",
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  closeText: {
    type: String,
    default: "",
  },
  showIcon: Boolean,
  center: Boolean,
  effect: {
    type: String,
    values: ["light", "dark"],
    default: "dark",
  },
});

export type AlertProps = ExtractPropTypes<typeof alertProps>;

export const alertEmites = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type AlertEmites = typeof alertEmites;
