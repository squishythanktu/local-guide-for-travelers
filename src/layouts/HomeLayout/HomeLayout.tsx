import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <div>
      <Header textColor='white' logoColor='white' />
      {children}
      <Footer />
    </div>
  )
}
