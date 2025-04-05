"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Linkedin } from "lucide-react";

const team = [
  {
    name: "Mr. Paul Akainu",
    role: "Manager",
    image:
      "https://drive.google.com/uc?export=view&id=1ntF2gDf-fXY3Oj5UKFQ-6iSmZ8dKzoAz",
    subtitle: "Manager",
  },
  {
    name: "Mrs. Akosua Dadson",
    role: "Admin",
    image:
      "https://drive.google.com/uc?export=view&id=1yzGkoNOBnI8Wtfio-fHRqDmpFPShGJpZ",
    subtitle: "Administrator",
  },

  {
    name: "Ms. Wendy MAwusi Darku",
    role: "Senior Sonographer",
    image:
      "https://drive.google.com/uc?export=view&id=19-Xp9z4MHnDQ7d1j3YRKdG8iC3QMJyh2",
    subtitle: "Senior Sonographer",
  },
  
  {
    name: "Mr. Edward Frimpong",
    role: "Senior Sonographer",
    image:
      "https://drive.google.com/uc?export=view&id=1-198TsGeVHnTbiK0lQNS2U5BY7nk3yNu",
    subtitle: "Senior Sonographer",
  },
 
  {
    name: "Ms. Esther Afosah",
    role: "Senior Sonographer",
    image:
      "https://drive.google.com/uc?export=view&id=1odYwO18qBejP3iozkmN4U8hc8UkjB_zf",
    subtitle: "Mid-Wife",
  },
  {
    name: "Ms. Mariam Sernam Kumordzie",
    role: "Secretary",
    image:
      "https://drive.google.com/uc?export=view&id=14cx5EoTxIL7j3k_OIpKacf5tS8iPT95o",
    subtitle: "Secretary",
  },
  {
    name: "Ms. Charlotte Wilma Agbonyitor",
    role: "Secretary",
    image:
      "https://drive.google.com/uc?export=view&id=1FzCbILRWhs7sItWD9JZ8K4hbkEJGbrBw",
    subtitle: "Secretary",
  },
  {
    name: "Ms. Doristar Araba Arthur",
    role: "Secretary",
    image:
      "https://drive.google.com/uc?export=view&id=1Ivq1eF8jsyVbIdRoJyC5e6r99CrJ8IUU",
    subtitle: "Secretary",
  },
  {
    name: "Ms. Abigail Akpene Etu",
    role: "Patient Care Coordinator",
    image:
      "https://drive.google.com/uc?export=view&id=1hr76muQhkABtKdCLFP_ObLjy_HvLrbzA",
    subtitle: "Maintenance",
  },
  {
    name: "Ms. Celetine Debrah",
    role: "Patient Care Coordinator",
    image:
      "https://drive.google.com/uc?export=view&id=1YhK1o6KnOUm-6Dttda5A_xNIy87zqXwq",
    subtitle: "Maintenance",
  },
];

export default function Team() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semi-bold mb-8 text-teal-600">Meet Us</h2>
          <h2 className="text-3xl font-bold mb-4 text-teal-600">
            Our Passionate Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            At Spring Health Care, our dedicated team is the cornerstone of our
            practice. We are a group of highly skilled and experienced
            healthcare professionals, all devoted to delivering exceptional care
            in a warm and welcoming environment.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mt-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="relative w-64 h-[290px] mb-8">
                <div
                  className="absolute inset-0 rounded-full bg-[#E6E6E6] z-0 top-[10%]"
                  style={{
                    background:
                      "radial-gradient(circle at center, #F5F5F5 0%, #FAFAFA 100%)",
                  }}
                />
                <div className="relative w-full h-full overflow-visible">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-b-full object-cover z-20 scale-110 -translate-y-[7%]"
                  />
                </div>
              </div>
              <h3 className="text-[#1D4451] text-xl font-semibold text-center">
                {member.name}
              </h3>
              <p className="text-gray-500 mt-1 text-center text-sm">
                {member.subtitle}
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  aria-label={`LinkedIn profile of ${member.name}`}
                >
                  <Linkedin className="w-4 h-4 text-[#2A9D8F]" />
                </a>
                <a
                  href="#"
                  className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  aria-label={`Instagram profile of ${member.name}`}
                >
                  <Instagram className="w-4 h-4 text-[#2A9D8F]" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
