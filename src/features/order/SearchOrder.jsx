import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchOrder() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!query) return
    navigate(`/order/${query}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        placeholder="Search order #"
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 sm:w-64 sm:focus:w-96 
         duration-300 transition-all
         rounded-full px-4 py-2 text-sm
        bg-yellow-100 placeholder:text-stone-400
         outline-none focus:ring focus:ring-yellow-400
         focus:ring-opacity-50"
        
      />
    </form>
  )
}

export default SearchOrder
