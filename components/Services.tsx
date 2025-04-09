"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Syringe } from 'lucide-react'

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

const Services = () => {
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
                className="text-[#7e40b6] font-medium text-2xl"
              >
                Services
              </motion.span>

             
            </div>

            {/* Stats Section */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-[#04c7d0]/10 p-3 rounded-lg">
                  <Trophy className="w-6 h-6 text-[#04c7d0]" />
                </div>
                <div>
                  <h3 className="text-[#1D4451] font-semibold text-xl mb-2">
                    Years of Excellence
                  </h3>
                  <p className="text-gray-600">
                    At SHC, we are passionate about providing exceptional care in a 
                    warm and welcoming environment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-[#04c7d0]/10 p-3 rounded-lg">
                  <Syringe className="w-6 h-6 text-[#04c7d0]" />
                </div>
                <div>
                  <h3 className="text-[#1D4451] font-semibold text-xl mb-2">
                    100% Satisfied Patients
                  </h3>
                  <p className="text-gray-600">
                    Over 10,000 satisfied patients have entrusted their Fertility care, 
                    Obstetrics, Antenatal, 4D scans and Gynaecological care to Spring 
                    Health Care Ltd.
                  </p>
                </div>
              </div>
            </div>
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

            <div className="grid md:grid-cols-2 gap-8">
              <ServiceItem
                title="Obstetrics"
                description="Comprehensive care during pregnancy, including regular check-ups, ultrasound scans, and delivery services."
              />
              <ServiceItem
                title="Gynecology"
                description="Specialized care for women's health, including routine check-ups, family planning, and treatment of gynecological conditions."
              />
              <ServiceItem
                title="Fertility Treatment"
                description="Advanced fertility services including consultation, diagnosis, and treatment options for couples trying to conceive."
              />
              <ServiceItem
                title="Ultrasound Scans"
                description="State-of-the-art 3D/4D ultrasound technology for detailed imaging and monitoring during pregnancy."
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

export default Services;



