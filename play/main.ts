import { createApp } from "vue";
import router from "./src/router";

import App from "./src/app.vue";
// import { VfAlert } from "@bvite/components";
import BviteUI from "@bvite/bvite-ui";

import "@bvite/theme-chalk/src/index.less";

const app = createApp(App);

// app.use(VfAlert);
app.use(BviteUI);
app.use(router);
app.mount("#play");
