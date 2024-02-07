import { ChangeEventHandler } from 'react'

export default function NumberInput(props: { value: number; onChange: ChangeEventHandler<HTMLInputElement> }) {
  const { value, onChange } = props
  return (
    <input
      type='number'
      id='number-input'
      aria-describedby='helper-text-explanation'
      className='border-white-300 bg-white-50 text-white-900 w-12 rounded-lg border p-1 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
      placeholder='0'
      min={0}
      required
      value={value}
      onChange={onChange}
    />
  )
}
