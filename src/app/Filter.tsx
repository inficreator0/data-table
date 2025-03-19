import React from 'react'

export const Filter = () => {
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="engaged" className="block text-sm font-medium">
          Engaged:
        </label>
        <input type="checkbox" id="engaged" name="engaged" className="mt-2" />
      </div>
      <div className="mb-4">
        <label htmlFor="stage" className="block text-sm font-medium">
          Stage:
        </label>
        <select
          id="stage"
          name="stage"
          className="mt-2 w-full border border-gray-300 rounded-lg py-2"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
    </div>
  )
}
