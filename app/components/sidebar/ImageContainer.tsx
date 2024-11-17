import React from 'react'

const ImageContainer = () => {

    const arr = [
        {
          id: 1,
          image: 'https://via.placeholder.com/100', // Replace with actual image URLs
          rating: 4.5,
          parkingLotInfo: 'Downtown Parking Lot - 24/7 Access',
          passColor: 'Blue',
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/100',
          rating: 5,
          parkingLotInfo: 'Airport Parking Lot - Secure and Covered',
          passColor: 'Green',
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/100',
          rating: 3.5,
          parkingLotInfo: 'Mall Parking Lot - Affordable Rates',
          passColor: 'Red',
        },
      ];
      

    const Images = arr.map((val, i) => (
            <div className=''>
                
                {val.id}
            </div>
        )
    )
    return(<>
        {Images}
    </>)
}

export default ImageContainer