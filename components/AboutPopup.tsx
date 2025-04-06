import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Link from 'next/link'

interface AboutPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutPopup({ isOpen, onClose }: AboutPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 bg-white z-10 p-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1D4451] pr-8">
              About Spring Health Care Ltd
            </DialogTitle>
          </DialogHeader>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="p-6 space-y-8">
          {/* Brief History Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#04c7d0] mb-3">Brief History</h3>
            <p className="text-gray-600">
              Spring Health Care Limited, formerly known as Info Health Limited, started operations in October 2009. Beginning with a focus on cervical and prostate cancer awareness and screening, the organization expanded its services to include comprehensive Obstetric & Gynaecological Services. Through consistent excellence in healthcare delivery, Spring Health Care Ltd. has grown to become a trusted provider of quality healthcare services.
            </p>
          </div>

          {/* Founder Biography Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#04c7d0] mb-3">Our Founder</h3>
            <p className="text-gray-600">
              Dr. Francis Bitasimi Bilson founded Spring Health Care Limited with a vision to operate a private diagnostic centre providing individualized care. A graduate of the University of Ghana Medical School and a Specialist Obstetrician-Gynaecologist, Dr. Bilson was known for his innovative approach to healthcare, including the MEDICS 24/7 project during the COVID-19 pandemic and the establishment of the Spring Health Care Ltd Men's clinic.
            </p>
          </div>

          {/* Read More Button */}
          <div className="flex justify-center pt-4">
            <Link href="/about">
              <Button 
                className="bg-gradient-to-r from-[#04c7d0] to-[#7e40b6] text-white hover:opacity-90 transition-opacity"
                onClick={onClose}
              >
                Read Full Story
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 