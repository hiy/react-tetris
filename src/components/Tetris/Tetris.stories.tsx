import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ReactTetris from "./Tetris";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Example/Tetris",
  component: ReactTetris,
} as ComponentMeta<typeof ReactTetris>;

const Template: ComponentStory<typeof ReactTetris> = (args) => (
  <ReactTetris {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  width: 300,
  minoColor: "red",
  wallColor: "black",
  backgroundColor: "white",
  speed: 200,
};
