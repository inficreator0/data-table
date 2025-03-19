import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useState } from 'react'

type SearchBarProps = {
  searchString: string
  onSearch: (searchString: string) => void
}

export const SearchBar = ({ searchString, onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState(searchString)
  const [lastSearchString, setLastSearchString] = useState(searchString ?? '')

  const listener = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && search !== lastSearchString) {
      setLastSearchString(search)
      onSearch(search)
    }
  }

  useEffect(() => {
    const searchBar = document.getElementById('search-bar')
    if (searchBar) searchBar.addEventListener('keydown', listener)

    return () => {
      searchBar?.removeEventListener('keydown', listener)
    }
  }, [search, lastSearchString])

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>

        <input
          type="text"
          id={'search-bar'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by lead’s name, email or company name"
          className="w-full pl-10 pr-2 py-2 border border-[#dbdadd] rounded-lg text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>
    </div>
  )
}
