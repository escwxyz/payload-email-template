import type { Field } from 'payload'

export const horizontalAlignments: Field = {
  name: 'align',
  type: 'select',
  options: [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
  ],
  defaultValue: 'left',
}

export const verticalAlignments: Field = {
  name: 'verticalAlign',
  type: 'select',
  options: [
    { label: 'Top', value: 'top' },
    { label: 'Middle', value: 'middle' },
    { label: 'Bottom', value: 'bottom' },
  ],
  defaultValue: 'middle',
}

export const textAlignment: Field = {
  name: 'textAlign',
  type: 'select',
  options: [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
  ],
  defaultValue: 'left',
}
