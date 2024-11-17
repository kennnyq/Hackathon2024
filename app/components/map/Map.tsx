import React, { useState } from 'react'
import { useTransformEffect, useTransformInit } from 'react-zoom-pan-pinch'
import { MarkerInfo, Review } from '~/utils/types'
import Marker from './Marker'
import { kebabCase } from '~/utils/utils'

const STATUS_COLORS = ['#69b34c', '#acb334', '#fab733', '#ff8e15', '#ff0d0d']

type Props = {
  color: string
  markers: any[]
  sidebarTimeout: Boolean
  setSwitcherActive: (show: boolean) => void
  setSidebarActive: (show: boolean) => void
  setSidebarTimeout: (show: boolean) => void
  setRating: (set: number) => void
  setCount: (set: number) => void
  setReviews: (set: Review[]) => void
  setLotName: (set: string) => void
}

const Map: React.FC<Props> = ({
  color,
  markers,
  sidebarTimeout,
  setSwitcherActive,
  setSidebarActive,
  setSidebarTimeout,
  setRating,
  setCount,
  setReviews,
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

    const status = Math.max(Math.round(val.averageRating), 1) - 1
    const statusColor = STATUS_COLORS[status]

    return (
      <Marker
        key={i}
        active={markerActive}
        color={statusColor}
        x={val.x}
        y={val.y}
        scale={scale}
        onClick={() => {
          setLotName(lotID)
          setSidebarActive(true)
          setSidebarTimeout(true)
          setRating(val.averageRating)
          setCount(val.count)
          setReviews(val.reviews)
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
