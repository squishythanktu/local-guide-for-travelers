import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface CustomPagingProps {
  itemsData: { id: string; imageLink: string }[]
}

function SimpleSlider(props: CustomPagingProps) {
  const { itemsData } = props

  const settings = {
    dots: true,
    speed: 500,
    centerMode: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <div className='slider-container p-3'>
      <Slider {...settings}>
        {itemsData.map((item, index) => (
          <div key={index} className=''>
            <img
              className='h-52 scale-75 rounded-md object-cover opacity-85 duration-300 hover:scale-125 hover:touch-pinch-zoom hover:opacity-100'
              src={`${item.imageLink}`}
              alt=''
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SimpleSlider
