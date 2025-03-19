import React, { useEffect, useState } from 'react'
import { DataTable } from '../dataTable/DataTable'
import { SearchBar } from '../components/SearchBar'
import { DATA } from './constants'
import { Leads } from './interfaces'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { Button } from '../components/Button'
import { ArrowDownCircleIcon, PlusIcon } from '@heroicons/react/16/solid'
import { Modal } from '../components/Modal'
import { CreateLead } from './CreateLead'
import { columnConfig } from './columnConfig'
import { Filter } from './Filter'

export const App = () => {
  const [data, setData] = useState<Leads[]>([])
  const [globalData, setGlobalData] = useState<Leads[]>([])
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [openCreateLead, setOpenCreateLead] = useState<boolean>(false)
  const [rowData, setRowData] = useState<Leads | null>(null)
  const [page, setPage] = useState<number>(1)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortBy, setSortBy] = useState('')
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rowForDelete, setRowForDelete] = useState<number>(0)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [filteredData, setFilteredData] = useState()

  const onPageChange = (newPage: number, rowPerPage: number) => {
    const updatedData = [...globalData]
    setData(updatedData.slice((newPage - 1) * rowPerPage, newPage * rowPerPage)) // this is equivalent to fetching data
    setPage(newPage)
  }

  useEffect(() => {
    let localData = localStorage.getItem('leadsData') ?? null
    if (typeof localData === 'string') {
      const parsedData = JSON.parse(localData)
      setGlobalData(parsedData)
    } else {
      localStorage.setItem('leadsData', JSON.stringify(DATA))
      const updateData = [...DATA]
      setGlobalData(updateData)
    }
  }, [])

  useEffect(() => {
    const updatedData = [...globalData]
    setData(updatedData?.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }, [globalData])

  const onRowPerPageChange = (newRowPerPage: number) => {
    const updatedData = [...globalData]
    setData(updatedData.slice(0, newRowPerPage)) // equivalent to data fetching
    setPage(1)
    setRowsPerPage(newRowPerPage)
  }

  const handleAddLeads = () => {
    setOpenCreateLead(true)
  }

  const handleExportAll = () => {
    //export all
  }

  const handleFilter = () => {
    setOpenFilter(true)
  }

  const onSave = (formData: any, mode: 'CREATE' | 'UPDATE') => {
    setOpenCreateLead(false)
    let newData
    if (mode === 'CREATE') {
      newData = [
        ...globalData,
        { ...formData, id: globalData.length, stage: +formData.stage },
      ]
    } else {
      const updatedGlobalData = [...globalData]
      newData = updatedGlobalData.map((item) => {
        if (item.id === formData.id) return formData
        return item
      })
    }

    setGlobalData(newData)
    localStorage.setItem('leadsData', JSON.stringify(newData))
  }

  const handleSearchStringChange = (newString: string) => {
    //ideally this will be a backend call but for the scope of this assigment I have added this here
    const updatedData: Leads[] = [...globalData]
    setData(
      updatedData.filter((item) => {
        return (
          item.name.toLowerCase().includes(newString.toLowerCase()) ||
          item.company.toLowerCase().includes(newString.toLowerCase()) ||
          item.email.toLowerCase().includes(newString.toLowerCase())
        )
      }),
    )
  }

  const onOptionClick = (value: number, rowId: number) => {
    switch (value) {
      case 1:
        setOpenDeleteConfirmation(true)
        setRowForDelete(rowId)
        return true // DELETE
      default:
        return null
    }
  }

  const onRowClick = (rowData: Leads) => {
    setOpenCreateLead(true)
    setRowData(rowData)
  }

  const handleCreateLeadClose = () => {
    setOpenCreateLead(false)
    setRowData(null)
  }

  const handleSort = (sortBy: keyof Leads, sortOrder: 'asc' | 'desc') => {
    setSortOrder(sortOrder)
    setSortBy(sortBy)

    const updatedData = [...globalData]
    const updatedGlobalData = updatedData.sort((a, b) => {
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

    setGlobalData(updatedGlobalData)
  }

  const handleDelete = () => {
    const updatedGlobalData = [...globalData]
    const filteredData = updatedGlobalData.filter(
      (item) => item.id !== rowForDelete,
    )
    setGlobalData(filteredData)
    localStorage.setItem('leadsData', JSON.stringify([...filteredData]))
  }

  return (
    <div className="flex flex-col bg-[#faf9f5] px-20 py-10 h-screen gap-3">
      <div className="flex justify-between items-center">
        <span className=" font-semibold text-2xl text-[#28272a]">Leads</span>
        <div className="gap-x-2 flex">
          <Button
            label={'Add Lead'}
            onClick={handleAddLeads}
            icon={<PlusIcon className={'h-4 w-4 mt-[2px]'} />}
          />
          <Button
            label={'Export All'}
            onClick={handleExportAll}
            className={'bg-[#6a1be0] text-white'}
            icon={<ArrowDownCircleIcon className={'h-4 w-4 mt-[2px]'} />}
          />
        </div>
      </div>
      <div className="gap-3 flex-row flex items-center">
        <SearchBar searchString={''} onSearch={handleSearchStringChange} />
        <Button
          onClick={handleFilter}
          label={'Filter & Sort'}
          icon={<AdjustmentsHorizontalIcon className={'h-4 w-4 mt-[2px]'} />}
        />
      </div>
      <DataTable<Leads>
        data={data}
        columnConfig={columnConfig(onOptionClick, [
          { label: 'Delete', value: 1 },
        ])}
        totalRows={globalData.length}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowPerPageChange}
        rowsPerPageOptions={[10, 20, 30]}
        onRowClick={onRowClick}
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        selectedRows={selectedRows}
        selectionEnabled
        setRowSelection={setSelectedRows}
        parentClassName={'max-h-[80%]'}
      />
      {openFilter && (
        <Modal
          open={openFilter}
          setOpen={setOpenFilter}
          heading={'Filters'}
          text={<Filter />}
        />
      )}
      <CreateLead
        isOpen={openCreateLead}
        onClose={handleCreateLeadClose}
        onSave={onSave}
        initialState={rowData}
        mode={rowData ? 'UPDATE' : 'CREATE'}
      />
      {openDeleteConfirmation && (
        <Modal
          open={openDeleteConfirmation}
          setOpen={setOpenDeleteConfirmation}
          text={
            'Are you sure you want to delete this ?? This action cannot be undone.'
          }
          onConfirmation={handleDelete}
          confirmText={'Delete'}
          heading={'Confirmation'}
        />
      )}
    </div>
  )
}
