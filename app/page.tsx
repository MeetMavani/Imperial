'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import FloorPlans from '@/next/components/FloorPlans'
import About from '@/next/components/About'
import Amenities from '@/next/components/Amenities'
import Footer from '@/next/components/Footer'
import Hero from '@/next/components/Hero'

// ─── TYPES & CONSTANTS ───────────────────────────────────────────────────────

interface NavLink {
  label: string
  href: string
}

interface StatItem {
  end: number | null
  display: string
  unit: string
  label: string
  suffix?: string
  prefix?: string
}

interface ConnectivityCategory {
  category: string
  color: string
  items: string[]
}

interface EnquiryForm {
  name: string
  phone: string
  configuration: string
  message: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Builder', href: '#builder' },
  { label: 'Floor Plans', href: '#floor-plans' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#enquire' },
]

const HERO_STATS: StatItem[] = [
  { end: 18000, display: '18,000', unit: 'sq ft', label: 'Amenities Area' },
  { end: 15, display: '15+', unit: '', label: 'Lifestyle Amenities', suffix: '+' },
  { end: 3, display: '3', unit: '', label: 'High Speed Lifts' },
  { end: null, display: 'G+21', unit: '', label: 'Floors' },
]

const BUILDER_STATS = [
  { end: 15, suffix: '+', label: 'Years of civil contracting experience', color: '#0dafbe' },
  { end: 2, suffix: '+', label: 'Premium residential projects', color: '#fbc707' },
  { end: 100, suffix: '%', label: 'Commitment to quality and safety', color: '#f2521b' },
]

const AMENITIES = [
  'Rooftop Sky Lounge', 'Modern Gymnasium', 'Clubhouse', 'Yoga & Meditation Deck',
  'Indoor Games Zone', 'Multi-Purpose Court', 'Landscaped Garden', 'Senior Citizen Corner',
  'Kids Play Area', 'Sand Pit', 'Jogging Track', 'Walking Path',
  'CCTV Security', 'High-Speed Elevators', 'Covered Parking',
]

const CONNECTIVITY: ConnectivityCategory[] = [
  {
    category: 'Transport',
    color: '#0dafbe',
    items: ['Mulund Railway Station', 'LBS Marg', 'Eastern Express Highway', 'Proposed Metro Station', 'BEST Bus Depot', 'Panch Rasta Junction'],
  },
  {
    category: 'Education',
    color: '#fbc707',
    items: ['NES International School', 'Billabong High International School', "St. Mary's Convent High School", 'V.G. Vaze College'],
  },
  {
    category: 'Health',
    color: '#f2521b',
    items: ['Fortis Hospital Mulund', 'Jupiter Hospital Thane', 'Apex Hospitals'],
  },
  {
    category: 'Shopping',
    color: '#0dafbe',
    items: ['D-Mart', 'R Mall', 'Banks'],
  },
]

const CONFIGURATION_OPTIONS = [
  '2 BHK — 701 sq ft',
  '2 BHK — 740 sq ft',
  'Compact 3 BHK — 892 sq ft',
  '3 BHK — 993 sq ft',
  '3 BHK — 1,189 sq ft',
  'Not decided',
]

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Imperial+By+Aarambh+Group,+V.+P.+Road,+%26,+Kasturba+Rd,+Mulund+West,+Mumbai,+Maharashtra+400080&t=&z=15&ie=UTF8&iwloc=&output=embed"

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919000000000'
const WHATSAPP_MESSAGE = encodeURIComponent("Hi, I'm interested in Aarambh Imperial")

// ─── HOOKS & UTILITIES ─────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('active')
            observer.unobserve(e.target)
          }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, 100)
    return () => clearTimeout(timer)
  }, [])
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return scrolled
}

