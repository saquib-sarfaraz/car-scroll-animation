import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroCar from '../assets/car.png'
import '../styles/hero.css'

gsap.registerPlugin(ScrollTrigger)

const startFromEnd = false
const HEADLINE_TEXT = 'WELCOME ITZFIZZ'
const STAT_CARDS = [
  {
    id: 'box1',
    value: '58%',
    text: 'Increase in pick up point use',
    style: { top: '5%', right: '30%' },
    scroll: { start: 400, end: 600 },
  },
  {
    id: 'box2',
    value: '23%',
    text: 'Decreased in customer phone calls',
    style: { bottom: '5%', right: '35%' },
    scroll: { start: 600, end: 800 },
  },
  {
    id: 'box3',
    value: '27%',
    text: 'Increase in pick up point use',
    style: { top: '5%', right: '10%' },
    scroll: { start: 800, end: 1000 },
  },
  {
    id: 'box4',
    value: '40%',
    text: 'Decreased in customer phone calls',
    style: { bottom: '5%', right: '12.5%' },
    scroll: { start: 1000, end: 1200 },
  },
]

const HeroSection = () => {
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  const roadRef = useRef(null)
  const carRef = useRef(null)
  const trailRef = useRef(null)
  const valueRef = useRef(null)
  const lettersRef = useRef([])
  const letterOffsetsRef = useRef([])
  const metricsRef = useRef({
    carWidth: 0,
    roadWidth: 0,
    startX: 0,
    endX: 0,
  })

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      return
    }

    const car = carRef.current
    const trail = trailRef.current
    const road = roadRef.current
    const value = valueRef.current

    lettersRef.current = value
      ? Array.from(value.querySelectorAll('.value-letter'))
      : []

    const computeMetrics = () => {
      if (!car || !road) return
      const roadRect = road.getBoundingClientRect()
      metricsRef.current.carWidth = car.getBoundingClientRect().width
      metricsRef.current.roadWidth = roadRect.width
      metricsRef.current.startX = startFromEnd
        ? metricsRef.current.roadWidth - metricsRef.current.carWidth
        : 0
      metricsRef.current.endX = startFromEnd
        ? 0
        : metricsRef.current.roadWidth - metricsRef.current.carWidth
      letterOffsetsRef.current = lettersRef.current.map((letter) => {
        const rect = letter.getBoundingClientRect()
        return rect.left - roadRect.left
      })
      gsap.set(car, { x: metricsRef.current.startX })
      if (trail) {
        trail.style.left = startFromEnd ? 'auto' : '0'
        trail.style.right = startFromEnd ? '0' : 'auto'
        const initialCarX =
          metricsRef.current.startX + metricsRef.current.carWidth / 2
        const trailWidth = startFromEnd
          ? metricsRef.current.roadWidth - initialCarX
          : initialCarX
        gsap.set(trail, { width: Math.max(0, trailWidth) })
      }
    }

    if (car && !car.complete) {
      car.addEventListener('load', computeMetrics, { once: true })
    }
    computeMetrics()
    window.addEventListener('resize', computeMetrics)

    const ctx = gsap.context(() => {
      const letters = lettersRef.current

      gsap.set(letters, { opacity: 0 })

      const createStatReveal = (id, start, end) => {
        gsap.fromTo(
          `#${id}`,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${start} top`,
              end: `top+=${end} top`,
              scrub: true,
            },
          }
        )
      }

      gsap.to(car, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: trackRef.current,
          invalidateOnRefresh: true,
        },
        x: () => metricsRef.current.endX,
        ease: 'none',
        onUpdate: () => {
          const carX =
            gsap.getProperty(car, 'x') + metricsRef.current.carWidth / 2
          const fadeSpan = 48

          letters.forEach((letter, index) => {
            const letterX = letterOffsetsRef.current[index] ?? 0
            const opacity = gsap.utils.clamp(
              0,
              1,
              (carX - letterX) / fadeSpan
            )
            letter.style.opacity = opacity
          })
          const trailWidth = startFromEnd
            ? metricsRef.current.roadWidth - carX
            : carX
          gsap.set(trail, { width: Math.max(0, trailWidth) })
        },
      })

      STAT_CARDS.forEach((card) =>
        createStatReveal(card.id, card.scroll.start, card.scroll.end)
      )
    }, sectionRef)

    ScrollTrigger.addEventListener('refresh', computeMetrics)
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('resize', computeMetrics)
      ScrollTrigger.removeEventListener('refresh', computeMetrics)
      ctx.revert()
    }
  }, [])

  return (
    <div className="section" ref={sectionRef}>
      <div className="track" ref={trackRef}>
        <div className="road" id="road" ref={roadRef}>
          <img src={heroCar} alt="car" className="car" id="car" ref={carRef} />
          <div className="trail" id="trail" ref={trailRef} />
          <div className="value-add" id="valueText" ref={valueRef}>
            {Array.from(HEADLINE_TEXT).map((char, index) => (
              <span key={`${char}-${index}`} className="value-letter">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
        {STAT_CARDS.map((card) => (
          <div
            key={card.id}
            className="text-box"
            id={card.id}
            style={card.style}
          >
            <span className="num-box">{card.value}</span> {card.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeroSection
