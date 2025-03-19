import React, { ReactElement } from 'react'
import { Button } from './Button'

type ModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  text?: string | ReactElement
  onConfirmation?: () => void
  confirmText?: string
  heading: string
}

export const Modal = (props: ModalProps) => {
  const handleConfirm = () => {
    props.setOpen(false)
    props.onConfirmation && props.onConfirmation()
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {props.open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => props.setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">{props.heading}</h2>
            <p className="text-gray-700">{props.text}</p>
            <div className={'flex justify-between mt-4'}>
              <Button onClick={() => props.setOpen(false)} label={'Close'} className={'bg-gray-500 text-white'}/>
              <Button
                onClick={handleConfirm}
                label={props.confirmText || 'Done'}
                className={'bg-red-400 text-white'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
