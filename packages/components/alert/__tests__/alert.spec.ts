import { shallowMount } from "@vue/test-utils";
import Alert from "../src/alert.vue";

const BaseTitle = "Render Alert Title";

describe("Alert Base", () => {
  test("render title and class", () => {
    const wrapper = shallowMount(Alert, {
      props: {
        title: BaseTitle,
      },
    });

    expect(wrapper.find(".vf-alert__title").text()).toEqual(BaseTitle);
    expect(wrapper.find(".vf-alert").classes()).toContain("vf-alert--info");
  });
});
