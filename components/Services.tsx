"use client";

import Image from "next/image";
import { motion } from "motion/react";

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
      className="space-y-2"
    >
      <h3 className="text-[#1D4451] font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Dotted pattern background - top right */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#2A9D8F 2px, transparent 2px)",
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
                className="text-[#2A9D8F] font-medium"
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
                Spring Health Care Ltd offers exclusive 4D baby scans using advanced ultrasound technology. This unique experience allows parents to view their baby’s movements, smiles, thumb-sucking, and more in real-time, with colored video. A once-in-a-lifetime opportunity to connect with your unborn child.
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
                description="
A yearly Well Woman Screen helps you take charge of your health and prevent potential issues. It includes:

Reviewing your health history.
Clinical breast and pelvic examinations.
A gynecological scan.
Specialist advice for personalized care."
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
                description="
Cardiotocography (CTG) is a non-invasive procedure offered as part of comprehensive maternity care to ensure the safety of both mother and baby during pregnancy and labor.

CTG:

Monitors fetal heart rate patterns.
Detects signs of distress or abnormalities.
Supports timely medical interventions if necessary.
Can be performed during antenatal check-ups or labor."
              />
              <ServiceItem
                title="Antenatal Care"
                description="
Antenatal Care Services ensure the health and well-being of both mother and baby during pregnancy. Services include:

Medical history review to understand maternal health and identify potential risks.
Vital signs monitoring to track blood pressure, heart rate, and other key indicators.
Urine tests to detect protein (signs of preeclampsia) and glucose (gestational diabetes).
Physical assessments and examinations to monitor the pregnancy's progress.
Laboratory tests for detailed medical analysis.
Ultrasound scans to check fetal growth and development.
Health education to prepare for a healthy pregnancy and childbirth.
Birth plan counseling to provide guidance on delivery options and preferences."
              />
            </div>
          </div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative lg:mt-20"
          >
            <Image
              src="https://drive.google.com/uc?export=view&id=1jICmVvAoGzSVKubzrMTZ7X5p5DyUGmoT"
              alt="3D/4D Scan procedure"
              width={600}
              height={800}
              className="rounded-2xl"
            />
            {/* Dotted pattern background - bottom right */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(#2A9D8F 2px, transparent 2px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
