import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header textColor='black' bgColor='white' />
      {children}
      <Footer />
    </div>
  )
}
