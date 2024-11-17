import React from 'react'
import { Color } from '~/utils/types'
import { capitalizeFirst } from '~/utils/utils'

type displayProps = {
  color: Color
  onClick: () => void
}

const ColorDisplay: React.FC<displayProps> = ({ color, onClick }) => {
  const colorMap: { [key in Color]: string } = {
    green: '#05b050',
    gold: '#ffff00',
    orange: '#e77623',
  }

  const backgroundColor = colorMap[color] || 'white'
  const textColor = color === 'gold' ? 'black' : 'white'

  return (
    <div
      className="flex justify-center items-center h-8 w-full
      cursor-pointer select-none rounded-[32px]
      text-base transition ease-linear duration-75"
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        boxShadow:
          '0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
      }}
    >
      {capitalizeFirst(color)}
    </div>
  )
}

type optionProps = {
  color: Color
  setColor: (color: Color) => void
  setSwitcherActive: (show: boolean) => void
}

const ColorOption: React.FC<optionProps> = ({
  color,
  setColor,
  setSwitcherActive,
}) => {
  return (
    <ColorDisplay
      color={color}
      onClick={() => {
        setColor(color)
        setSwitcherActive(false)
      }}
    />
  )
}

type Props = {
  color: Color
  switcherActive: boolean
  setColor: (color: Color) => void
  setSwitcherActive: (show: boolean) => void
}

const ColorSwitcher: React.FC<Props> = ({
  color,
  switcherActive,
  setColor,
  setSwitcherActive,
}) => {
  const colors: Color[] = ['green', 'gold', 'orange']

  return (
    <div className="h-8 w-28 flex flex-col absolute z-10 right-2 top-3 font-medium font-sans">
      <ColorDisplay
        color={color}
        onClick={() => setSwitcherActive(!switcherActive)}
      />
      <div
        className={`absolute flex flex-col mt-10 gap-2
        rounded-md z-10 w-full transition-all duration-100 ease-out
        ${
          switcherActive
            ? 'transform translate-y-0 opacity-100 visible'
            : 'transform translate-y-1.5 opacity-0 invisible'
        }`}
      >
        {colors.map((val, index) => {
          if (val === color) return null
          return (
            <ColorOption
              key={index}
              color={val}
              setColor={setColor}
              setSwitcherActive={setSwitcherActive}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ColorSwitcher
