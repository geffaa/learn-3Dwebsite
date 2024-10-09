'use client'

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import { useGSAP } from "@gsap/react";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from "./Scene";

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  useGSAP(() => {
    // Animasi intro
    const introTl = gsap.timeline();
  
    introTl
      .set(".hero", { opacity: 1 })
      .from('.hero-header-word', {
        scale: 3,
        opacity: 0,
        ease: "power4.in",
        delay: 0.3,
        stagger: 1,
      })
      .from(".hero-subheading", {
        opacity: 0,
        y: 30,
      }, "+=.8")
      .from(".hero-body", {
        opacity: 0,
        y: 10,
      })
      .from(".hero-button", {
        opacity: 0,
        y: 10,
        duration: 0.6,
      });
  
    // Animasi scroll
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      onEnter: () => {
        gsap.to("body", {
          backgroundColor: "#D9F99D",
          duration: 1,
        });
      },
      onLeaveBack: () => {
        gsap.to("body", {
          backgroundColor: "#FDE047",
          duration: 1,
        });
      }
    });
  
    // Animasi text-side
    ScrollTrigger.create({
      trigger: ".text-side",
      start: "top 80%",
      onEnter: () => {
        gsap.from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5
        });
        gsap.from(".text-side-body", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.5
        });
      }
    });
  });

  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="opacity-0 hero"
    >
      <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
        <Scene />
      </View>
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid text-center auto-rows-min place-items-center">
            <h1 className="hero-header-word lg:text-[13rem] text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem]">
              <TextSplitter text={asText(slice.primary.heading)}
              wordDisplayStyle="block" />
            </h1>
            <div className="mt-12 text-5xl font-semibold hero-subheading text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="text-2xl font-normal hero-body text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="mt-12 hero-button"
            />
        </div>
      </div>
        <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
           className="w-full md:hidden"
           field={slice.primary.cans_image} />
          <div>
          <h2 className="text-6xl font-black uppercase text-side-heading text-balance text-sky-950 lg:text-8xl">
            <TextSplitter 
              text={asText(slice.primary.second_heading)} />
          </h2>
          <div className="max-w-xl mt-4 text-xl font-normal text-side-body text-balance text-sky-950">
          <PrismicRichText field={slice.primary.second_body} />
          </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
