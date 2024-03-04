import { ChangeEvent } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { Grid } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

type ImagesUploaderProps = {
  images: string[]
  setImages: (arg: string[]) => void
}

const ImagesUploader = (props: ImagesUploaderProps) => {
  const maxImagesUpload = 10
  const inputId = Math.random().toString(32).substring(2)

  const handleOnAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files).slice(0, maxImagesUpload - props.images.length)
    const base64Array = await Promise.all(files.map((file) => convertToBase64(file)))

    props.setImages([...props.images, ...base64Array])
    e.target.value = ''
  }

  const handleOnRemoveImage = (index: number) => {
    const newImages = [...props.images]
    newImages.splice(index, 1)
    props.setImages(newImages)
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 12 }}>
        {props.images.map((image, i) => (
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            key={i}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <IconButton
              aria-label='delete image'
              sx={{
                position: 'absolute',
                top: 20,
                right: -5
              }}
              onClick={() => handleOnRemoveImage(i)}
            >
              <CancelIcon />
            </IconButton>
            <img
              src={image}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                aspectRatio: '1 / 1'
              }}
              alt=''
            />
          </Grid>
        ))}
      </Grid>
      <label htmlFor={inputId} className='flex items-center gap-3'>
        <Button
          variant='contained'
          disabled={props.images.length >= maxImagesUpload}
          component='span'
          startIcon={<CloudUploadIcon />}
        >
          Upload Images
        </Button>
        <span className='text-sm'>Up to 10 images</span>
        <input
          id={inputId}
          type='file'
          multiple
          accept='image/*,.png,.jpg,.jpeg,.gif'
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)}
          style={{ display: 'none' }}
        />
      </label>
    </>
  )
}

export default ImagesUploader
