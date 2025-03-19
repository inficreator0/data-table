import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { Dropdown, Option } from '../../components/DropDown'

export const Options = ({
  options,
  onOptionClick,
}: {
  options: Option[]
  onOptionClick: (value: number) => void
}) => {
  const [open, setOpen] = useState(false)
  const handleSelection = (value: number) => {
    onOptionClick(value)
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setOpen(true)
      }}
      className={'cursor-pointer p-2'}
    >
      <EllipsisVerticalIcon className={'h-4 w-4'} />
      {open && (
        <Dropdown
          open={open}
          setOpen={setOpen}
          options={options}
          onSelection={handleSelection}
        />
      )}
    </div>
  )
}
