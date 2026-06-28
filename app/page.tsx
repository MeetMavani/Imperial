'use client'

import { useCallback, useEffect, useState } from 'react'
import FloorPlans from '@/next/components/FloorPlans'
import About from '@/next/components/About'
import Amenities from '@/next/components/Amenities'
import Footer from '@/next/components/Footer'
import Hero from '@/next/components/Hero'
import SiteLoader from '@/next/components/SiteLoader'
import Navbar from '@/next/components/Navbar'
import Location from '@/next/components/Location'
import Enquiry from '@/next/components/Enquiry'
import WhatsAppFloat from '@/next/components/WhatsAppFloat'

// ─── SITE LOADER TOGGLE ──────────────────────────────────────────────────────
// Set to `true` to show the cinematic intro video on page load.
// Set to `false` to skip it entirely.
const ENABLE_SITE_LOADER = false

// ─── TYPES & CONSTANTS ───────────────────────────────────────────────────────





// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [siteReady, setSiteReady] = useState(!ENABLE_SITE_LOADER)

  const onLoaderFinish = useCallback(() => {
    setSiteReady(true)
  }, [])

  return (
    <>
      <SiteLoader enabled={ENABLE_SITE_LOADER} onFinish={onLoaderFinish} />

      <main>
        <Navbar />
        <Hero loaded={siteReady} />
        <About />
        <FloorPlans />
        <Amenities />
        <Location />
        <Enquiry />
        <Footer />
        <WhatsAppFloat />
      </main>
    </>
  )
}
