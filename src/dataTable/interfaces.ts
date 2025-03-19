import { ReactElement } from 'react'

export interface IColumConfig<T> {
  id: string
  headerLabel: string
  jsx?: (item: T) => ReactElement
  headerJsx?: () => ReactElement
  sortingEnabled?: boolean
}

export type DataTableProps<T extends Record<string, any>> = {
  data: T[]
  columnConfig: IColumConfig<T>[]
  totalRows?: number
  onPageChange?: (page: number, rowPerPage: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
  rowsPerPageOptions?: number[]
  onRowClick?: (rowData: T) => void
  page: number
  rowsPerPage: number
  selectedRows?: number[]
  sortOrder?: 'asc' | 'desc'
  sortBy?: string
  onSort: (columnId: keyof T, sortOrder: 'asc' | 'desc') => void
  parentClassName?: string
  selectionEnabled?: boolean
  setRowSelection?: (rows: number[]) => void
}
