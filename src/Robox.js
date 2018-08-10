
import React from 'react'
import PropTypes from 'prop-types'
import { createUnderstyle } from 'understyle'

const Robox = (Comp) => {
  class WrappedComponent extends React.Component {
    render () {
      const { robox: config } = this.context
      const {
        p, pt, pr, pb, pl, px, py,
        m, mt, mr, mb, ml, mx, my,
        gutter,
        col,
        block,
        inlineBlock,
        inline,
        table,
        tableRow,
        tableCell,
        flex,
        inlineFlex,
        wrap,
        flexColumn,
        align,
        justify,
        flexAuto,
        flexNone,
        order,
        style,
        ...props
      } = this.props
      const _style = createUnderstyle(config)

      const styleProps = {
        p, pt, pr, pb, pl, px, py,
        m, mt, mr, mb, ml, mx, my,
        gutter,
        col,
        block,
        inlineBlock,
        inline,
        table,
        tableRow,
        tableCell,
        flex,
        inlineFlex,
        wrap,
        flexColumn,
        align,
        justify,
        flexAuto,
        flexNone,
        order
      }

      const sx = {
        boxSizing: 'border-box',
        ..._style(styleProps),
        ...style
      }

      return <Comp {...props} style={sx} />
    }
  }

  WrappedComponent.contextTypes = {
    robox: PropTypes.shape({
      scale: PropTypes.arrayOf(PropTypes.number),
      columns: PropTypes.number
    })
  }

  const spaceScale = [ 0, 1, 2, 3, 4, 5, 6 ]

  WrappedComponent.propTypes = {
    m: PropTypes.oneOf(spaceScale),
    mt: PropTypes.oneOf(spaceScale),
    mr: PropTypes.oneOf(spaceScale),
    mb: PropTypes.oneOf(spaceScale),
    ml: PropTypes.oneOf(spaceScale),
    mx: PropTypes.oneOf(spaceScale),
    my: PropTypes.oneOf(spaceScale),
    gutter: PropTypes.oneOf(spaceScale),
    p: PropTypes.oneOf(spaceScale),
    pt: PropTypes.oneOf(spaceScale),
    pr: PropTypes.oneOf(spaceScale),
    pb: PropTypes.oneOf(spaceScale),
    pl: PropTypes.oneOf(spaceScale),
    px: PropTypes.oneOf(spaceScale),
    py: PropTypes.oneOf(spaceScale),
    col: PropTypes.number,
    block: PropTypes.bool,
    inlineBlock: PropTypes.bool,
    inline: PropTypes.bool,
    table: PropTypes.bool,
    tableRow: PropTypes.bool,
    tableCell: PropTypes.bool,
    flex: PropTypes.bool,
    inlineFlex: PropTypes.bool,
    wrap: PropTypes.bool,
    flexColumn: PropTypes.bool,
    align: PropTypes.oneOf([
      'flex-start',
      'flex-end',
      'baseline',
      'center',
      'stretch'
    ]),
    justify: PropTypes.oneOf([
      'flex-start',
      'flex-end',
      'space-between',
      'space-around',
      'center'
    ]),
    flexAuto: PropTypes.bool,
    flexNone: PropTypes.bool,
    order: PropTypes.number,

    // Warn against legacy prop name
    column: (props, propName, componentName) => {
      if (props[propName]) {
        return new Error(
          'Warning! Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Use the `column` prop instead.'
        )
      }
    }
  }

  return WrappedComponent
}

export default Robox

