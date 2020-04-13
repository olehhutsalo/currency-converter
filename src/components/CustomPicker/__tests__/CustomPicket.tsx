import React from 'react'
import CustomPicker from '../CustomPicker'
import { shallow } from 'enzyme'

const items = [
  { label: 'Foo', value: 'foo' },
  { label: 'Bar', value: 'bar' },
]

describe('components -> <CustomPicker />', () => {
  it('renders with selected value on iOS', () => {
    const component = shallow(
      <CustomPicker items={items} selectedValue={'bar'} onChange={() => {}} />,
    )
    expect(component).toMatchSnapshot()
  })

  it('renders without selected value on iOS', () => {
    const component = shallow(
      <CustomPicker items={items} selectedValue={null} onChange={() => {}} />,
    )
    expect(component).toMatchSnapshot()
  })
})
