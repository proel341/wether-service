import { useState } from "react"
import Input from "../Input/Input"
import "./PositionSelector.css"
import { IPosition } from "../../Types"

const PositionSelector = ({ onSelect }: IPositionSelector) => {

  const [lat, setLat] = useState<number | null>(null)
  const [lon, setLon] = useState<number | null>(null)

  const buttonHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (!lat || !lon) return
    onSelect({ lat, lon })
  }

  return (
    <>
      <div className="input-row">
        <Input type="number" onChange={(newVal) => setLon(+newVal)} placeholder='Введите долготу' />
        <Input type="number" onChange={(newVal) => setLat(+newVal)} placeholder='Введите широту' />
      </div>

      <button onClick={buttonHandler}>Поиск</button>
    </>
  )
}

export default PositionSelector

interface IPositionSelector {
  onSelect: (position: IPosition) => void
}