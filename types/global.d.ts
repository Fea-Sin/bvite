// GlobalComponents for Volar
declare module "vue" {
  export interface GlobalComponents {
    VfAlert: typeof import("@bvite/bvite-ui")["VfAlert"];
  }
}
