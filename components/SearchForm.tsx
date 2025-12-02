"use client"
import React from 'react'
import { Search } from 'lucide-react'
import SearchFormReset from './SearchFormReset'

const SearchForm = ({ query }: { query?: string }) => {
  console.log("SearchForm query:", query);
  return (
    <form
      action="/"
      method="GET"
      className="search-form relative"
    >
      <input
        type="text"
        name="query"
        defaultValue={query || ""}
        className="search-input flex-1 border-none outline-none bg-transparent px-2 py-2 text-gray-800 placeholder-gray-400"
        placeholder="Search Projects"
      />

      <div className="flex items-center gap-2">
        {query && <SearchFormReset />}

        <button
          type="submit"
          className="search-btn text-white bg-black rounded-full p-2 flex items-center justify-center"
        >
          <Search className="size-5" />
        </button>
      </div>
    </form>
  )
}

export default SearchForm
