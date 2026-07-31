import React from 'react';
import { Hero } from '../components/home/Hero';
import { BrandBar } from '../components/home/BrandBar';
import { Expertise } from '../components/home/Expertise';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { IndustrySolutions } from '../components/home/IndustrySolutions';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage = () => {
  return (
    <div className="animate-fadeIn">
      <Hero />
      <BrandBar />
      <Expertise />
      <FeaturedProducts />
      <IndustrySolutions />
      <ContactSection />
    </div>
  );
};
