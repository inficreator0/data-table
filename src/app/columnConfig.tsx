import { IColumConfig } from '../dataTable/interfaces'
import { Leads } from './interfaces'
import { Checkbox } from '../components/checkbox'
import { cn } from '../utils/utils'
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import React, { useState } from 'react'
import { Dropdown, Option } from '../components/DropDown'

const totalStage = [
  { id: 1, name: 'Intro call', status: true },
  { id: 2, name: 'Assignment', status: true },
  { id: 3, name: 'HRM', status: true },
  { id: 4, name: 'Offer roll out', status: true },
  { id: 5, name: 'Joined', status: false },
]

export const columnConfig: (
  onOptionClick: (value: number, rowId: number) => void,
  options: Option[],
) => IColumConfig<Leads>[] = (onOptionClick, options) => {
  return [
    {
      id: 'name',
      headerLabel: 'Name',
      sortingEnabled: true,
      jsx: (rowData) => {
        return (
          <div className={'flex gap-2 align-middle items-center'}>
            <div
              className={
                'h-[32px] px-2  rounded-full justify-center items-center border border-[#ece8ff] bg-[#f5f2ff]'
              }
            >
              <span
                className={'text-xs font-medium text-[#6a1be0] self-center'}
              >
                {rowData.name.split(' ')[0][0]}
                {rowData.name.split(' ')?.[1][0]}
              </span>
            </div>
            <div className={'flex justify-center flex-col'}>
              <span className={'font-medium text-[#28272a]'}>
                {rowData.name}
              </span>
              <span className={'text-xs font-medium text-[#646069]'}>
                {rowData.email}
              </span>
            </div>
          </div>
        )
      },
    },
    { id: 'company', headerLabel: 'Company' },
    {
      id: 'stage',
      headerLabel: 'Stage',
      jsx: (rowData) => {
        return (
          <div className={'flex gap-0.5 items-center '}>
            {totalStage.map((stage) => {
              return (
                <div
                  className={cn(
                    'h-4 w-1  rounded-lg',
                    rowData.stage >= stage.id ? 'bg-[#7b2ff8]' : 'bg-[#dbdadd]',
                  )}
                />
              )
            })}
          </div>
        )
      },
    },
    {
      id: 'engaged',
      headerLabel: 'Engaged',
      jsx: (rowData) => {
        return rowData.engaged ? (
          <div
            className={
              'text-[#1b851b] flex w-fit px-1 py-0.5 border border-[#defbdd] rounded bg-[#f2fcf1] gap-1 align-middle'
            }
          >
            <CheckCircleIcon className={'h-4 w-4'} />
            <span className={'font-medium text-xs hidden lg:block'}>
              Engaged
            </span>
          </div>
        ) : (
          <div
            className={
              'text-[#646069] flex w-fit border py-0.5 rounded bg-[#f7f7f8] border-[#dbdadd] px-1 gap-1'
            }
          >
            <ClockIcon className={'h-4 w-4'} />
            <span className={'font-medium text-xs hidden lg:block'}>
              Not Engaged
            </span>
          </div>
        )
      },
    },
    {
      id: 'lastContacted',
      headerLabel: 'Last Contacted',
      sortingEnabled: true,
      jsx: (rowData) => {
        return (
          <span className={'text-sm'}>
            {rowData.lastContacted
              ? new Date(rowData.lastContacted).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : '-'}
          </span>
        )
      },
    },
    {
      id: 'action',
      headerLabel: '',
      jsx: (rowData) => {
        const handleOptionClick = (value: number) => {
          onOptionClick(value, rowData.id)
        }

        return <Options options={options} onOptionClick={handleOptionClick} />
      },
    },
  ]
}

const Options = ({
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
