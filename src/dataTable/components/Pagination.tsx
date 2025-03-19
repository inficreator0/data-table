import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { cn } from '../../utils/utils'

const Page = ({
  onClick,
  page,
  className,
}: {
  page: number
  onClick: () => void
  className?: string
}) => {
  return (
    <span
      onClick={onClick}
      className={cn(
        'px-2 hover:bg-slate-200 border-0 rounded-lg cursor-pointer',
        className,
      )}
    >
      {page}
    </span>
  )
}

export const Pagination = ({
  totalPages,
  selectedPage,
  onPageSelection,
}: {
  totalPages: number
  selectedPage: number
  onPageSelection: (page: number) => void
}) => {
  const handlePageSelection = (page: number) => {
    onPageSelection(page)
  }

  return (
    <div className={'flex justify-center gap-3 items-center w-full'}>
      <ChevronLeftIcon
        className={cn(
          'h-6 w-6 cursor-pointer',
          selectedPage <= 1 && 'text-[#96949c]',
        )}
        onClick={() =>
          selectedPage > 1 && handlePageSelection(selectedPage - 1)
        }
      />
      {selectedPage > 2 && (
        <Page page={1} onClick={() => handlePageSelection(1)} />
      )}
      {selectedPage > 3 && <span>...</span>}
      {selectedPage > 1 && (
        <Page
          page={selectedPage - 1}
          onClick={() => handlePageSelection(selectedPage - 1)}
        />
      )}
      <Page
        page={selectedPage}
        onClick={() => handlePageSelection(selectedPage)}
        className={'bg-[#6a1be0] text-[#ffffff]'}
      />
      {selectedPage + 1 < totalPages && (
        <Page
          page={selectedPage + 1}
          onClick={() => handlePageSelection(selectedPage + 1)}
        />
      )}
      {totalPages - selectedPage > 2 && <span>...</span>}
      {selectedPage !== totalPages && (
        <Page
          page={totalPages}
          onClick={() => handlePageSelection(totalPages)}
        />
      )}
      <ChevronRightIcon
        className={cn(
          'h-6 w-6 cursor-pointer',
          selectedPage === totalPages && 'text-[#96949c]',
        )}
        onClick={() =>
          selectedPage < totalPages && handlePageSelection(selectedPage + 1)
        }
      />
    </div>
  )
}
