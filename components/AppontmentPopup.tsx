import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Phone, MessageSquare } from "lucide-react";
import { database } from "../firebaseConfig";
import { ref, push, set } from "firebase/database";

interface AppointmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_NUMBER = "0559331679";

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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const appointmentsRef = ref(database, "appointments");
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
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneCall = () => {
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      // For mobile devices, open the phone app
      window.location.href = `tel:${PHONE_NUMBER}`;
    } else {
      // For desktop, show the phone number
      setShowPhoneNumber(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Book an Appointment</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Booking Form Pane */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Appointment Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Appointment Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </Button>
            </form>
          </div>
          {/* WhatsApp and Phone Call Pane */}
          <div className="flex-1 border-t md:border-l md:border-t-0 pt-4 md:pt-0 md:pl-6">
            <h3 className="text-xl font-semibold mb-4">Book via</h3>
            <div className="space-y-4">
              <Button className="w-full flex items-center justify-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <a href="https://wa.me/233559331679">Book Via WhatsApp</a>
              </Button>
              <Button
                className="w-full flex items-center justify-center gap-2"
                onClick={handlePhoneCall}
              >
                <Phone className="h-5 w-5" />
                Book via Phone Call
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showPhoneNumber && (
        <div
          id="phone-number-display"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Call Us</h3>
            <p className="text-2xl font-bold mb-4">{PHONE_NUMBER}</p>
            <Button onClick={() => setShowPhoneNumber(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
