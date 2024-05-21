import { useState } from "react"
import Input from "../Input/Input"
import "./InputWithList.css"
import { ILocation, IPosition } from "../../Types"


const InputWithList = ({ placeholder, onSelect, getOptions }: IInputWithList) => {
  const [error, setError] = useState<string>("")
  const [options, setOptions] = useState<ILocation[] | null>(null)

  const changeHandler = async (newVal: string) => {
    if (newVal === "") {
      setOptions(null)
      setError("")
      return
    }

    const newOptions = await getOptions(newVal)

    if (Array.isArray(newOptions)) {
      setOptions(newOptions);
      setError("")
    } else {
      setOptions(null)
      setError("Результаты по вашему запросу не найдены(")
    }
  }

  const clickHandler = (position: IPosition) => {
    setOptions(null)
    onSelect(position)
  }

  return (
    <div className="input-w-list">

      <Input delay={800} placeholder={placeholder} onChange={changeHandler} />

      {options && <div className="input-w-list__list">
        <ul>
          {
            options.map(option => <li key={option.id} onClick={() => clickHandler({ lat: option.latitude, lon: option.longitude })}>{option.name}</li>)
          }
        </ul>
      </div>}

      {
        error && <h3 className="warning">{error}</h3>
      }

    </div>
  )
}

export default InputWithList

interface IInputWithList {
  placeholder: string,
  onSelect: (position: IPosition) => void,
  getOptions: (searchVal: string) => Promise<ILocation[]>
}

