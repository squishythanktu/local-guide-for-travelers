import React from 'react'
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

  const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files: File[] = []

    for (const file of e.target.files) {
      files.push(file)
    }

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
            xs={4}
            sm={4}
            md={4}
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
              style={{
                position: 'absolute',
                top: 10,
                right: 0,
                color: '#aaa'
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
                objectFit: 'contain',
                aspectRatio: '1 / 1'
              }}
              alt=''
            />
          </Grid>
        ))}
      </Grid>
      <label htmlFor={inputId}>
        <Button
          variant='contained'
          disabled={props.images.length >= maxImagesUpload}
          component='span'
          sx={{ mt: 4 }}
          startIcon={<CloudUploadIcon />}
        >
          Upload Images
        </Button>
        <input
          id={inputId}
          type='file'
          multiple
          accept='image/*,.png,.jpg,.jpeg,.gif'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)}
          style={{ display: 'none' }}
        />
      </label>
    </>
  )
}

export default ImagesUploader
