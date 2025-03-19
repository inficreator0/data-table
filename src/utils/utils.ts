import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DATA } from '../app/constants'
import { Leads } from '../app/interfaces'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getData = ({
  page,
  filterData,
  rowsPerPage,
  searchString,
  sortBy,
  sortOrder,
}: {
  page: number
  rowsPerPage: number
  searchString?: string
  filterData?: Partial<Leads> | null
  sortOrder?: 'asc' | 'desc'
  sortBy?: keyof Leads
}): { data: Leads[]; total: number } => {
  let wholeData: Leads[] = []

  let localData = localStorage.getItem('leadsData') ?? null
  if (typeof localData === 'string') {
    wholeData = JSON.parse(localData)
  } else {
    localStorage.setItem('leadsData', JSON.stringify(DATA))
    wholeData = [...DATA]
  }

  if (filterData) {
    wholeData = wholeData.filter((item) => filterData.stage === item.stage)
  }

  if (searchString) {
    wholeData = wholeData.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchString?.toLowerCase()) ||
        item.company?.toLowerCase().includes(searchString?.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchString?.toLowerCase()),
    )
  }

  if (sortOrder && sortBy) {
    wholeData = wholeData.sort((a, b) => {
      let first
      let second
      if (sortOrder === 'asc') {
        first = a[sortBy]
        second = b[sortBy]
      } else {
        first = b[sortBy]
        second = a[sortBy]
      }

      if (typeof first === 'string')
        return first?.toString().localeCompare(second?.toString() ?? '') ?? 0
      if (typeof first === 'number' && second === 'number')
        return +first - +second

      return 0
    })
  }

  return {
    data: wholeData.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    total: wholeData.length,
  }
}

export const createOrUpdateData = (
  formData: any,
  mode: 'CREATE' | 'UPDATE',
) => {
  let wholeData: Leads[] = []

  let localData = localStorage.getItem('leadsData') ?? null
  if (typeof localData === 'string') {
    wholeData = JSON.parse(localData)
  } else {
    localStorage.setItem('leadsData', JSON.stringify(DATA))
    wholeData = [...DATA]
  }

  if (mode === 'CREATE') {
    wholeData = [
      ...wholeData,
      { ...formData, id: wholeData.length + 1, stage: +formData.stage },
    ]
  } else {
    wholeData = wholeData.map((item) => {
      if (item.id === formData.id) return formData
      return item
    })
  }
  localStorage.setItem('leadsData', JSON.stringify(wholeData))
}

export const deleteData = (id: number) => {
  let wholeData: Leads[] = []

  let localData = localStorage.getItem('leadsData') ?? null
  if (typeof localData === 'string') {
    wholeData = JSON.parse(localData)
  } else {
    localStorage.setItem('leadsData', JSON.stringify(DATA))
    wholeData = [...DATA]
  }

  wholeData = wholeData.filter((item) => item.id !== id)

  localStorage.setItem('leadsData', JSON.stringify(wholeData))
}

export const exportToCSV = (data: any[]) => {
  if (!data.length) {
    alert('Select data to download')
    return null
  }

  const dataHeaders = Object.keys(data?.[0]).join(',')
  const rowData = data.map((item) => Object.values(item).join(',')).join('\n')

  const csv = `${dataHeaders}\n${rowData}`

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })

  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'leads.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
