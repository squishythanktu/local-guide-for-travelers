import ItemCard from './ItemCard'

export default function CartItems() {
  return (
    <div className='flex flex-col gap-6'>
      <ItemCard />
      <ItemCard />
    </div>
  )
}
