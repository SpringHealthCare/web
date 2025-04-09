import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Phone, MessageSquare, Calendar, User, PhoneCall } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AppointmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_NUMBER = "+233559331679";

export function AppointmentPopup({ isOpen, onClose }: AppointmentPopupProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showPhoneNumber &&
        !(event.target as Element).closest("#phone-number-display")
      ) {
        setShowPhoneNumber(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPhoneNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const appointmentsRef = ref(db, "appointments");
      const newAppointmentRef = push(appointmentsRef);
      await set(newAppointmentRef, {
        name,
        phone,
        date: selectedDate,
        createdAt: new Date().toISOString(),
      });

      // Reset form and close popup on successful submission
      setName("");
      setPhone("");
      setSelectedDate("");
      onClose();
    } catch (error) {
      console.error("Error saving appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneCall = () => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:${PHONE_NUMBER}`;
    } else {
      setShowPhoneNumber(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 bg-gradient-to-r from-[#04c7d0] to-[#7e40b6] text-white z-10 p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold pr-8">
              Book an Appointment
            </DialogTitle>
          </DialogHeader>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-white"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Booking Form */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#04c7d0]/10 to-[#7e40b6]/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1D4451] mb-4">Appointment Details</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="pl-10 border-gray-200 focus:border-[#04c7d0] focus:ring-[#04c7d0]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <div className="relative">
                      <PhoneCall className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="pl-10 border-gray-200 focus:border-[#04c7d0] focus:ring-[#04c7d0]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-700">Preferred Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="pl-10 border-gray-200 focus:border-[#04c7d0] focus:ring-[#04c7d0]"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#04c7d0] to-[#7e40b6] text-white hover:opacity-90 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Booking..." : "Book Appointment"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Alternative Booking Methods */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#04c7d0]/10 to-[#7e40b6]/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1D4451] mb-4">Book via</h3>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:opacity-90 transition-all duration-300 shadow-lg"
                    onClick={() => window.open("https://wa.me/233559331679", "_blank")}
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Book Via WhatsApp
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-[#04c7d0] to-[#7e40b6] text-white hover:opacity-90 transition-all duration-300 shadow-lg"
                    onClick={handlePhoneCall}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Book via Phone Call
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-[#1D4451] mb-2">Working Hours</h4>
                  <p className="text-gray-600 text-sm">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 text-sm">Sat: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Phone Number Display */}
      {showPhoneNumber && (
        <div
          id="phone-number-display"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold text-[#1D4451] mb-4">Call Us</h3>
            <p className="text-2xl font-bold text-[#04c7d0] mb-4">{PHONE_NUMBER}</p>
            <div className="flex justify-end">
              <Button
                className="bg-gradient-to-r from-[#04c7d0] to-[#7e40b6] text-white hover:opacity-90"
                onClick={() => setShowPhoneNumber(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
