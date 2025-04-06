import FAQ from '@/components/FAQ'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <FAQ />
      </div>
      <Footer />
    </>
  )
} 