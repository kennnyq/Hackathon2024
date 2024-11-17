import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  TransformWrapper,
  TransformComponent,
  useControls,
  ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch'
import Map from './Map'
import { useWindowSize } from '~/utils/hooks'
import { MarkerInfo, Review } from '~/utils/types'

// Map Dimensions
const HEIGHT = 1056
const BOUNDS_OFFSET = 30

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls()

  return (
    <div className="tools">
      <button onClick={() => zoomIn()}>+</button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform()}>x</button>
    </div>
  )
}

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

const MapContainer: React.FC<Props> = ({
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
  const ref = useRef<ReactZoomPanPinchRef>(null)

  const [windowWidth, windowHeight] = useWindowSize()
  const [scaleBounds, setScaleBounds] = useState({
    init: 1.5,
    min: 0.5,
    max: 2,
  })

  const updateBounds = () => {
    const scaleY = windowHeight / HEIGHT
    setScaleBounds({
      init: scaleY * 1.5,
      min: scaleY * 0.98,
      max: scaleY * 5,
    })
  }
  useEffect(() => updateBounds(), [windowHeight, windowWidth])

  return (
    <TransformWrapper
      ref={ref}
      initialScale={1.5}
      centerOnInit={true}
      minScale={scaleBounds.min}
      maxScale={scaleBounds.max}
      alignmentAnimation={{
        sizeX: BOUNDS_OFFSET,
        sizeY: BOUNDS_OFFSET,
        animationTime: 100,
      }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          {/* <Controls /> */}
          <TransformComponent>
            <Map
              color={color}
              markers={markers}
              sidebarTimeout={sidebarTimeout}
              setSwitcherActive={setSwitcherActive}
              setSidebarActive={setSidebarActive}
              setSidebarTimeout={setSidebarTimeout}
              setRating={setRating}
              setCount={setCount}
              setReviews={setReviews}
              setLotName={setLotName}
            />
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  )
}

export default MapContainer
