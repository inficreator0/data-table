import React from 'react'
import { cn } from '../../utils/utils'
import { IColumConfig } from '../interfaces'
import { Checkbox } from '../../components/checkbox'

export const Row = <T extends Record<string, any>>({
  rowData,
  columnConfig,
  onRowClick,
  isSelected,
  selectionEnabled = false,
  setRowSelection,
}: {
  rowData: T
  columnConfig: IColumConfig<T>[]
  onRowClick?: (row: T) => void
  isSelected?: boolean
  selectionEnabled?: boolean
  setRowSelection?: (rowsId: number, status: boolean) => void
}) => {
  const handleRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onRowClick && onRowClick(rowData)
  }

  return (
    <tr
      className={cn(
        'h-[64px] border-b transition-colors hover:bg-slate-200',
        isSelected && 'bg-blue-200',
      )}
      onClick={handleRowClick}
    >
      {selectionEnabled && (
        <td
          key={'checkbox' + rowData.toString()}
          className={'align-middle items-center justify-center cursor-pointer'}
          onClick={(e) => {
            e.stopPropagation()
            setRowSelection && setRowSelection(rowData.id, !isSelected)
          }}
        >
          <div className={'flex justify-center mx-2'}>
            <Checkbox checked={!!isSelected} />
          </div>
        </td>
      )}
      {columnConfig.map((column) => {
        if (column.jsx)
          return (
            <td
              className={'align-middle items-center justify-center px-4'}
              key={column.id + rowData.toString()}
            >
              {column.jsx(rowData)}
            </td>
          )
        else
          return (
            <Cell
              key={column.id + rowData.toString()}
              cellData={rowData[`${column.id}`]}
            />
          )
      })}
    </tr>
  )
}

const Cell = ({ cellData }: { cellData: any }) => {
  return (
    <td className="align-middle px-6 py-4 text-sm text-[#28272a]">
      {cellData}
    </td>
  )
}
