interface AboutActivityProps {
  activityInfomations: { icon: JSX.Element; title: string; content: string }[]
}

export default function AboutActivity(props: AboutActivityProps) {
  const { activityInfomations } = props
  return (
    <>
      <div className='text-[18px] font-semibold md:text-2xl'>About this activity</div>
      {activityInfomations.map((item, index) => (
        <div key={index}>
          <div className='detail-activity grid grid-cols-12'>
            <div className='col-span-1'>
              <span className=''>{item.icon}</span>
            </div>
            <div className='col-span-11'>
              <span className='text-[15px] font-semibold'>{item.title}</span>
              <div className='text-sm md:text-[16px]'>{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
