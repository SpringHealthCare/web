import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface AboutPopupProps {
  isOpen: boolean
  onClose: () => void
}

const services = [
  {
    title: "Executive Men's Clinic",
    description: "Focused on addressing health concerns for modern men in Ghana. Includes thorough health assessments, chronic disease management, men's sexual health, and urological consultations. Appointment-based system ensures prompt and efficient service."
  },
  {
    title: "Women's Wellness Services",
    description: "General outpatient care for women and specialist gynecologic and obstetric consultations. Services include fertility support, antenatal care, cervical and breast cancer screening, and management of gynecologic conditions."
  },
  {
    title: "Couples' Antenatal Class",
    description: "Designed for expectant or planning couples to prepare for pregnancy and newborn care. Offers bonding opportunities and education on pregnancy changes, danger signs, and newborn care."
  },
  {
    title: "Cardiotocography (CTG)",
    description: "Monitors the relationship between the unborn baby's heart rate and uterine contractions during pregnancy and labor. Ensures maternal and fetal well-being."
  }
]

export function AboutPopup({ isOpen, onClose }: AboutPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 bg-white z-10 p-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#1D4451] pr-8">
              Summary of Services Offered by Spring Health Care Ltd
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
        <div className="p-6">
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#2A9D8F] mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

