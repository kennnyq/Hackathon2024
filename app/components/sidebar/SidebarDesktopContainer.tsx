import React, { useRef } from 'react'
import { useSpring, a, config } from '@react-spring/web'
import Sidebar from './Sidebar'

const WIDTH = 400

const SidebarContainerDesktop: React.FC = () => {
  const [{ x }, api] = useSpring(() => ({ x: 800 }))

  const open = () => {
    api.start({
      x: 0,
      immediate: false,
      config: config.stiff,
    })
  }

  const close = () => {
    api.start({
      x: -WIDTH,
      immediate: false,
      config: { ...config.stiff },
    })
  }

  return (
    <a.div
      className={`absolute left-0 top-0 h-screen w-[400px] overscroll-none bg-white
        z-10 shadow-[2px_0px_12px_rgba(0,0,0,0.1)] overflow-y-scroll`}
    >
      <Sidebar
        display="desktop"
        lotName="Lot T"
        rating={2.6}
        ratingCount={416}
      />
    </a.div>
  )
}

export default SidebarContainerDesktop
