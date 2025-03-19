import React from 'react'
import { DataTableProps, IColumConfig } from './interfaces'
import { Row } from './components/Row'
import { cn } from '../utils/utils'
import { Pagination } from './components/Pagination'
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/16/solid'
import { Select } from '../components/Select'
import { Checkbox } from '../components/checkbox'

export const DataTable = <T extends Record<string, any>>({
  data,
  columnConfig,
  totalRows = 0,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 20, 50],
  onRowClick,
  page,
  rowsPerPage,
  selectedRows,
  sortOrder,
  sortBy,
  onSort,
  parentClassName,
  selectionEnabled,
  setRowSelection,
}: DataTableProps<T>) => {
  const handlePageChange = (page: number) => {
    onPageChange && onPageChange(page)
  }

  const getRowPerPageOptions = () => {
    return rowsPerPageOptions.map((option) => {
      return {
        label: option.toString() + ' per page',
        value: option,
      }
    })
  }

  const handleRowPerPageChange = (newRowPerPage: number) => {
    console.log('rowPerPage', newRowPerPage)
    onRowsPerPageChange && onRowsPerPageChange(newRowPerPage)
  }

  const handleColumnHeaderClick = (column: IColumConfig<T>) => () => {
    if (column.sortingEnabled) {
      onSort &&
        onSort(
          column.id,
          sortBy === column.id && sortOrder === 'asc' ? 'desc' : 'asc',
        )
    }
  }

  const handleRowSelection = (rowId: number, selectionStatus: boolean) => {
    let selected = selectedRows ? [...selectedRows] : []
    if (selectionStatus) {
      selected.push(rowId)
    } else {
      selected = selected.filter((item) => item !== rowId)
    }
    setRowSelection && setRowSelection(selected)
  }

  return (
    <div className={cn('max-h-full w-full', parentClassName)}>
      {totalRows ? (
        <span className={'text-xs text-[#646069]'}>
          Showing {(page - 1) * rowsPerPage + 1} -{' '}
          {Math.min(page * rowsPerPage, totalRows)} of {totalRows} rows
        </span>
      ) : null}
      <div className="max-h-full w-full border border-zinc-300 rounded-xl bg-slate-50 overflow-scroll" style={{scrollbarWidth: 'none'}}>
        <table
          className="table-fixed w-auto
          min-w-full
          max-h-full
          rounded-xl"
        >
          <thead
            className={cn(
              'sticky',
              'top-0',
              'left-0',
              'z-20',
              'rounded-xl',
              'h-11',
              'overflow-hidden',
              'bg-gray-200',
            )}
          >
            <tr className={cn('border-b')}>
              {selectionEnabled && (
                <th key={'checkbox'}>
                  <div
                    className={cn(
                      'flex flex-row justify-center align-middle cursor-pointer',
                    )}
                  />
                </th>
              )}
              {columnConfig?.map((column) => {
                if (column.headerJsx)
                  return (
                    <th
                      key={column.id}
                      onClick={handleColumnHeaderClick(column)}
                    >
                      <div
                        className={cn(
                          'flex flex-row justify-center align-middle',
                          column.sortingEnabled && 'cursor-pointer',
                        )}
                      >
                        {column.headerJsx()}
                        {column.sortingEnabled && (
                          <>
                            {sortOrder === 'desc' ? (
                              <ArrowLongDownIcon className={'h-4 w-4'} />
                            ) : (
                              <ArrowLongUpIcon className={'h-4 w-4'} />
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  )
                else
                  return (
                    <th
                      key={column.id}
                      className={cn(
                        'h-10 px-2 text-left align-middle font-medium text-[#646069] text-xs',
                      )}
                      onClick={handleColumnHeaderClick(column)}
                    >
                      <div
                        className={cn(
                          'flex flex-row p-1',
                          column.sortingEnabled && 'cursor-pointer',
                          sortBy === column.id && 'bg-slate-100 rounded-lg',
                        )}
                      >
                        <span>{column.headerLabel}</span>
                        {column.sortingEnabled && (
                          <>
                            {sortOrder === 'desc' ? (
                              <ArrowLongDownIcon className={'h-4 w-4'} />
                            ) : (
                              <ArrowLongUpIcon className={'h-4 w-4'} />
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  )
              })}
            </tr>
          </thead>

          <tbody className="h-full overflow-y-scroll">
            {data.map((row) => (
              <Row
                key={row.toString()}
                rowData={row}
                columnConfig={columnConfig}
                onRowClick={onRowClick}
                isSelected={selectedRows?.includes(row.id)}
                selectionEnabled={selectionEnabled}
                setRowSelection={handleRowSelection}
              />
            ))}
          </tbody>
        </table>
        <div
          className={cn(
            'sticky',
            'rounded-b-xl',
            'bottom-0',
            'right-0',
            'left-0',
            'h-11',
            'overflow-hidden',
            'items-center',
            'justify-center',
            'flex',
            'bg-gray-200',
          )}
        >
          <Select
            options={getRowPerPageOptions()}
            onOptionSelect={handleRowPerPageChange}
          />
          <Pagination
            totalPages={Math.ceil(totalRows / rowsPerPage)}
            selectedPage={page}
            onPageSelection={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
