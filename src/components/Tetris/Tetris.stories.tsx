import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ReactTetris from './Tetris'

export default {
  title: 'Tetris',
  component: ReactTetris,
} as ComponentMeta<typeof ReactTetris>

const Template: ComponentStory<typeof ReactTetris> = (args) => <ReactTetris {...args} />

export const Primary = Template.bind({})
Primary.args = {
  width: '200px',
  divisionSize: { width: 12, height: 22 },
  minoColor: 'red',
  wallColor: 'black',
  backgroundColor: 'white',
  fallInterval: 100,
}
