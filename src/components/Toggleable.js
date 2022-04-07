import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideElement = { display: visible ? 'none' : '' }
  const showElement = { display: visible ? '' : 'none' }

  const visibilityToggle = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      visibilityToggle
    }
  })


  return (
    <div>
      <div style={hideElement}>
        <button onClick={visibilityToggle}>{props.buttonLabel1}</button>
      </div>
      <div style={showElement}>
        {props.children}
        <button onClick={visibilityToggle}>{props.buttonLabel2}</button>
      </div>
    </div>
  )

})
Toggleable.displayName = 'Toggleable'
Toggleable.propTypes = {
  buttonLabel1: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string.isRequired,
}
export default Toggleable