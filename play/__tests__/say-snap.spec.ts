import { shallowMount } from "@vue/test-utils";
import Say from "../src/components/Say.vue";

describe("Say Sanpshot", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Say, {
      props: {
        name: "Hello Bvite",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
