import React, { useEffect, useState } from 'react'
import { DataTable } from '../dataTable/DataTable'
import { SearchBar } from '../components/SearchBar'
import { Leads } from './interfaces'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { Button } from '../components/Button'
import { ArrowDownCircleIcon, PlusIcon } from '@heroicons/react/16/solid'
import { Modal } from '../components/Modal'
import { CreateLead } from './CreateLead'
import { columnConfig } from './columnConfig'
import { Filter } from './Filter'
import { createOrUpdateData, deleteData, getData } from '../utils/utils'

export const App = () => {
  const [data, setData] = useState<Leads[]>([])
  const [total, setTotal] = useState<number>(0)

  const [stateUpdated, setStateUpdated] = useState({ updated: false }) //used to handle create and delete data scenario
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
  const [filteredData, setFilteredData] = useState<Partial<Leads> | null>(null)

  const onPageChange = (newPage: number) => {
    const updatedData = getData({ page: newPage, rowsPerPage })
    setData(updatedData.data)
    setPage(newPage)
  }

  useEffect(() => {
    const data = getData({ page, rowsPerPage })
    setData(data.data)
    setTotal(data.total)
  }, [stateUpdated])

  const onRowPerPageChange = (newRowPerPage: number) => {
    const { data: updatedData } = getData({
      page: 1,
      rowsPerPage: newRowPerPage,
      filterData: filteredData,
    })
    setData(updatedData)
    setPage(1)
    setRowsPerPage(newRowPerPage)
  }

  const handleAddLeads = () => {
    setOpenCreateLead(true)
  }

  const handleExportAll = () => {
    //export all
  }

  const handleOpenFilter = () => {
    setOpenFilter(true)
  }

  const onSave = (formData: any, mode: 'CREATE' | 'UPDATE') => {
    setOpenCreateLead(false)
    createOrUpdateData(formData, mode)
    setStateUpdated({ updated: true })
  }

  const handleSearchStringChange = (newString: string) => {
    const { data: updatedData, total } = getData({
      page: 1,
      rowsPerPage,
      searchString: newString,
    })

    setData(updatedData)
    setTotal(total)
    setPage(1)
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

    const { data: updatedData } = getData({
      page,
      rowsPerPage,
      sortBy,
      sortOrder,
      filterData: filteredData,
    })

    setData(updatedData)
  }

  const handleDelete = () => {
    deleteData(rowForDelete)
    setStateUpdated({ updated: false })
  }

  const handleFilter = () => {
    const { data: updatedData, total } = getData({
      page: 1,
      rowsPerPage: rowsPerPage,
      filterData: filteredData,
    })
    setData(updatedData)
    setTotal(total)
    setPage(1)
  }

  const handleClearFilter = () => {
    setFilteredData(null)
    const { data: updatedData, total } = getData({
      page: 1,
      rowsPerPage: rowsPerPage,
      filterData: null,
    })
    setData(updatedData)
    setTotal(total)
    setPage(1)
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
          onClick={handleOpenFilter}
          label={'Filter & Sort'}
          className={filteredData ? 'bg-blue-500 text-white' : ''}
          icon={<AdjustmentsHorizontalIcon className={'h-4 w-4 mt-[2px]'} />}
        />
        {filteredData ? (
          <Button label={'Clear filter'} onClick={handleClearFilter} />
        ) : null}
      </div>
      <DataTable<Leads>
        data={data}
        columnConfig={columnConfig(onOptionClick, [
          { label: 'Delete', value: 1 },
        ])}
        totalRows={total}
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
          text={
            <Filter filterData={filteredData} setFilterData={setFilteredData} />
          }
          onConfirmation={handleFilter}
          confirmText={'Apply'}
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
