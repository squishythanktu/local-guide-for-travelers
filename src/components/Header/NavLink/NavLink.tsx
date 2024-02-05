import { Link } from 'react-router-dom'

interface Props {
  to: string
  icon: React.ReactNode
  text: string
}

export default function NavLink({ to, icon, text }: Props) {
  return (
    <Link
      to={to}
      className={`relative ml-2 flex cursor-pointer flex-col items-center text-base 
  hover:after:w-full md:ml-4 md:after:absolute md:after:bottom-[-4px] md:after:left-0 md:after:h-[2px] 
  md:after:w-0 md:after:bg-orange-500 md:after:transition-all md:after:duration-300 xl:ml-8`}
    >
      {icon}
      <span className='hidden pt-1 md:block md:text-sm'>{text}</span>
    </Link>
  )
}
