export type MarkerInfo = {
  location: string
  color: Color
  x: number
  y: number
}

export type Review = {
  imagePath: string
  dateTime: string
  rating: 5
}

export type Color = 'none' | 'orange' | 'gold' | 'green'
export type Lot = 'none' | 'Lot T'
