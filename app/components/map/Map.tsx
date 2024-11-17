import React, { useState } from 'react'
import { useTransformEffect, useTransformInit } from 'react-zoom-pan-pinch'
import { MarkerInfo } from '~/utils/types'
import Marker from './Marker'
import { kebabCase } from '~/utils/utils'

type Props = {
  color: string
  markers: MarkerInfo[]
  sidebarTimeout: Boolean
  setSwitcherActive: (show: boolean) => void
  setSidebarActive: (show: boolean) => void
  setSidebarTimeout: (show: boolean) => void
  setLotName: (set: string) => void
}

const Map: React.FC<Props> = ({
  color,
  markers,
  sidebarTimeout,
  setSwitcherActive,
  setSidebarActive,
  setSidebarTimeout,
  setLotName,
}) => {
  const [scale, setScale] = useState(1)

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
    setScale(state.scale)
    setSwitcherActive(false)
    if (!sidebarTimeout) {
      setSidebarActive(false)
    }
  })

  const MarkerElements = markers.map((val, i) => {
    const markerActive = val.color == color
    const lotID = val.location
    return (
      <Marker
        key={i}
        active={markerActive}
        color={val.color}
        x={val.x}
        y={val.y}
        scale={scale}
        onClick={() => {
          setLotName(lotID)
          setSidebarActive(true)
          setSidebarTimeout(true)
          setTimeout(() => {
            setSidebarTimeout(false)
          }, 400)
        }}
      />
    )
  })

  return (
    <>
      <img
        src="/Parking_Map_New (1).svg"
        alt="test"
        className="max-w-none"
        style={{
          boxShadow: '0 0 100px rgba(255, 255, 255, 2)',
        }}
      />
      {MarkerElements}
    </>
  )
}

export default Map
