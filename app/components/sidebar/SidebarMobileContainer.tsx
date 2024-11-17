import React, { useRef, useState } from 'react'
import { useSpring, a, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useWindowSize } from '~/utils/hooks'
import Sidebar from './Sidebar'

const BUFFER = 30

const SidebarContainerMobile: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ y }, api] = useSpring(() => ({ y: 0 }))
  const [isDragging, setIsDragging] = useState(false)
  const [windowWidth, windowHeight] = useWindowSize()

  const open = ({ canceled }: any) => {
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    api.start({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff,
    })
    setIsDragging(false)
  }

  const close = (velocity = 0) => {
    const height = windowHeight * 0.8
    api.start({
      y: height,
      immediate: false,
      config: { ...config.stiff, velocity },
    })
    setIsDragging(false)
  }

  const bind = useDrag(
    ({
      down,
      velocity: [, vy],
      direction: [, dy],
      offset: [, oy],
      cancel,
      canceled,
    }) => {
      // Only move when the element is near the top
      const scrollTop = ref.current?.scrollTop || 0
      if (scrollTop > 10) return

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (!down) {
        const height = windowHeight * 0.7
        oy > height * 0.5 || (vy > 0.5 && dy > 0)
          ? close(vy)
          : open({ canceled })
        setIsDragging(false)
      } else {
        api.start({ y: oy })
        if (oy > 0) setIsDragging(true)
      }
    },
    {
      from: () => [0, y.get()],
      axis: 'y',
      filterTaps: true,
      pointer: {
        touch: true,
      },
      bounds: { top: 0 },
    }
  )

  return (
    <a.div
      {...bind()}
      ref={ref}
      className={`absolute bottom-[-30px] h-[70vh] w-screen overscroll-none bg-white
        pb-[${BUFFER}px] rounded-t-2xl z-10 shadow-[0px_-2px_12px_rgba(0,0,0,0.1)]`}
      style={{
        y,
        overflowY: isDragging ? 'hidden' : 'scroll',
      }}
    >
      <Sidebar
        display="mobile"
        lotName="Lot T"
        rating={2.6}
        ratingCount={416}
      />
    </a.div>
  )
}

export default SidebarContainerMobile