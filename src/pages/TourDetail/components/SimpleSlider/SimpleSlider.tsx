import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ImageWithLink } from 'src/types/tour.type'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Box } from '@mui/material'

interface Props {
  itemsData: ImageWithLink[]
}

function SimpleSlider({ itemsData }: Props) {
  return (
    <Box
      sx={{
        padding: '8px'
      }}
    >
      <ImageGallery
        items={itemsData.map((item) => {
          return {
            original: item.imageLink,
            thumbnail: item.imageLink
          }
        })}
        showBullets
        showIndex
        thumbnailPosition='right'
      />
    </Box>
  )
}

export default SimpleSlider
