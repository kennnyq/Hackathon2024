import React from 'react'
import { Color } from '~/utils/types'

type Props = {
  active: boolean
  lotID: string
  color: Color
  x: number
  y: number
}

const Marker: React.FC<Props> = ({ active, color, lotID, x, y }) => {
  return (
    <div
      className="absolute"
      style={{
        top: y,
        left: x,
        visibility: active ? 'visible' : 'hidden',
      }}
    >
      <div className="relative h-20 w-20 flex items-center justify-center">
        <div className="bg-white rounded-full h-6 w-6 shadow-lg flex items-center justify-center">
          <div className="bg-blue-500 rounded-full h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

export default Marker
