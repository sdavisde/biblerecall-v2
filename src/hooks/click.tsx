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
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
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
