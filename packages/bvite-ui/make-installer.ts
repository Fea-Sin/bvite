import type { App, Plugin } from "vue";
import type { InstallOptions } from "@bvite/utils/config";
import type { ComponentSize } from "@bvite/utils/types";
import { setConfig } from "@bvite/utils/config";

const makeInstaller = (components: Plugin[] = []) => {
  const apps: App[] = [];

  const install = (app: App, opts: InstallOptions) => {
    const defaultInstallOpt: InstallOptions = {
      size: "" as ComponentSize,
      zIndex: 2000,
    };

    const option = Object.assign(defaultInstallOpt, opts);
    if (apps.includes(app)) return;
    apps.push(app);

    components.forEach((c) => {
      app.use(c);
    });

    app.config.globalProperties.$ELEMENT = option;

    setConfig(option);
  };

  return {
    install,
  };
};

export default makeInstaller;
