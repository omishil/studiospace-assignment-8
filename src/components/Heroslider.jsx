
"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    subtitle: "YOUR NEXT CREATIVE SPACE",
    title: "Find the Perfect Space for Your Vision.",
    description:
      "Discover inspiring studios for photography, filmmaking, podcasts, and your next big creative project.",
    image:
      "/nZKDQiLdgtol52LgwUPLLlx5JyvsSu7-iIFYSWoJvLgb1tBhMxskkoxyDXsW8MvR5XF_FjQn9hzRcjlMvPFQtJWUMhdHwhbFtzEbJ_IK96Cr9wQCWHSz-GgrkkAtmD9QWWsymcGr4gXV4121OQLAKmsWbdckVBR95ATCiDwFAyA.jpeg",
    primaryText: "Explore Studios",
    primaryLink: "/studios",
    secondaryText: "How It Works",
secondaryLink: "/#howitworks",  },
  {
    id: 2,
    subtitle: "MAKE SOMETHING AMAZING",
    title: "Turn Your Ideas Into Reality.",
    description:
      "From professional photography setups to recording rooms, find the perfect space to bring your ideas to life.",
    image: "/photography-studio-image-hd-free-photo.jpg",
    primaryText: "Discover Studios",
    primaryLink: "/studios",
    secondaryText: "How It Works",
    secondaryLink: "/#howitworks",
  },
  {
    id: 3,
    subtitle: "FOR STUDIO OWNERS",
    title: "Your Space. Their Next Big Idea.",
    description:
      "Share your creative space with a community of creators and turn your studio into an opportunity.",
    image: "/professional-studio-background_1036687-3915.avif",
    primaryText: "Post Your Space",
    primaryLink: "/add-studio",
    secondaryText: "Explore Studios",
    secondaryLink: "/#howitworks",
  },
];

export default function HeroSlider() {
  return (
    <section className="mx-auto mt-4 w-[95%] sm:mt-6 sm:w-[92%]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        className="studio-hero overflow-hidden rounded-2xl sm:rounded-3xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex min-h-[430px] items-center sm:min-h-[500px] md:min-h-[580px]">
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                sizes="(max-width: 640px) 95vw, 92vw"
                className="object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/15" />

              {/* Content */}
              <div className="relative z-10 max-w-2xl px-5 py-12 text-white sm:px-10 md:px-16">
                <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-pink-200 sm:text-sm sm:tracking-[0.2em]">
                  {slide.subtitle}
                </p>

                <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-4 max-w-lg text-sm leading-6 text-white/85 sm:mt-5 sm:text-base sm:leading-7">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                  <Link
                    href={slide.primaryLink}
                    className="rounded-lg bg-pink-700 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-pink-950/20 transition duration-300 hover:bg-pink-800 sm:px-6 sm:text-base"
                  >
                    {slide.primaryText}
                  </Link>

                  <Link
                    href={slide.secondaryLink}
                    className="rounded-lg border border-pink-200/70 bg-pink-100/15 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-pink-200/25 sm:px-6 sm:text-base"
                  >
                    {slide.secondaryText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
