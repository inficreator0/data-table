import React, { useRef, useEffect } from 'react'

type DropDownProps = {
  options: Option[]
  open: boolean
  setOpen: (open: boolean) => void
  onSelection: (value: number) => void
}

export interface Option {
  label: string
  value: number
  icon?: React.ReactNode
}

export const Dropdown = (props: DropDownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectOption = (value: number) => {
    props.onSelection(value)
    props.setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        props.setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {props.open && (
        <div className="absolute left-[-60px] w-fit bg-white border border-gray-300 shadow-md rounded-md z-50">
          <ul className="py-2">
            {props.options.map((option) => (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                key={option.label}
                onClick={() => selectOption(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
