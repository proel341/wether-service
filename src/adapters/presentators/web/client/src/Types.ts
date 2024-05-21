export interface ILocation {
  id: number,
  type: string,
  name: string,
  latitude: number,
  longitude: number
}

export interface IPosition {
  lat: number,
  lon: number,
}

export interface IWether {
  date: string,
  location: ILocation,
  temperatures: [
    {
      time: string,
      temperature: number
    }
  ]
}