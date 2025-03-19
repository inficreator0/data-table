import React, { useEffect, useState } from 'react'

type SearchBarProps = {
  searchString: string
  onSearch: (searchString: string) => void
}

export const SearchBar = ({ searchString, onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState(searchString)
  const [lastSearchString, setLastSearchString] = useState(searchString ?? '')

  const listener = (event: KeyboardEvent) => {
    if (event.code === 'Enter' && search !== lastSearchString) {
      setLastSearchString(search)
      onSearch(search)
    }
  }

  useEffect(() => {
    const searchBar = document.getElementById('search-bar')
    if (searchBar) searchBar.addEventListener('keypress', listener)

    return () => {
      searchBar?.removeEventListener('keypress', listener)
    }
  }, [search, lastSearchString])

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          id={'search-bar'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by lead’s name, email or company name"
          className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>
    </div>
  )
}
