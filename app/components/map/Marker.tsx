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
      className="absolute flex items-center justify-center cursor-pointer py-3 px-3"
      style={{
        top: y + 12,
        left: x + 12,
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
          boxShadow: `0 0 20px ${color}`,
        }}
      >
        <div className={`bg-[${color}] rounded-full h-2/3 w-2/3`} />
      </div>
    </div>
  )
}

export default Marker
