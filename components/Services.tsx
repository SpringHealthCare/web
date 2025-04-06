"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, MessageSquare } from "lucide-react";
import { database } from "../firebaseConfig";
import { ref, push, set } from "firebase/database";

interface ServiceItemProps {
  title: string;
  description: string;
}

function ServiceItem({ title, description }: ServiceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="space-y-2 p-6 rounded-lg hover:bg-gradient-to-br hover:from-white hover:to-purple-50 transition-all duration-300"
    >
      <h3 className="text-[#7e40b6] font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

const additionalServices = [
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
];

export default function Services() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const PHONE_NUMBER = "0559331679";

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

      // Reset form on successful submission
      setName("");
      setPhone("");
      setSelectedDate("");
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneCall = () => {
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      window.location.href = `tel:${PHONE_NUMBER}`;
    } else {
      setShowPhoneNumber(true);
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Dotted pattern background - top right */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#7e40b6 2px, transparent 2px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-[#7e40b6] font-medium"
              >
                Services
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-[#1D4451] text-4xl font-bold"
              >
                3D/4D Scan
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-gray-600 text-lg"
              >
                Spring Health Care Ltd offers exclusive 4D baby scans using advanced ultrasound technology. This unique experience allows parents to view their baby's movements, smiles, thumb-sucking, and more in real-time, with colored video. A once-in-a-lifetime opportunity to connect with your unborn child.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <ServiceItem
                title="Obstetric Scan"
                description="An obstetric scan, or pregnancy ultrasound, is a non-invasive procedure that uses sound waves to create images of a developing fetus, the uterus, and ovaries."
              />
              <ServiceItem
                title="Fertility Scan"
                description="Designed for those trying to conceive naturally or undergoing fertility treatment, this scan tracks egg growth to maturity and measures the womb lining to assess readiness for implantation, helping to increase chances of pregnancy."
              />
              <ServiceItem
                title="Wellwoman Screen"
                description="A yearly Well Woman Screen helps you take charge of your health and prevent potential issues. It includes: Reviewing your health history, Clinical breast and pelvic examinations, A gynecological scan, and Specialist advice for personalized care."
              />
              <ServiceItem
                title="Anomaly Scan"
                description="The anomaly scan, performed between 20-24 weeks of pregnancy, is a crucial milestone. It provides a detailed assessment of the baby's head, brain, face, neck, spine, chest, heart, abdomen, kidneys, bladder, and limbs to ensure normal development and detect any deformities."
              />
              <ServiceItem
                title="Gender Identification Scan"
                description="At Spring Health Care Ltd, you can determine your baby's gender as early as 16 weeks with a 95% accuracy rate. No referral is required. The scan also includes a free well-being check of your baby."
              />
              <ServiceItem
                title="Fetal Doppler Scan"
                description="A fetal Doppler scan is a specialized ultrasound used to assess an unborn baby's health by studying blood flow between the mother and baby. It ensures the baby receives sufficient oxygen and nutrients for healthy growth."
              />
              <ServiceItem
                title="CTG Scan"
                description="Cardiotocography (CTG) is a non-invasive procedure offered as part of comprehensive maternity care to ensure the safety of both mother and baby during pregnancy and labor. CTG: Monitors fetal heart rate patterns, Detects signs of distress or abnormalities, Supports timely medical interventions if necessary, Can be performed during antenatal check-ups or labor."
              />
              <ServiceItem
                title="Antenatal Care"
                description="Antenatal Care Services ensure the health and well-being of both mother and baby during pregnancy. Services include: Medical history review, Vital signs monitoring, Urine tests, Physical assessments, Laboratory tests, Ultrasound scans, Health education, and Birth plan counseling."
              />
            </div>
          </div>

          {/* Right column - Image and Additional Services */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="https://drive.google.com/uc?export=view&id=1jICmVvAoGzSVKubzrMTZ7X5p5DyUGmoT"
                  alt="3D/4D Scan procedure"
                  width={600}
                  height={800}
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#7e40b6] to-transparent opacity-10"></div>
              </div>
              {/* Dotted pattern background - bottom right */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(#7e40b6 2px, transparent 2px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>
            </motion.div>

            {/* Additional Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              
              <div className="grid sm:grid-cols-2 gap-6">
                {additionalServices.map((service, index) => (
                  <ServiceItem
                    key={index}
                    title={service.title}
                    description={service.description}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
