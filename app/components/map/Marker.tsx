import React from 'react'
import { Color } from '~/utils/types'

type Props = {
  active: boolean
  color: string
  x: number
  y: number
  scale: number
  onClick: () => void
}

const Marker: React.FC<Props> = ({ active, color, x, y, scale, onClick }) => {
  return (
    <div
      className="absolute flex items-center justify-center cursor-pointer"
      style={{
        top: y + 30,
        left: x + 30,
        visibility: active ? 'visible' : 'hidden',
        // height:
      }}
      onClick={() => onClick()}
    >
      <div
        className="bg-white flex items-center justify-center rounded-full"
        style={{
          height: (24 * 1) / scale,
          width: (24 * 1) / scale,
        }}
      >
        <div className="bg-blue-500 rounded-full h-2/3 w-2/3" />
      </div>
    </div>
  )
}

export default Marker
