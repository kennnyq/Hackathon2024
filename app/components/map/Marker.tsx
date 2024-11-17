import React from 'react'
import { Color } from '~/utils/types'

type Props = {
  active: boolean
  lotID: string
  color: Color
  x: number
  y: number
  scale: number
}

const Marker: React.FC<Props> = ({ active, color, lotID, x, y, scale }) => {
  return (
    <div
      className="absolute flex items-center justify-center h-20 w-20"
      style={{
        top: y,
        left: x,
        visibility: active ? 'visible' : 'hidden',
        // height:
      }}
    >
      <div
        className="bg-white flex items-center justify-center rounded-full"
        style={{
          height: 24 * 1/scale,
          width: 24  * 1/scale,
        }}
      >
        <div className="bg-blue-500 rounded-full h-2/3 w-2/3" />
      </div>
    </div>
  )
}

export default Marker
