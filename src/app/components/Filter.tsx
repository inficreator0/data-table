import React, { ChangeEventHandler, useState } from 'react'

type FilterProps = {
  filterData: any
  setFilterData: (filterData: any) => void
}

export const Filter = ({ filterData, setFilterData }: FilterProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value, type } = e.target
    if(type === 'number') setFilterData({ ...filterData, [name]: +value })
  }

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="stage" className="block text-sm font-medium">
          Stage:
        </label>
        <input
          type="number"
          max={5}
          min={1}
          id="stage"
          name="stage"
          className="w-full border p-2 mb-3 rounded"
          value={filterData?.stage}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
