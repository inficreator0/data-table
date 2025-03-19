import React, { ChangeEventHandler } from 'react'

interface SelectProps {
  options: SelectOptions[]
  id?: string
  name?: string
  onOptionSelect: (value: number) => void
}

interface SelectOptions {
  label: string
  value: number
}

export const Select = ({ options, id, name, onOptionSelect }: SelectProps) => {
  const onOptionClick: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onOptionSelect(+e.target.value)
  }

  return (
    <select
      id={id}
      name={name}
      className="mt-2 rounded-lg p-2 bg-transparent outline-0 text-sm "
      onChange={onOptionClick}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className={"bg-white"}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
