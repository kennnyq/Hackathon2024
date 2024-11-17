import React from 'react'
import { useTransformEffect, useTransformInit } from 'react-zoom-pan-pinch'
import { MarkerInfo } from '~/utils/types'
import Marker from './Marker'
import { kebabCase } from '~/utils/utils'

type Props = {
  color: string
  markers: MarkerInfo[]
  setSwitcherActive: (show: boolean) => void
}

const Map: React.FC<Props> = ({ color, markers, setSwitcherActive }) => {
  useTransformInit(({ instance }) => {
    const element = instance.contentComponent
    const wrapper = instance.contentComponent?.parentElement
    if (!element || !wrapper) return

    element.style.touchAction = 'auto'
    wrapper.style.height = '100vh'
    wrapper.style.width = '100vw'
    wrapper.style.touchAction = 'auto'
  })

  useTransformEffect(({ state, instance }) => {
    setSwitcherActive(false)
  })

  const MarkerElements = markers.map((val, i) => {
    const markerActive = val.color == color
    const lotID = kebabCase(val.location)
    return (
      <Marker
        key={i}
        active={markerActive}
        lotID={lotID}
        color={val.color}
        x={val.x}
        y={val.y}
      />
    )
  })

  return (
    <>
      <img src="/Parking_Map_New (1).svg" alt="test" className="max-w-none" />
      {MarkerElements}
    </>
  )
}

export default Map
