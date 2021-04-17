import { useGlobalContext } from '@/shared/contexts/GlobalContext'

import Header from '@/layouts/components/Header'
import Footer from '@/layouts/components/Footer'

const DefaultLayout = ({ children }) => {
  const { state: { isLoading } } = useGlobalContext()
  return (
    <div className="w-full">
      <Header />
      <main className="container flex min-h-screen px-4 py-20 mx-auto">
        {isLoading && (
          <div className="fixed top-0 left-0 z-10 w-full h-full text-center bg-gray-900 opacity-90 pt-60">
            <span className="text-4xl text-white">
              Loading...
            </span>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DefaultLayout