import React from 'react'

interface MainLayoutProps {
  children?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }: MainLayoutProps) => {
  return (
    <div>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
