import React from 'react'
import ColorSwitcher from './ColorSwitcher'



const PopUp = () => {
  return (
    <div className='z-20 absolute top-0 left-0 flex'>
        <div className="w-screen h-screen absolute opacity-70 bg-black flex "></div>
        <div className="items-center justify-center flex w-screen h-screen">
          <div className="z-30 flex h-96 w-80 bg-white absolute justify-center rounded-md ">
            <div className="p-10 font-sans font-bold text-center text-xl">
              <ColorSwitcher color='none' switcherActive={false} setColor={() => {}} setSwitcherActive={() => {}}/>
            </div>
          </div>
        </div>
    </div>


  )
}

export default PopUp