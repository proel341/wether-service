import { ChangeEvent, useState } from "react"
import "./Input.css"

let timeoutId: NodeJS.Timeout;

const Input = ({ delay = 0, type = "text", placeholder, onChange }: IInputProps) => {

  const [value, setValue] = useState<string>("")

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (type === "number" && isNaN(+newValue)) {
      return
    }

    setValue(newValue)

    clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
      onChange(newValue)
    }, delay)
  }

  return (
    <input type="text" className="input" placeholder={placeholder} value={value} onChange={inputHandler} />
  )
}

export default Input

interface IInputProps {
  delay?: number,
  type?: "text" | "number"
  placeholder: string,
  onChange: (newValue: string) => void
}