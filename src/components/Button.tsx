import React, { ReactElement } from 'react'
import { cn } from '../utils/utils'

type ButtonProps = {
  icon?: ReactElement
  label: string
  className?: string
  onClick: () => void
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={cn(
        'border-[#dadbdd] border py-2 bg-white px-3 rounded-lg text-sm flex gap-2 w-fit align-middle justify-center',
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.icon}
      <span className={cn('whitespace-nowrap', props.icon && 'hidden xs:block')}>
        {props.label}
      </span>
    </button>
  )
}
