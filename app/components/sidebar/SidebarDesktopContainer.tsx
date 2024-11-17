import React, { useEffect, useRef, useState } from 'react'
import { useSpring, a, config } from '@react-spring/web'
import Sidebar from './Sidebar'
import { Color } from '~/utils/types'
import { composeEventHandlers } from '@remix-run/react/dist/components'

const WIDTH = 400

type Props = {
  lotName: string
  color: Color
  sidebarActive: Boolean
  sidebarTimeout: Boolean
  setSidebarActive: (set: boolean) => void
}

const SidebarContainerDesktop: React.FC<Props> = ({
  lotName,
  color,
  sidebarActive,
  setSidebarActive,
}) => {
  const [{ x }, api] = useSpring(() => ({ x: -WIDTH - 100 }))

  useEffect(() => {
    if (sidebarActive) {
      setSidebarActive(true)
      open()
    } else {
      setSidebarActive(false)
      close()
    }
  }, [sidebarActive])

  const open = () => {
    api.start({
      x: 0,
      immediate: false,
      config: {
        bounce: 0,
        tension: 200,
      },
    })
  }

  const close = () => {
    api.start({
      x: -WIDTH,
      immediate: false,
      config: {
        bounce: 0,
        tension: 250,
      },
    })
  }

  return (
    <a.div
      className={`absolute left-0 top-0 h-screen w-[400px] overscroll-none bg-white
        z-10 shadow-[2px_0px_12px_rgba(0,0,0,0.1)] overflow-y-scroll`}
      onClick={() => open()}
      style={{
        x,
      }}
    >
      <Sidebar
        display="desktop"
        lotName={lotName}
        color={color}
        rating={2.6}
        ratingCount={416}
      />
    </a.div>
  )
}

export default SidebarContainerDesktop
