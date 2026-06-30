"use client";
import Hero from "@/components/home/Hero";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import FeaturedTrainers from "@/components/home/FeaturedTrainers";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import LatestForumPosts from "@/components/home/LatestForumPosts";
import { motion } from "framer-motion";
export default function HomePage() {
  return (
    <>

      
      <Hero />

<motion.section
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: true, amount: 0.5 }}
>
  <FeaturedClasses />
</motion.section>
      <LatestForumPosts />
      <FeaturedTrainers />
      <Testimonials />
      <Newsletter />
    </>
  );
}