function CountUp({
  end,
  suffix = '',
  prefix = '',
  className = '',
  style,
}: {
  end: number
  suffix?: string
  prefix?: string
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const obj = { val: 0 }
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.val).toLocaleString('en-IN')}${suffix}`
          },
        })
        observer.disconnect()
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, suffix, prefix])

  return <span ref={ref} className={className} style={style}>0{suffix}</span>
}

// ─── SHARED UI ─────────────────────────────────────────────────────────────────

function Divider({ color = '#0dafbe' }: { color?: string }) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${color}40)` }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: color }} />
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${color}40)` }} />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#0dafbe]" />
      <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-[#0dafbe]">
        {children}
      </span>
    </div>
  )
}

function Heading({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={`text-[#1a1a1a] leading-tight ${className}`}
      style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400 }}
    >
      {children}
    </h2>
  )
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useNavScroll()
  const [mobileOpen, setMobileOpen] = useState(false)
  const onHero = !scrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between py-4">

          <a href="#" className="shrink-0">
            <Image src="/logo.svg" alt="Aarambh Imperial" width={120} height={48} className="h-10 w-auto object-contain" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(0, -1).map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
                style={{ color: onHero ? 'rgba(255,255,255,0.75)' : '#555555' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0dafbe' }}
                onMouseLeave={e => { e.currentTarget.style.color = onHero ? 'rgba(255,255,255,0.75)' : '#555555' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#enquire"
            className="hidden lg:inline-flex items-center px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-medium rounded-full transition-all duration-300"
            style={{
              background: '#0dafbe',
              color: '#ffffff',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0a9aaa' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0dafbe' }}
          >
            Enquire Now
          </a>

          <button
            className="lg:hidden p-2 transition-colors"
            style={{ color: onHero ? 'rgba(255,255,255,0.85)' : '#1a1a1a' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 bg-[#fdfaf5] border-t border-black/5 ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.2em] uppercase text-[#555555] hover:text-[#0dafbe] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ──────────────────────────────────────────────────────────────────────

function OldHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power2.out',
        delay: 0.2,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: window.scrollY * 0.28,
          duration: 0.4,
          overwrite: 'auto',
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-end overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image src="/building.jpeg" alt="Aarambh Imperial" fill className="object-cover object-center scale-110" priority quality={90} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.35) 45%, rgba(26,26,26,0.15) 100%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-20 pt-32 w-full">
        <div className="max-w-2xl">
          <div className="hero-animate flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#fbc707]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#fbc707] font-medium">
              Mulund West, Mumbai
            </span>
          </div>

          <h1
            className="hero-animate mb-3 leading-none tracking-tight text-white"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 500 }}
          >
            Aarambh Imperial
          </h1>

          <p className="hero-animate text-base sm:text-lg text-white/75 max-w-md leading-relaxed mb-10">
            Premium Residences. Timeless Living.
          </p>

          <div className="hero-animate flex flex-col sm:flex-row gap-4">
            <a
              href="#floor-plans"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300"
              style={{ background: '#0dafbe', color: '#ffffff' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a9aaa' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0dafbe' }}
            >
              Explore Residences
              <span>→</span>
            </a>
            <a
              href="#enquire"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-sm font-medium tracking-wide rounded-full border border-white/40 text-white/90 hover:border-white hover:text-white transition-all duration-300"
            >
              Download Brochure
            </a>
          </div>
        </div>

        <div className="hero-animate mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/15 pt-8">
          {HERO_STATS.map((stat, i) => (
            <div key={stat.label}>
              <div
                className="text-3xl sm:text-4xl font-light mb-1 text-white"
                style={{ fontFamily: 'var(--font-cormorant)', color: i % 2 === 0 ? '#0dafbe' : '#fbc707' }}
              >
                {stat.end !== null ? (
                  <CountUp end={stat.end} suffix={stat.suffix ?? ''} prefix={stat.prefix ?? ''} />
                ) : (
                  stat.display
                )}
                {stat.unit && <span className="text-lg ml-1 text-white/40">{stat.unit}</span>}
              </div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-animate absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <div className="w-px h-10 bg-white/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
        </div>
        <span className="text-white text-lg">↓</span>
      </div>
    </section>
  )
}

// ─── OVERVIEW ──────────────────────────────────────────────────────────────────

function Overview() {
  return (
    <section id="overview" className="py-24 sm:py-32 bg-[#fdfaf5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal-left">
            <SectionLabel>The Project</SectionLabel>
            <Heading className="mb-6">
              Where every detail
              <br />
              <span style={{ fontStyle: 'italic', color: '#0dafbe' }}>tells a story</span>
            </Heading>
            <Divider />
            <p className="text-[#555555] leading-relaxed mb-6 text-[15px]">
              Aarambh Imperial is not just another address in Mulund West — it is a considered statement about how life should feel. From the double-height entrance lobby to the rooftop sky lounge, every space has been designed to elevate the everyday.
            </p>
            <p className="text-[#555555] leading-relaxed text-[15px]">
              Three high-speed lifts including a dedicated stretcher lift. 18,000 square feet of curated amenities. 15+ lifestyle experiences. All of this, in one of Mumbai&apos;s most connected neighbourhoods.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {[
                { label: 'Double-height entrance lobby', sub: '5-star lounge experience' },
                { label: '3 high-speed lifts', sub: 'Including 1 dedicated stretcher lift' },
                { label: '18,000 sq ft amenities', sub: 'Gym, clubhouse, sky lounge & more' },
              ].map((item, i) => (
                <div key={item.label} className="flex items-start gap-4 p-4 rounded-lg bg-white border border-black/5 shadow-sm card-hover">
                  <div className="w-1 min-h-8 shrink-0 mt-0.5" style={{ background: i === 0 ? '#0dafbe' : i === 1 ? '#fbc707' : '#f2521b' }} />
                  <div>
                    <div className="text-[#1a1a1a] text-sm font-medium">{item.label}</div>
                    <div className="text-[#555555] text-xs mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-right relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg card-hover">
              <Image src="/building.jpeg" alt="Aarambh Imperial Building" fill className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-lg bg-white/95 backdrop-blur-sm border border-black/5 shadow-md">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#0dafbe] mb-2">Location</div>
                <div className="text-[#1a1a1a] font-medium text-sm">V.P. Road & Kasturba Road</div>
                <div className="text-[#555555] text-xs mt-0.5">Mulund West, Mumbai — 400080</div>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#fbc707]/30 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── BUILDER ───────────────────────────────────────────────────────────────────

function Builder() {
  return (
    <section id="builder" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold leading-none select-none pointer-events-none whitespace-nowrap text-[#0dafbe]/[0.03]"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        Aarambh
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <SectionLabel>About the Builder</SectionLabel>
          <Heading>
            Built on decades of
            <span style={{ fontStyle: 'italic', color: '#fbc707' }}> trust</span>
          </Heading>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 reveal-left">
            <p className="text-[#555555] leading-relaxed text-[15px] mb-6">
              Aarambh Realty delivers world-class engineering and construction services — pioneers in the Indian infrastructure industry. Continuing a legacy of innovation, the group achieves new milestones with every endeavour. Aarambh is responsible for landmark projects that have defined the progress of communities.
            </p>
            <p className="text-[#555555] leading-relaxed text-[15px] mb-6">
              With a strong commitment to the safety of every person who interacts with their work, extreme precaution goes into every piece of infrastructure they build. The progress of their people powers the progress of the company — every accomplishment becomes a foundation to dream bigger.
            </p>
            <Divider color="#fbc707" />
            <div className="grid sm:grid-cols-2 gap-8 mt-8 p-6 rounded-xl bg-[#fdfaf5] border border-black/5">
              <div>
                <div className="text-sm font-medium mb-3 pb-3 text-[#0dafbe] border-b border-[#0dafbe]/20">Our Mission</div>
                <p className="text-[#555555] text-[13px] leading-relaxed">
                  To consistently deliver exceptional quality that exceeds client expectations on every project — going the extra mile without exception.
                </p>
              </div>
              <div>
                <div className="text-sm font-medium mb-3 pb-3 text-[#fbc707] border-b border-[#fbc707]/20">Our Vision</div>
                <p className="text-[#555555] text-[13px] leading-relaxed">
                  To deliver every project to the highest standards of health and safety — differentiating through superior management, integrity, and innovation.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-right flex flex-col gap-6">
            {BUILDER_STATS.map((item) => (
              <div key={item.label} className="p-6 rounded-lg bg-[#fdfaf5] border border-black/5 shadow-sm card-hover">
                <div className="text-4xl font-light mb-2" style={{ fontFamily: 'var(--font-cormorant)', color: item.color }}>
                  <CountUp end={item.end} suffix={item.suffix} />
                </div>
                <div className="text-[#555555] text-xs leading-relaxed">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── AMENITIES ─────────────────────────────────────────────────────────────────

function OldAmenities() {
  return (
    <section id="amenities" className="py-24 sm:py-32 bg-[#fdfaf5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal-left">
            <SectionLabel>Amenities</SectionLabel>
            <Heading className="mb-6">
              18,000 sq ft of
              <br />
              <span style={{ fontStyle: 'italic', color: '#fbc707' }}>curated living</span>
            </Heading>
            <p className="text-[#555555] text-[15px] leading-relaxed mb-10">
              More than just facilities — these are spaces where life happens. From the early morning yoga deck to the rooftop sky lounge at sunset, every amenity at Aarambh Imperial has been thoughtfully placed to enrich your days.
            </p>
            <div className="text-[7rem] font-light leading-none text-[#fbc707]/15" style={{ fontFamily: 'var(--font-cormorant)' }}>
              15+
            </div>
            <div className="text-[#555555] text-xs tracking-[0.3em] uppercase -mt-4">Lifestyle Amenities</div>
          </div>

          <div className="reveal-right grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AMENITIES.map((amenity, i) => (
              <div
                key={amenity}
                className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-black/5 shadow-sm card-hover"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: i % 3 === 0 ? '#0dafbe' : i % 3 === 1 ? '#fbc707' : '#f2521b' }}
                />
                <span className="text-[#555555] text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── LOCATION ──────────────────────────────────────────────────────────────────

function Location() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="location" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12 reveal text-center max-w-2xl mx-auto">
          <SectionLabel>Location & Connectivity</SectionLabel>
          <Heading>
            Perfectly
            <span style={{ fontStyle: 'italic', color: '#0dafbe' }}> Connected</span>
          </Heading>
          <p className="text-[#555555] text-[15px] mt-4">
            V.P. Road & Kasturba Rd, Mulund West, Mumbai 400080
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start reveal">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] rounded-xl overflow-hidden border border-black/5 shadow-md card-hover">
            <iframe
              src={MAP_EMBED_URL}
              title="Aarambh Imperial Location"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {CONNECTIVITY.map((cat, i) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveTab(i)}
                  className="px-4 py-2 text-[11px] tracking-[0.12em] uppercase rounded-full transition-all duration-300"
                  style={{
                    background: activeTab === i ? cat.color : 'transparent',
                    color: activeTab === i ? '#1a1a1a' : '#555555',
                    border: `1px solid ${activeTab === i ? cat.color : 'rgba(26,26,26,0.12)'}`,
                  }}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-black/5 bg-[#fdfaf5] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full" style={{ background: CONNECTIVITY[activeTab].color }} />
                <h3 className="text-lg text-[#1a1a1a]" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  {CONNECTIVITY[activeTab].category}
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {CONNECTIVITY[activeTab].items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white border border-black/5 text-sm text-[#555555] card-hover"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: CONNECTIVITY[activeTab].color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ENQUIRY ───────────────────────────────────────────────────────────────────

function Enquire() {
  const [form, setForm] = useState<EnquiryForm>({ name: '', phone: '', configuration: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORM_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', configuration: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'input-brand w-full px-4 py-3.5 text-sm text-[#1a1a1a] bg-white border border-black/10 rounded-lg transition-colors duration-200'

  return (
    <section id="enquire" className="py-24 sm:py-32 enquiry-pattern relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-[560px] mx-auto reveal text-center">
          <SectionLabel>Register Interest</SectionLabel>
          <Heading className="mb-4">
            Begin Your Journey
            <span style={{ fontStyle: 'italic', color: '#0dafbe' }}> Home</span>
          </Heading>
          <p className="text-[#555555] text-[15px] mb-10">
            Our team will reach out within 24 hours
          </p>

          {status === 'success' ? (
            <div className="p-10 rounded-xl bg-white border border-[#0dafbe]/20 shadow-md text-center">
              <div className="text-4xl mb-4 text-[#0dafbe]">✓</div>
              <h3 className="text-[#1a1a1a] text-xl mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Thank you!
              </h3>
              <p className="text-[#555555] text-sm">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#555555] mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#555555] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#555555] mb-2">Configuration Interested In *</label>
                <select
                  required
                  value={form.configuration}
                  onChange={e => setForm(p => ({ ...p, configuration: e.target.value }))}
                  className={fieldClass}
                >
                  <option value="">Select a configuration</option>
                  {CONFIGURATION_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#555555] mb-2">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Any questions or preferred visit time (optional)"
                  className={`${fieldClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 text-sm font-medium tracking-wide rounded-full transition-all duration-300 mt-2 disabled:opacity-60"
                style={{ background: '#0dafbe', color: '#ffffff' }}
                onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.background = '#0a9aaa' }}
                onMouseLeave={e => { if (status !== 'loading') e.currentTarget.style.background = '#0dafbe' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER & WHATSAPP ─────────────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full animate-whatsapp transition-transform duration-300 hover:scale-105"
      style={{ background: '#0dafbe', color: '#ffffff', boxShadow: '0 4px 20px rgba(13,175,190,0.35)' }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

function OldFooter() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="flex justify-center mb-10">
          <Image src="/logo.svg" alt="Aarambh Imperial" width={120} height={48} className="h-10 w-auto object-contain" />
        </div>

        <div className="grid sm:grid-cols-3 gap-10 mb-10 text-center sm:text-left">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#0dafbe] mb-4">About</div>
            <p className="text-white/50 text-xs leading-relaxed max-w-xs mx-auto sm:mx-0">
              Premium residences in Mulund West, Mumbai. 2 BHK & 3 BHK homes crafted for elevated living.
            </p>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#0dafbe] mb-4">Quick Links</div>
            <div className="flex flex-col gap-2 items-center sm:items-start">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href} className="text-white/40 hover:text-white/80 text-xs transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#0dafbe] mb-4">Contact</div>
            <div className="flex flex-col gap-2 text-white/40 text-xs items-center sm:items-start">
              <span>+91 XXXXX XXXXX</span>
              <span>info@arambhimperial.com</span>
              <span className="mt-1">V.P. Road & Kasturba Rd, Mulund West, Mumbai 400080</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white/30 border-t border-white/10">
          <span>© 2026 Aarambh Imperial. All rights reserved.</span>
          <span>RERA Reg. No. : Applied / Pending</span>
          <span>Developed by Nirmaan</span>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function Home() {
  useScrollReveal()

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <FloorPlans />
      <Amenities />
      <Location />
      <Enquire />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
