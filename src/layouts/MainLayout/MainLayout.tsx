import { Box } from '@mui/material'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
// import theme from 'src/theme'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Box>
        <Header bgColor={(theme) => theme.palette.divider} textColor={(theme) => theme.palette.primary.main} />
      </Box>

      {children}
      <Footer />
    </div>
  )
}
