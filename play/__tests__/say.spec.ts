import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";

import Say from "../src/components/Say.vue";

describe("Say Component", () => {
  it("component props name", () => {
    const name = "My Bvite";
    const wrapper = shallowMount(Say, {
      props: {
        name,
      },
    });

    expect(wrapper.text()).to.include(name);
  });

  it("component default props", () => {
    const name = "Bvite";
    const wrapper = shallowMount(Say);

    expect(wrapper.text()).to.include(name);
  });
});
