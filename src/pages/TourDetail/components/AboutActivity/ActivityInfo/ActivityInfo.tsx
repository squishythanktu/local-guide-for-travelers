interface ActivityInfoProps {
  icon: JSX.Element
  title: string
  content: string
}

export default function ActivityInfo({ icon, title, content }: ActivityInfoProps) {
  return (
    <div>
      <div className='detail-activity grid grid-cols-12'>
        <div className='col-span-1'>
          <span className=''>{icon}</span>
        </div>
        <div className='col-span-11'>
          <span className='text-[15px] font-semibold'>{title}</span>
          <div className='text-sm md:text-[16px]'>{content}</div>
        </div>
      </div>
    </div>
  )
}
