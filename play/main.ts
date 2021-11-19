import { createApp } from "vue";

import App from "./src/app.vue";
import { VfAlert } from "@bvite/components";

import "@bvite/theme-chalk/src/index.less";

const app = createApp(App);

app.use(VfAlert);
app.mount("#play");
