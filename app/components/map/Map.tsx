import React from 'react'
import { useTransformInit } from 'react-zoom-pan-pinch'

type Props = {}

const Map: React.FC<Props> = () => {
  useTransformInit(({ instance }) => {
    const element = instance.contentComponent
    const wrapper = instance.contentComponent?.parentElement
    if (!element || !wrapper) return

    element.style.touchAction = 'auto'
    wrapper.style.height = '100vh'
    wrapper.style.width = '100vw'
    wrapper.style.touchAction = 'auto'
  })

  // Add a second image to the file

  return (
    <>
      <img src="/Parking_Map.svg" alt="test" className="max-w-none" />
    </>
  )
}

export default Map
