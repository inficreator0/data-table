import React, { useEffect, useReducer } from 'react'
import { Leads } from '../app/interfaces'
import { INITIAL_STATE, reducer } from './reducer'

type CreateLeadProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: any, mode: 'CREATE' | 'UPDATE') => void
  initialState?: Leads | null
  mode: 'CREATE' | 'UPDATE'
}

export const CreateLead = ({
  isOpen,
  onClose,
  onSave,
  initialState = INITIAL_STATE,
  mode,
}: CreateLeadProps) => {
  const [formData, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: 'SET_INITIAL_STATE',
      value: initialState,
    })

    return () => {
      dispatch({ type: 'RESET' })
    }
  }, [initialState])

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    dispatch({
      type: 'SET_VALUE',
      field: name,
      value: type === 'checkbox' ? checked : value,
    })
  }

  const handleSave = () => {
    onSave(formData, mode)
    dispatch({ type: 'RESET' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {mode === 'CREATE' ? 'Create Lead' : 'Update Lead'}
        </h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="date"
          name="lastContacted"
          value={formData.lastContacted}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded bg-transparent"
        />

        <input
          type="number"
          max={5}
          min={1}
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          placeholder="Stage"
          className="w-full border p-2 mb-3 rounded"
        />

        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            name="engaged"
            checked={formData.engaged}
            onChange={handleChange}
          />
          <span>Engaged</span>
        </label>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {mode === 'CREATE' ? 'Save' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  )
}
