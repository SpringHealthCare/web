'use client'

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Bernice D.",
    image: "https://drive.google.com/uc?export=view&id=1UiwKkFARE5LIIJHmXIGj_GmWNR9TFlfK",
    quote: "After struggling with infertility for years, I finally found hope at this clinic. The doctors took the time to understand my unique situation and guided me through every step of the fertility treatment. Today, I’m holding my beautiful baby girl, and I can’t thank them enough for making my dream of becoming a mom come true."
  },
  {
    name: "Adom J.",
    image: "https://drive.google.com/uc?export=view&id=1jmxW4ZZGB1voFTmHxjA8sf5-NpdWzPwd",
    quote: "The team at this clinic is exceptional! From the moment I walked in, I felt supported and cared for. They helped me through every step of my journey, and I couldn’t be happier with the care I received."
  },
  {
    name: "Afia H.",
    image: "https://drive.google.com/uc?export=view&id=1DfBXg-JHZl5PpncCmO4zc_SXHhrbhwG7",
    quote: "When I was diagnosed with PCOS, I felt overwhelmed and lost. The team here not only provided exceptional medical care but also explained everything in a way that I could understand. Thanks to their guidance and treatment plan, I’ve seen incredible improvements in my health and feel more confident about starting a family in the future."
  },
  {
    name: "Victoria K.",
    image: "https://drive.google.com/uc?export=view&id=1rNt3ywJ7wq98OAh5K1knKwIesRbZhWMu",
    quote: "A wonderful clinic with an incredible team! They go above and beyond to ensure their patients are comfortable and informed. I couldn’t have asked for a better experience."
  }
]

export default function TestimonialsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="py-20 w-full bg-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#2A9D8F] font-medium">
            Testimonials
          </span>
          <h2 className="text-[#1D4451] text-4xl font-bold mt-2">
            Kind Words from Our Patients
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Discover the stories and experiences shared by our valued patients.
            Your satisfaction is our greatest achievement.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-12">
          <Carousel 
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-2 md:pl-4 basis-full transition-all duration-300 ease-in-out"
                >
                  <div className={cn(
                    "text-center p-6 transition-all duration-300",
                    current === index ? "opacity-100 scale-100" : "opacity-50 scale-95"
                  )}>
                    <div className="relative mb-8">
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#2A9D8F] text-6xl font-serif">
                      &quot;
                      </span>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover w-64 h-64 rounded-full"
                        />
                      </div>
                      <h3 className="text-[#2A9D8F] font-medium">
                        {testimonial.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current 
                    ? 'bg-[#2A9D8F]' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

