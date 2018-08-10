import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import Robox from '../src/Robox'
import PropTypes from 'prop-types'

const ButtonBase = (props) => {
  return <button {...props} />
}

const Button = Robox(ButtonBase)

function render(element, options = {}) {
  const context = options.context || {}
  const contextTypes = {}
  Object.keys(context).forEach(key => (contextTypes[key] = PropTypes.any))
  class ContextProvider extends React.Component {
    getChildContext() {
      return context
    }
    render() {
      return element
    }
  }
  ContextProvider.childContextTypes = contextTypes
  return ReactTestUtils.renderIntoDocument(<ContextProvider context={context}>{element}</ContextProvider>)
}

const node = ReactDOM.findDOMNode

function textContent(component) {
  return ReactDOM.findDOMNode(component).textContent
}

test('passes props to component', () => {
  const wrapper = render(<Button children='Hello' />)
  expect(textContent(wrapper)).toContain('Hello')
})

test('applies styles based on understyle', () => {
  const wrapper = render(<Button m={2} p={1} />)
  const style = node(wrapper).style
  expect(style['box-sizing']).toEqual('border-box')
  expect(style.margin).toEqual('16px')
  expect(style.padding).toEqual('8px')
})

test('applies boolean style props', () => {
  const wrapper = render(<Button flex wrap flexColumn flexAuto />)
  const style = node(wrapper).style
  expect(style.display).toEqual('flex')
  expect(style['flex-wrap']).toEqual('wrap')
  expect(style['flex-direction']).toEqual('column')
  expect(style.flex).toEqual('1 1 auto')
})

test('combines style prop with understyle styles', () => {
  const sx = { color: 'red' }
  const wrapper = render(<Button m={2} style={sx} />)
  const style = node(wrapper).style
  expect(style['box-sizing']).toEqual('border-box')
  expect(style.color).toEqual('red')
  expect(style.margin).toEqual('16px')
})

test('overrides understyle with style prop', () => {
  const sx = { margin: 12 }
  const wrapper = render(<Button m={2} style={sx} />)
  const style = node(wrapper).style
  expect(style['box-sizing']).toEqual('border-box')
  expect(style.margin).toEqual('12px')
})

test('does not pass Robox props to DOM element', () => {
  const wrapper = render(<Button m={2} p={1} />)
  const html = node(wrapper).outerHTML
  expect(html).toContain("style=")
  expect(html).not.toContain("sm")
  expect(html).not.toContain("sp")
})

test('allows configuration of scale through context', () => {
  const wrapper = render(<Button m={1} p={2} />, {
    context: {
      robox: {
        scale: [0, 6, 12, 18, 24, 30, 36]
      }
    }
  })
  const style = node(wrapper).style
  expect(style['box-sizing']).toEqual('border-box')
  expect(style.margin).toEqual('6px')
  expect(style.padding).toEqual('12px')
})

test('allows configuration of columns through context', () => {
  const wrapper = render(<Button col={4} />, {
    context: {
      robox: {
        columns: 16
      }
    }
  })
  const style = node(wrapper).style
  expect(style['box-sizing']).toEqual('border-box')
  expect(style.width).toEqual('25%')
})

