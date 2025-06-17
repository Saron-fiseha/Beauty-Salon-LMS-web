"use client"

import { HeroSection } from "@/components/hero-section"
import { FeaturedCourses } from "@/components/featured-courses"
import { Testimonials } from "@/components/testimonials"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCourses />
        <StatsSection />
        <Testimonials />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}
