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
      <Header />
      {children}
      <Footer />
    </div>
  )
}
