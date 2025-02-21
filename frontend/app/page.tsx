'use client'
import { useState } from 'react'
import { ApiResponse, FilterOption } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bfhl-assignment-lovat.vercel.app/bfhl'

const filterOptions: FilterOption[] = [
  { label: 'Numbers', value: 'numbers' },
  { label: 'Alphabets', value: 'alphabets' },
  { label: 'Highest Alphabet', value: 'highest_alphabet' }
]

export default function Home() {
  const [jsonInput, setJsonInput] = useState('')
  const [error, setError] = useState('')
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<FilterOption['value'][]>([])
  const [isLoading, setIsLoading] = useState(false)

  const validateAndParseJSON = (input: string) => {
    try {
      const parsed = JSON.parse(input)
      if (!parsed.data || !Array.isArray(parsed.data)) {
        throw new Error('Input must contain a "data" array')
      }
      return parsed
    } catch (err) {
      throw new Error(`Invalid JSON format: ${err instanceof Error ? err.message : 'unknown error'}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const parsedInput = validateAndParseJSON(jsonInput)

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Request failed')

      setResponse(data)
      // Automatically select all filters on successful response
      setSelectedFilters(['numbers', 'alphabets', 'highest_alphabet'])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (filter: FilterOption['value']) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const renderFilteredResponse = () => {
    if (!response) return null

    return (
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold">Filtered Response:</h2>
        {selectedFilters.map(filter => {
          const value = response[filter]
          return (
            <div key={filter} className="p-2 bg-gray-50 rounded">
              <span className="font-medium">{filter.replace('_', ' ')}:</span>{' '}
              {Array.isArray(value) ? value.join(', ') || '[]' : value}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">BFHL API Interface</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">
            API Input (JSON format)
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={'{ "data": ["M","1","334","4","B"] }'}
            className="w-full h-32 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded text-white font-medium
            ${isLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {response && (
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Multi Filter</h2>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${selectedFilters.includes(option.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {renderFilteredResponse()}
        </div>
      )}
    </main>
  )
}
