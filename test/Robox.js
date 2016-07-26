
import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import Robox from '../src/Robox'

const ButtonBase = (props) => {
  return <button {...props} />
}

let Button

test('wraps the base component', t => {
  t.notThrows(() => {
    Button = Robox(ButtonBase)
  })
})

test('passes props to component', t => {
  const wrapper = shallow(<Button children='Hello' />)
  t.true(wrapper.contains('Hello'))
})

test('applies styles based on understyle', t => {
  const wrapper = shallow(<Button m={2} p={1} />)
  t.deepEqual(wrapper.props(), {
    style: {
      margin: 16,
      padding: 8
    }
  })
})

test('applies boolean style props', t => {
  const wrapper = shallow(<Button flex wrap column flexAuto />)
  t.deepEqual(wrapper.props().style, {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    flex: '1 1 auto'
  })
})

test('combines style prop with understyle styles', t => {
  const sx = { color: 'tomato' }
  const wrapper = shallow(<Button m={2} style={sx} />)
  t.deepEqual(wrapper.props(), {
    style: {
      color: 'tomato',
      margin: 16
    }
  })
})

test('overrides understyle with style prop', t => {
  const sx = { margin: 12 }
  const wrapper = shallow(<Button m={2} style={sx} />)
  t.deepEqual(wrapper.props(), {
    style: {
      margin: 12
    }
  })
})

test('does not pass Robox props to DOM element', t => {
  t.plan(3)
  const wrapper = shallow(<Button m={2} p={1} />)
  const html = wrapper.html()
  t.regex(html, /style="/)
  t.false(/\sm="/.test(html))
  t.false(/\sp="/.test(html))
})

test('allows configuration of scale through context', t => {
  const wrapper = shallow(<Button m={1} p={2} />, {
    context: {
      robox: {
        scale: [0, 6, 12, 18, 24, 30, 36]
      }
    }
  })
  t.deepEqual(wrapper.props().style, {
    margin: 6,
    padding: 12
  })
})

test('allows configuration of columns through context', t => {
  const wrapper = shallow(<Button col={4} />, {
    context: {
      robox: {
        columns: 16
      }
    }
  })
  t.deepEqual(wrapper.props().style, {
    width: '25%'
  })
})

