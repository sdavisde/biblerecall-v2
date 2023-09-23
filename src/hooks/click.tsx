import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any, onOutsideClick: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOnPanel(event: any) {
      const panel = document.getElementById('panel')
      if (panel && event.target && panel === event.target) {
        onOutsideClick()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOnPanel)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOnPanel)
    }
  }, [ref])
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props: { children: any; onOutsideClick: () => void }) {
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, props.onOutsideClick)

  return <div ref={wrapperRef}>{props.children}</div>
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
}

export default OutsideAlerter
