// Homepage Showcase V5 — Framer Code Component
// Premium scroll gallery — alternating sections with scroll-reveal animations
// Paste into: Assets > Code > + New Component

import { addPropertyControls, ControlType } from "framer"
import { useState, useEffect, useRef, useContext, createContext } from "react"

const A = "#51ed97"
const F = "'Rethink Sans', sans-serif"

// Theme (dark only)

type Theme = {
    bg: string
    card: string
    card2: string
    card3: string
    border: string
    text: string
    sub: string
    divider: string
    stroke: string
    pillBg: string
    headerBg: string
    mutedText: string
    shadow: string
    checkStroke: string
    separator: string
}

const T: Theme = {
    bg: "#08090a",
    card: "#111",
    card2: "#161616",
    card3: "#1c1c1c",
    border: "#222",
    text: "#fff",
    sub: "#888",
    divider: "rgba(255,255,255,0.07)",
    stroke: "rgba(255,255,255,0.22)",
    pillBg: "rgba(255,255,255,0.07)",
    headerBg: "#0f1011",
    mutedText: "rgba(255,255,255,0.35)",
    shadow: "rgba(0,0,0,0.35)",
    checkStroke: "#08090a",
    separator: "rgba(255,255,255,0.06)",
}

const ThemeCtx = createContext<Theme>(T)

// Section tags

const SECTION_TAGS = [
    "DRIVE REPEAT PURCHASES",
    "INCREASE LIFETIME VALUE",
    "ORGANIC GROWTH",
    "BOOST ENGAGEMENT",
    "RECURRING REVENUE",
    "UNIFIED EXPERIENCE",
]

// SVG Icons

const IC = {
    user: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-4 3.5-7 7-7s7 3 7 7"/></svg>`,
    instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>`,
    pencil: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg>`,
    gift: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13"/><path d="M3 13h18"/><path d="M8 8a3 3 0 013-3c1 0 1 3 1 3"/><path d="M16 8a3 3 0 00-3-3c-1 0-1 3-1 3"/></svg>`,
    trophy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9H3V6a1 1 0 011-1h2"/><path d="M18 9h3V6a1 1 0 00-1-1h-2"/><path d="M6 5h12v7a6 6 0 01-12 0V5z"/><path d="M12 18v3"/><path d="M8 21h8"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${A}" stroke-width="2.5"><path d="M5 12l5 5L20 7"/></svg>`,
    copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V4a2 2 0 012-2h12"/></svg>`,
    arrow: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>`,
    wallet: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="20" height="15" rx="2"/><path d="M16 12h2"/><path d="M2 10h20"/></svg>`,
    store: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l1-4h16l1 4"/><path d="M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9"/><path d="M9 21V13h6v8"/><path d="M3 9c0 1.1.9 2 2 2s2-.9 2-2"/><path d="M7 9c0 1.1.9 2 2 2s2-.9 2-2"/><path d="M11 9c0 1.1.9 2 2 2s2-.9 2-2"/><path d="M15 9c0 1.1.9 2 2 2s2-.9 2-2"/></svg>`,
    globe: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10 15 15 0 014-10z"/></svg>`,
    phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 18h.01"/></svg>`,
}

// CSS

const css = `
.hs5-wrap{width:100%;position:relative;background:${T.bg};font-family:${F}}

/* Hero */
.hs5-hero{display:flex;flex-direction:column;align-items:center;text-align:center;padding:80px 24px 0}
.hs5-label{font-size:12px;font-weight:600;color:${A};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:28px;opacity:0.85}
.hs5-heading{font-size:48px;font-weight:700;color:${T.text};letter-spacing:-0.035em;line-height:1.1;margin:0;max-width:700px}
.hs5-subtitle{font-size:18px;font-weight:400;color:${T.sub};line-height:1.65;margin:20px 0 0;max-width:480px}

/* Hero entrance */
@keyframes hs5-heroIn{0%{opacity:0;transform:translateY(28px);filter:blur(5px)}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
.hs5-hero-anim{opacity:0}
.hs5-wrap.hs5-visible .hs5-hero-anim{animation:hs5-heroIn 0.8s cubic-bezier(0.16,1,0.3,1) both}

/* Sections */
.hs5-sections{padding-top:40px}
.hs5-section{display:flex;align-items:center;gap:64px;max-width:1120px;margin:0 auto;padding:72px 24px;box-sizing:border-box}
.hs5-section.reverse{flex-direction:row-reverse}
.hs5-separator{height:1px;max-width:1072px;margin:0 auto;background:linear-gradient(90deg,transparent 0%,${T.separator} 15%,${T.separator} 85%,transparent 100%)}

/* Text side */
.hs5-text{flex:1;min-width:0}
.hs5-tag{font-family:${F};font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${T.sub};margin-bottom:20px}
.hs5-title{font-family:${F};font-size:var(--hs5-title-size,40px);font-weight:600;color:${T.text};letter-spacing:-0.03em;line-height:1.15;margin:0 0 16px}
.hs5-desc{font-family:${F};font-size:var(--hs5-desc-size,16px);font-weight:400;color:${T.sub};line-height:1.7;margin:0 0 28px;max-width:380px}

/* Link — muted by default, white + underline on hover */
.hs5-link{display:inline-flex;align-items:center;gap:8px;font-family:${F};font-size:14px;font-weight:600;color:rgba(255,255,255,0.55);cursor:pointer;position:relative;padding-bottom:4px;letter-spacing:0.02em;text-decoration:none;border:none;background:none;white-space:nowrap;transition:color 0.3s ease}
.hs5-link:hover{color:${T.text}}
.hs5-link-line{position:absolute;bottom:0;left:0;height:1.5px;width:0;background:${T.text};border-radius:1px;transition:width 0.4s cubic-bezier(0.25,1,0.35,1)}
.hs5-link:hover .hs5-link-line{width:100%}

/* Creative side */
.hs5-visual{flex:1;display:flex;align-items:center;justify-content:center;min-width:0;position:relative}
.hs5-card{background:${T.card};border:1px solid ${T.border};border-radius:var(--hs5-r,12px);width:100%;max-width:440px;overflow:hidden;box-shadow:0 4px 24px ${T.shadow};position:relative;transition:box-shadow 0.4s ease}
.hs5-card:hover{box-shadow:0 8px 40px ${T.shadow}}

/* Scroll reveal — staggered text + visual entrance */
.hs5-section .hs5-tag,
.hs5-section .hs5-title,
.hs5-section .hs5-desc,
.hs5-section .hs5-link{opacity:0;transform:translateY(20px);transition:opacity 0.6s cubic-bezier(0.16,1,0.3,1),transform 0.6s cubic-bezier(0.16,1,0.3,1)}
.hs5-section .hs5-visual{opacity:0;transform:translateY(24px) scale(0.98);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)}
.hs5-section.visible .hs5-tag{opacity:1;transform:none;transition-delay:0s}
.hs5-section.visible .hs5-title{opacity:1;transform:none;transition-delay:0.07s}
.hs5-section.visible .hs5-desc{opacity:1;transform:none;transition-delay:0.14s}
.hs5-section.visible .hs5-link{opacity:1;transform:none;transition-delay:0.2s}
.hs5-section.visible .hs5-visual{opacity:1;transform:none;transition-delay:0.12s}

/* Looping micro-animations */
@keyframes hs5-glow{0%,100%{box-shadow:0 0 8px rgba(81,237,151,0.06)}50%{box-shadow:0 0 18px rgba(81,237,151,0.18)}}
@keyframes hs5-breathe{0%,100%{opacity:0.7}50%{opacity:1}}
@keyframes hs5-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes hs5-bar-shimmer{0%{left:-40%}100%{left:140%}}

/* Cards layout */
.hs5-cards-grid{display:flex;flex-direction:column;gap:20px;max-width:1120px;margin:0 auto;padding:48px 24px;box-sizing:border-box}
.hs5-bento{border:1px solid ${T.border};border-radius:var(--hs5-r,12px);display:flex;align-items:center;overflow:hidden;background:transparent}
.hs5-bento-left{flex:1;padding:56px 48px;min-width:0}
.hs5-bento-right{flex:1;background:rgba(255,255,255,0.025);display:flex;align-items:center;justify-content:center;padding:40px 32px;align-self:stretch}
.hs5-bento .hs5-card{max-width:440px;box-shadow:none;border:none;background:${T.card2}}

/* Cards scroll reveal */
.hs5-bento .hs5-tag,
.hs5-bento .hs5-title,
.hs5-bento .hs5-desc,
.hs5-bento .hs5-link{opacity:0;transform:translateY(16px);transition:opacity 0.5s cubic-bezier(0.16,1,0.3,1),transform 0.5s cubic-bezier(0.16,1,0.3,1)}
.hs5-bento .hs5-visual{opacity:0;transform:translateY(16px);transition:opacity 0.6s cubic-bezier(0.16,1,0.3,1),transform 0.6s cubic-bezier(0.16,1,0.3,1)}
.hs5-bento.visible .hs5-tag{opacity:1;transform:none;transition-delay:0s}
.hs5-bento.visible .hs5-title{opacity:1;transform:none;transition-delay:0.05s}
.hs5-bento.visible .hs5-desc{opacity:1;transform:none;transition-delay:0.1s}
.hs5-bento.visible .hs5-link{opacity:1;transform:none;transition-delay:0.15s}
.hs5-bento.visible .hs5-visual{opacity:1;transform:none;transition-delay:0.1s}

/* Mobile */
@media(max-width:809px){
.hs5-hero{padding:48px 20px 0}
.hs5-heading{font-size:32px}
.hs5-subtitle{font-size:16px}
.hs5-sections{padding-top:16px}
.hs5-section{flex-direction:column !important;gap:32px;padding:48px 20px}
.hs5-text{text-align:center;display:flex;flex-direction:column;align-items:center}
.hs5-desc{text-align:center;max-width:100%}
.hs5-title{font-size:26px !important}
.hs5-visual{width:100%}
.hs5-card{max-width:100%}
.hs5-bento{flex-direction:column}
.hs5-bento-left{padding:28px 20px 0}
.hs5-bento-right{padding:20px;width:100%}
}

/* Tablet */
@media(min-width:810px)and(max-width:1099px){
.hs5-heading{font-size:38px}
.hs5-section{gap:40px;padding:60px 24px}
.hs5-title{font-size:30px !important}
}
`

// Section data

const DEFAULT_TITLES = [
    "Rewards & Points",
    "Tiers & Memberships",
    "Referrals",
    "Gamified Loyalty",
    "Subscription Loyalty",
    "Omnichannel Loyalty",
]

const DEFAULT_DESCRIPTIONS = [
    "Reward every interaction with flexible, brand-elevating incentives that drive repeat purchases.",
    "Create exclusive experiences that keep your best customers coming back for more.",
    "Turn your customers into advocates with seamless referral programs.",
    "Engage users with fun, interactive challenges and badges.",
    "Provide a fully integrated loyalty + subscription experience that fuels lasting loyalty.",
    "Connect the dots between online and offline behavior seamlessly.",
]

const DEFAULT_LINKS = [
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
]

// Style helpers

const label = (size = 11, color = "#888", weight = 600, ls = "0.08em") => ({
    fontFamily: F,
    fontSize: size,
    fontWeight: weight,
    letterSpacing: ls,
    textTransform: "uppercase" as const,
    color,
})

const body = (size = 13, color = "#fff", weight = 400) => ({
    fontFamily: F,
    fontSize: size,
    fontWeight: weight,
    color,
    lineHeight: 1.5,
})

// Animation phase hook — cycles 0…(phases-1) then rests at -1
function useAnimationPhase(phases: number, phaseDuration: number, restDuration: number): number {
    const [phase, setPhase] = useState(-1)
    useEffect(() => {
        let current = -1
        let timeout: ReturnType<typeof setTimeout>
        const tick = () => {
            current++
            if (current >= phases) {
                current = -1
                setPhase(-1)
                timeout = setTimeout(tick, restDuration)
            } else {
                setPhase(current)
                timeout = setTimeout(tick, phaseDuration)
            }
        }
        timeout = setTimeout(tick, restDuration / 2)
        return () => clearTimeout(timeout)
    }, [phases, phaseDuration, restDuration])
    return phase
}

// Creative 1: Rewards & Points

function RewardsCreative() {
    const t = useContext(ThemeCtx)
    const phase = useAnimationPhase(3, 2000, 3500)
    const highlightIdx = phase >= 0 ? phase + 1 : -1
    const earnCards = [
        {
            icon: IC.user,
            title: "Create an Account",
            points: "+50 Points",
            done: true,
        },
        {
            icon: IC.instagram,
            title: "Follow on Instagram",
            points: "+25 Points",
            done: false,
        },
        {
            icon: IC.pencil,
            title: "Write a Review",
            points: "+35 Points",
            done: false,
        },
        {
            icon: IC.gift,
            title: "Tell Us Your Birthday",
            points: "+25 Points",
            done: false,
        },
    ]
    return (
        <div className="hs5-card" style={{ padding: 28 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={label(11, t.sub)}>WAYS TO EARN POINTS</div>
                <div style={{ ...body(12, t.sub), marginTop: 5 }}>
                    Earn points by following us, sharing your birthday, and
                    more.
                </div>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                }}
            >
                {earnCards.map((c, i) => (
                    <div
                        key={i}
                        style={{
                            background: t.card2,
                            border: `1px solid ${c.done ? A : i === highlightIdx ? "rgba(81,237,151,0.45)" : t.border}`,
                            borderRadius: "var(--hs5-r, 12px)",
                            padding: "22px 14px 18px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 10,
                            textAlign: "center",
                            boxShadow: c.done
                                ? `0 0 14px rgba(81,237,151,0.06)`
                                : i === highlightIdx
                                    ? `0 0 16px rgba(81,237,151,0.1)`
                                    : "none",
                            transition: "border-color 0.6s ease, box-shadow 0.6s ease",
                        }}
                    >
                        <div
                            style={{
                                color: A,
                                opacity: 0.9,
                                animation: c.done
                                    ? "hs5-breathe 2.5s ease-in-out infinite"
                                    : "none",
                            }}
                            dangerouslySetInnerHTML={{ __html: c.icon }}
                        />
                        <div
                            style={{
                                ...body(12, t.text, 700),
                                lineHeight: 1.3,
                            }}
                        >
                            {c.title}
                        </div>
                        <div style={{ ...body(11, t.sub) }}>
                            {c.done ? "earned " : "earn "}
                            {c.points}
                        </div>
                        {c.done ? (
                            <div
                                style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: "50%",
                                    background: A,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${t.checkStroke}" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg>`,
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                />
                            </div>
                        ) : (
                            <div
                                style={{
                                    padding: "5px 14px",
                                    border: `1px solid ${t.border}`,
                                    borderRadius: "var(--hs5-r, 12px)",
                                    ...body(11, t.text, 600),
                                }}
                            >
                                {i === 1 ? "FOLLOW" : "SUBMIT"}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

// Creative 2: Tiers & Memberships

function TiersCreative({ tiersImage }: { tiersImage?: string }) {
    const t = useContext(ThemeCtx)
    const tierPhase = useAnimationPhase(1, 4000, 4500)
    const tierProgress = tierPhase === 0 ? 51 : 0
    const [awayAmount, setAwayAmount] = useState(200)
    const targetAway = tierPhase === 0 ? 98 : 200
    const awayStartRef = useRef(200)
    useEffect(() => {
        const start = awayStartRef.current
        const end = targetAway
        if (start === end) return
        const duration = 2000
        const t0 = performance.now()
        let raf: number
        const step = (now: number) => {
            const p = Math.min((now - t0) / duration, 1)
            const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
            const val = Math.round(start + (end - start) * ease)
            setAwayAmount(val)
            if (p < 1) { raf = requestAnimationFrame(step) } else { awayStartRef.current = end }
        }
        raf = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf)
    }, [targetAway])
    const benefits = [
        "1.5x Online purchase multiplier",
        "1.5x Referral points multiplier",
        "Bonus points for reaching tier",
        "Birthday gift",
        "Early access to products",
    ]
    return (
        <div className="hs5-card" style={{ padding: 0 }}>
            <div
                style={{
                    position: "relative",
                    background: t.headerBg,
                    overflow: "hidden",
                }}
            >
                {tiersImage && (
                    <img
                        src={tiersImage}
                        alt=""
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                )}
                <div
                    style={{
                        position: "relative",
                        padding: "24px 28px 0",
                        textAlign: "center",
                    }}
                >
                    <div style={{ ...label(10, t.text), opacity: 0.7 }}>
                        CURRENT TIER
                    </div>
                    <div
                        style={{
                            margin: "8px 0 4px",
                            color: t.text,
                            animation: "hs5-breathe 3s ease-in-out infinite",
                        }}
                        dangerouslySetInnerHTML={{ __html: IC.trophy }}
                    />
                    <div
                        style={{
                            ...body(22, t.text, 800),
                            letterSpacing: "-0.02em",
                        }}
                    >
                        FAN
                    </div>
                </div>
                <div
                    style={{ position: "relative", padding: "10px 28px 16px" }}
                >
                    <div
                        style={{
                            height: 4,
                            background: t.divider,
                            borderRadius: 2,
                            overflow: "visible",
                            marginBottom: 12,
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                background: A,
                                borderRadius: 2,
                                width: `${tierProgress}%`,
                                position: "relative",
                                overflow: "hidden",
                                transition: "width 2s ease-in-out",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    width: "30%",
                                    height: "100%",
                                    background:
                                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                    animation:
                                        "hs5-bar-shimmer 2.5s ease-in-out infinite",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: `${tierProgress}%`,
                                transform: "translate(-50%, -50%)",
                                width: 9,
                                height: 9,
                                borderRadius: "50%",
                                background: A,
                                border: `2px solid ${t.card}`,
                                zIndex: 2,
                                opacity: tierProgress > 0 ? 1 : 0,
                                transition: "left 2s ease-in-out, opacity 0.4s ease",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            ...body(11, t.text, 600),
                            textAlign: "center",
                        }}
                    >
                        ${awayAmount} AWAY FROM ENTHUSIAST
                    </div>
                </div>
            </div>
            <div
                style={{
                    background: t.card2,
                    padding: "24px 28px 26px",
                    borderTop: `1px solid ${t.border}`,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 18,
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: t.card3,
                            border: `1.5px solid ${A}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            animation: "hs5-glow 3s ease-in-out infinite",
                        }}
                    >
                        <span
                            dangerouslySetInnerHTML={{ __html: IC.trophy }}
                            style={{
                                color: A,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        />
                    </div>
                    <div>
                        <div style={{ ...body(14, t.text, 700) }}>
                            ENTHUSIAST
                        </div>
                        <div style={{ ...body(12, t.sub), marginTop: 2 }}>
                            Spend $200
                        </div>
                    </div>
                </div>
                {benefits.map((b, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 9,
                            padding: "9px 0",
                            borderTop:
                                i === 0 ? `1px solid ${t.border}` : "none",
                        }}
                    >
                        <span dangerouslySetInnerHTML={{ __html: IC.check }} />
                        <span style={{ ...body(12, t.sub) }}>{b}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Creative 3: Referrals

function ReferralsCreative() {
    const t = useContext(ThemeCtx)
    const refPhase = useAnimationPhase(4, 400, 5000)
    const socials = ["X", "f", "W", "T"]
    return (
        <div className="hs5-card" style={{ padding: 28 }}>
            <div style={label(11, A)}>REFER A FRIEND</div>
            <div
                style={{
                    ...body(24, t.text, 700),
                    letterSpacing: "-0.02em",
                    margin: "10px 0 6px",
                }}
            >
                Give $30 Get $30
            </div>
            <div style={{ ...body(13, t.sub), marginBottom: 22 }}>
                Give your friends $15 off their first order of $50 and earn $30
                off for yourself.
            </div>
            <div
                style={{
                    background: t.card2,
                    border: `1px solid ${t.border}`,
                    borderRadius: "var(--hs5-r, 12px)",
                    padding: "12px 14px",
                    marginBottom: 14,
                }}
            >
                <span style={{ ...body(13, t.sub) }}>Your friend's email</span>
            </div>
            <div
                style={{
                    padding: "9px 18px",
                    border: `1.5px solid ${t.stroke}`,
                    borderRadius: "var(--hs5-r, 12px)",
                    display: "inline-block",
                    ...body(12, t.text, 700),
                    letterSpacing: "0.04em",
                    marginBottom: 22,
                }}
            >
                SUBMIT
            </div>
            <div>
                <div style={{ ...body(12, t.sub), marginBottom: 8 }}>
                    Copy this link and share
                </div>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 16px",
                        background: A,
                        borderRadius: "var(--hs5-r, 12px)",
                        ...body(12, T.bg, 700),
                        letterSpacing: "0.04em",
                        cursor: "pointer",
                        animation: "hs5-glow 3s ease-in-out infinite",
                    }}
                >
                    <span
                        dangerouslySetInnerHTML={{ __html: IC.copy }}
                        style={{ color: T.bg }}
                    />
                    COPY LINK
                </div>
            </div>
            <div style={{ marginTop: 18 }}>
                <div style={{ ...body(12, t.sub), marginBottom: 8 }}>
                    Share an invite to your friends
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    {socials.map((s, i) => (
                        <div
                            key={i}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                border: `1px solid ${i === refPhase ? A : t.border}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                ...body(12, i === refPhase ? A : t.text, 600),
                                transform: i === refPhase ? "scale(1.25)" : "scale(1)",
                                transition: "transform 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                            }}
                        >
                            {s}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Creative 4: Gamified Loyalty

function GamifiedCreative() {
    const t = useContext(ThemeCtx)
    const votePhase = useAnimationPhase(4, 2000, 3000)
    const activeIdx = votePhase >= 0 ? votePhase : 0
    const options = [
        { label: "SPRING" },
        { label: "SUMMER" },
        { label: "FALL" },
        { label: "WINTER" },
    ]
    return (
        <div
            className="hs5-card"
            style={{ padding: "36px 28px 28px", textAlign: "center" }}
        >
            <div
                style={{
                    ...body(17, t.text, 800),
                    letterSpacing: "0.06em",
                    marginBottom: 8,
                }}
            >
                VOTE
            </div>
            <div
                style={{
                    ...body(14, t.sub),
                    maxWidth: 260,
                    margin: "0 auto 28px",
                }}
            >
                Which season is your favorite for cycling outdoors?
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 32,
                }}
            >
                {options.map((o, i) => {
                    const isActive = i === activeIdx
                    return (
                        <div
                            key={i}
                            style={{
                                padding: "10px 28px",
                                borderRadius: "var(--hs5-r, 12px)",
                                background: isActive ? A : t.card2,
                                border: `1px solid ${isActive ? A : t.border}`,
                                ...body(13, isActive ? T.bg : t.text, 600),
                                letterSpacing: "0.04em",
                                minWidth: 120,
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "background 0.4s ease, border-color 0.4s ease, color 0.4s ease",
                            }}
                        >
                            {o.label}
                        </div>
                    )
                })}
            </div>
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 22px",
                    border: `1.5px solid ${t.stroke}`,
                    borderRadius: "var(--hs5-r, 12px)",
                    ...body(12, t.text, 700),
                    letterSpacing: "0.06em",
                }}
            >
                NEXT QUESTION
                <span
                    style={{ animation: "hs5-float 2s ease-in-out infinite" }}
                    dangerouslySetInnerHTML={{
                        __html: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>`,
                    }}
                />
            </div>
        </div>
    )
}

// Creative 5: Subscription Loyalty

function SubscriptionCreative({ rewardImage }: { rewardImage?: string }) {
    const t = useContext(ThemeCtx)
    const subPhase = useAnimationPhase(5, 500, 4000)
    const animMonth = subPhase >= 0 ? subPhase + 1 : 5
    const months = Array.from({ length: 12 }, (_, i) => i + 1)
    const currentMonth = 5
    return (
        <div className="hs5-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "24px 28px 28px", background: t.card2 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 18,
                    }}
                >
                    <div
                        style={{
                            padding: "4px 12px",
                            background: t.pillBg,
                            borderRadius: "var(--hs5-r, 12px)",
                            ...label(10, t.text, 600, "0.04em"),
                        }}
                    >
                        Subscriber
                    </div>
                    <div style={{ ...body(12, t.sub) }}>
                        Month {currentMonth} of 12
                    </div>
                </div>
                <div
                    style={{
                        ...body(18, t.text, 700),
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                        marginBottom: 6,
                    }}
                >
                    One month away from milestone reward!
                </div>
                <div style={{ ...body(13, t.sub), marginBottom: 22 }}>
                    Keep your subscription active to unlock your next reward.
                </div>
                <div style={{ marginBottom: 24 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            position: "relative",
                            padding: "0 4px",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: 4,
                                right: 4,
                                height: 2,
                                background: t.divider,
                                transform: "translateY(-50%)",
                                zIndex: 0,
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: 4,
                                height: 2,
                                background: A,
                                transform: "translateY(-50%)",
                                zIndex: 1,
                                width: `${((animMonth - 1) / 11) * 100}%`,
                                borderRadius: 1,
                                transition: "width 0.4s ease",
                            }}
                        />
                        {months.map((m) => {
                            const filled = m < animMonth
                            const current = m === animMonth
                            const milestone = m === 6
                            return (
                                <div
                                    key={m}
                                    style={{
                                        width: 13,
                                        height: 13,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        position: "relative",
                                        zIndex: 2,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: current ? 13 : milestone ? 9 : 7,
                                            height: current ? 13 : milestone ? 9 : 7,
                                            borderRadius: "50%",
                                            background:
                                                filled || current
                                                    ? A
                                                    : milestone
                                                      ? t.card3
                                                      : t.divider,
                                            border: current
                                                ? `2px solid ${t.card2}`
                                                : milestone
                                                  ? `1.5px solid ${A}`
                                                  : "none",
                                            boxShadow: current
                                                ? `0 0 10px rgba(81,237,151,0.3)`
                                                : "none",
                                            transition: "background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, height 0.3s ease",
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 8,
                        }}
                    >
                        <span style={{ ...body(10, t.sub, 500) }}>Month 1</span>
                        <span style={{ ...body(10, A, 600) }}>Month 6</span>
                        <span style={{ ...body(10, t.sub, 500) }}>
                            Month 12
                        </span>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        background: t.card3,
                        borderRadius: "var(--hs5-r, 12px)",
                        overflow: "hidden",
                        marginBottom: 18,
                        border: `1px solid ${t.border}`,
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            width: 120,
                            minHeight: 120,
                            flexShrink: 0,
                            background: `linear-gradient(135deg, ${t.card} 0%, ${t.card2} 100%)`,
                            overflow: "hidden",
                        }}
                    >
                        {rewardImage && (
                            <img
                                src={rewardImage}
                                alt=""
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </div>
                    <div
                        style={{
                            padding: "16px 18px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: 4,
                            flex: 1,
                        }}
                    >
                        <div style={label(9, t.sub, 500, "0.06em")}>
                            MILESTONE REWARD
                        </div>
                        <div
                            style={{
                                ...body(15, t.text, 700),
                                lineHeight: 1.3,
                            }}
                        >
                            Skincare Serum
                        </div>
                        <div style={{ ...body(12, t.sub), marginTop: 2 }}>
                            Unlocks in{" "}
                            <span
                                style={{
                                    color: A,
                                    fontWeight: 600,
                                    animation:
                                        "hs5-breathe 2s ease-in-out infinite",
                                }}
                            >
                                28 days
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        padding: "12px 0",
                        background: A,
                        borderRadius: "var(--hs5-r, 12px)",
                        textAlign: "center",
                        ...body(13, T.bg, 600),
                        cursor: "pointer",
                    }}
                >
                    Shop
                </div>
            </div>
        </div>
    )
}

// Creative 6: Omnichannel Loyalty

function OmnichannelCreative() {
    const t = useContext(ThemeCtx)
    const chPhase = useAnimationPhase(3, 800, 4000)
    const actPhase = useAnimationPhase(4, 600, 4500)
    const channels = [
        { icon: IC.store, label: "Store", active: true },
        { icon: IC.globe, label: "Online", active: true },
        { icon: IC.phone, label: "App", active: false },
    ]
    return (
        <div className="hs5-card" style={{ padding: 0 }}>
            <div style={{ background: t.headerBg, padding: "24px 24px 22px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <div style={label(10, t.sub)}>POINTS</div>
                    <div
                        style={{
                            ...body(24, t.text, 700),
                            animation: "hs5-breathe 3s ease-in-out infinite",
                        }}
                    >
                        1,200
                    </div>
                </div>
                <div
                    style={{
                        height: 1,
                        background: t.border,
                        marginBottom: 18,
                    }}
                />
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div>
                        <div style={label(9, t.sub, 500, "0.06em")}>MEMBER</div>
                        <div style={{ ...body(14, t.text, 500), marginTop: 3 }}>
                            Stephanie O.
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={label(9, t.sub, 500, "0.06em")}>TIER</div>
                        <div style={{ ...body(14, t.text, 500), marginTop: 3 }}>
                            Enthusiast
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    padding: "22px 24px",
                    borderTop: `1px solid ${t.border}`,
                    background: t.card,
                }}
            >
                <div style={label(9, t.sub, 500, "0.06em")}>
                    CONNECTED CHANNELS
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0,
                        marginTop: 16,
                        marginBottom: 4,
                    }}
                >
                    {channels.map((ch, i) => {
                        const highlighted = i === chPhase
                        const lit = chPhase >= 0 && i <= chPhase
                        return (
                        <div
                            key={i}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 7,
                                }}
                            >
                                <div
                                    style={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: "50%",
                                        border: `1.5px ${lit ? "solid" : "dashed"} ${lit ? A : t.border}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: lit ? A : t.sub,
                                        background: lit
                                            ? `rgba(81,237,151,0.05)`
                                            : "transparent",
                                        transform: highlighted ? "scale(1.15)" : "scale(1)",
                                        transition: "transform 0.4s ease, border-color 0.4s ease, color 0.4s ease, background 0.4s ease",
                                    }}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: ch.icon,
                                        }}
                                        style={{ display: "flex" }}
                                    />
                                </div>
                                <span
                                    style={{
                                        ...body(
                                            10,
                                            lit ? t.text : t.sub,
                                            500
                                        ),
                                        transition: "color 0.4s ease",
                                    }}
                                >
                                    {ch.label}
                                </span>
                            </div>
                            {i < channels.length - 1 && (
                                <div
                                    style={{
                                        width: 36,
                                        borderTop: `1.5px dashed ${t.border}`,
                                        marginBottom: 22,
                                        marginLeft: 8,
                                        marginRight: 8,
                                    }}
                                />
                            )}
                        </div>
                        )
                    })}
                </div>
            </div>
            <div
                style={{
                    padding: "20px 24px 22px",
                    background: t.card2,
                    borderTop: `1px solid ${t.border}`,
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        background: t.pillBg,
                        borderRadius: "var(--hs5-r, 12px)",
                        ...label(10, t.text, 600, "0.06em"),
                        marginBottom: 8,
                    }}
                >
                    RECENT ACTIVITY
                </div>
                {[
                    {
                        action: "In-store purchase",
                        pts: "+120 pts",
                        time: "Today",
                    },
                    {
                        action: "Online order #4821",
                        pts: "+85 pts",
                        time: "Yesterday",
                    },
                    {
                        action: "Receipt verified",
                        pts: "+50 pts",
                        time: "3 days ago",
                    },
                ].map((item, i) => {
                    const visible = actPhase < 0 ? true : i <= actPhase - 1
                    return (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px 0",
                            borderBottom:
                                i < 2 ? `1px solid ${t.border}` : "none",
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(8px)",
                            transition: "opacity 0.4s ease, transform 0.4s ease",
                        }}
                    >
                        <div>
                            <div style={{ ...body(13, t.text) }}>
                                {item.action}
                            </div>
                            <div style={{ ...body(11, t.sub), marginTop: 2 }}>
                                {item.time}
                            </div>
                        </div>
                        <div
                            style={{
                                ...body(13, A, 600),
                            }}
                        >
                            {item.pts}
                        </div>
                    </div>
                    )
                })}
            </div>
            <div
                style={{
                    padding: "14px 24px",
                    background: t.card,
                    borderTop: `1px solid ${t.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                }}
            >
                <span
                    dangerouslySetInnerHTML={{ __html: IC.wallet }}
                    style={{
                        color: t.sub,
                        animation: "hs5-float 4s ease-in-out infinite",
                    }}
                />
                <span style={{ ...body(12, t.sub, 500) }}>
                    Added to Apple Wallet
                </span>
            </div>
        </div>
    )
}

// Creative map

const CREATIVES: any[] = [
    RewardsCreative,
    TiersCreative,
    ReferralsCreative,
    GamifiedCreative,
    SubscriptionCreative,
    OmnichannelCreative,
]

// Main Component

export default function HomepageShowcaseV5(props) {
    const {
        heading = "Everything you need to build lasting loyalty",
        subtitle = "Powerful tools to build lasting customer loyalty",
        buttonLabel = "Discover",
        layout = "sections",
        section1 = { title: DEFAULT_TITLES[0], description: DEFAULT_DESCRIPTIONS[0], link: DEFAULT_LINKS[0] },
        section2 = { title: DEFAULT_TITLES[1], description: DEFAULT_DESCRIPTIONS[1], link: DEFAULT_LINKS[1] },
        section3 = { title: DEFAULT_TITLES[2], description: DEFAULT_DESCRIPTIONS[2], link: DEFAULT_LINKS[2] },
        section4 = { title: DEFAULT_TITLES[3], description: DEFAULT_DESCRIPTIONS[3], link: DEFAULT_LINKS[3] },
        section5 = { title: DEFAULT_TITLES[4], description: DEFAULT_DESCRIPTIONS[4], link: DEFAULT_LINKS[4] },
        section6 = { title: DEFAULT_TITLES[5], description: DEFAULT_DESCRIPTIONS[5], link: DEFAULT_LINKS[5] },
        rewardImage,
        tiersImage,
        descriptionSize = 16,
        titleSize = 40,
        borderRadius = 12,
        paddingTop = 0,
        paddingBottom = 0,
    } = props

    const sectionData = [section1, section2, section3, section4, section5, section6]
    const count = CREATIVES.length
    const sections = Array.from({ length: count }, (_, i) => ({
        title: sectionData[i]?.title || DEFAULT_TITLES[i] || `Section ${i + 1}`,
        desc: sectionData[i]?.description || DEFAULT_DESCRIPTIONS[i] || "",
        link: sectionData[i]?.link || DEFAULT_LINKS[i] || "#",
    }))

    const [heroVisible, setHeroVisible] = useState(false)
    const wrapRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

    // Hero entrance
    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        const fallback = setTimeout(() => setHeroVisible(true), 300)
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setHeroVisible(true)
                    obs.disconnect()
                    clearTimeout(fallback)
                }
            },
            { threshold: 0.1 }
        )
        obs.observe(el)
        return () => {
            obs.disconnect()
            clearTimeout(fallback)
        }
    }, [])

    // Section scroll reveal
    useEffect(() => {
        const els = sectionRefs.current.filter(Boolean) as HTMLDivElement[]
        if (!els.length) return
        const fallback = setTimeout(() => {
            els.forEach((el) => el.classList.add("visible"))
        }, 600)
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        ;(entry.target as HTMLElement).classList.add("visible")
                        obs.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.12 }
        )
        els.forEach((el) => obs.observe(el))
        return () => {
            obs.disconnect()
            clearTimeout(fallback)
        }
    }, [])

    const getCreativeProps = (i: number) => {
        if (CREATIVES[i] === SubscriptionCreative) return { rewardImage }
        if (CREATIVES[i] === TiersCreative) return { tiersImage }
        return {}
    }

    return (
        <ThemeCtx.Provider value={T}>
            <style>{css}</style>
            <div
                ref={wrapRef}
                className={`hs5-wrap${heroVisible ? " hs5-visible" : ""}`}
                style={{
                    ["--hs5-desc-size" as any]: `${descriptionSize}px`,
                    ["--hs5-title-size" as any]: `${titleSize}px`,
                    ["--hs5-r" as any]: `${borderRadius}px`,
                    paddingTop: paddingTop || undefined,
                    paddingBottom: paddingBottom || undefined,
                }}
            >
                {/* Hero */}
                <div className="hs5-hero hs5-hero-anim">
                    <div className="hs5-label">PLATFORM OVERVIEW</div>
                    <h2 className="hs5-heading">{heading}</h2>
                    {subtitle && <p className="hs5-subtitle">{subtitle}</p>}
                </div>

                {/* Sections layout */}
                {layout === "sections" && (
                    <div className="hs5-sections">
                        {sections.map((s, i) => {
                            const tag = SECTION_TAGS[i] || SECTION_TAGS[0]
                            const Creative = CREATIVES[i]
                            const cProps = getCreativeProps(i)
                            const isReverse = i % 2 === 1
                            return (
                                <div key={i}>
                                    {i > 0 && <div className="hs5-separator" />}
                                    <div
                                        ref={(el) => {
                                            sectionRefs.current[i] = el
                                        }}
                                        className={`hs5-section${isReverse ? " reverse" : ""}`}
                                    >
                                        <div className="hs5-text">
                                            <div className="hs5-tag">{tag}</div>
                                            <h3 className="hs5-title">{s.title}</h3>
                                            <p className="hs5-desc">{s.desc}</p>
                                            <a className="hs5-link" href={s.link}>
                                                {buttonLabel}
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: IC.arrow,
                                                    }}
                                                />
                                                <span className="hs5-link-line" />
                                            </a>
                                        </div>
                                        <div className="hs5-visual">
                                            <Creative {...cProps} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Cards layout */}
                {layout === "cards" && (
                    <div className="hs5-cards-grid">
                        {sections.map((s, i) => {
                            const tag = SECTION_TAGS[i] || SECTION_TAGS[0]
                            const Creative = CREATIVES[i]
                            const cProps = getCreativeProps(i)
                            return (
                                <div
                                    key={i}
                                    ref={(el) => {
                                        sectionRefs.current[i] = el
                                    }}
                                    className="hs5-bento"
                                >
                                    <div className="hs5-bento-left">
                                        <div className="hs5-tag">{tag}</div>
                                        <h3 className="hs5-title">{s.title}</h3>
                                        <p className="hs5-desc">{s.desc}</p>
                                        <a className="hs5-link" href={s.link}>
                                            {buttonLabel}
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: IC.arrow,
                                                }}
                                            />
                                            <span className="hs5-link-line" />
                                        </a>
                                    </div>
                                    <div className="hs5-bento-right">
                                        <div className="hs5-visual">
                                            <Creative {...cProps} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </ThemeCtx.Provider>
    )
}

const sectionControl = (index: number) => ({
    type: ControlType.Object,
    title: DEFAULT_TITLES[index],
    controls: {
        title: {
            type: ControlType.String,
            title: "Title",
            defaultValue: DEFAULT_TITLES[index],
        },
        description: {
            type: ControlType.String,
            title: "Description",
            defaultValue: DEFAULT_DESCRIPTIONS[index],
        },
        link: {
            type: ControlType.Link,
            title: "Link",
            defaultValue: DEFAULT_LINKS[index],
        },
    },
})

addPropertyControls(HomepageShowcaseV5, {
    layout: {
        type: ControlType.Enum,
        title: "Layout",
        options: ["sections", "cards"],
        optionTitles: ["Sections", "Cards"],
        defaultValue: "sections",
    },
    heading: {
        type: ControlType.String,
        title: "Heading",
        defaultValue: "Everything you need to build lasting loyalty",
    },
    subtitle: {
        type: ControlType.String,
        title: "Subtitle",
        defaultValue: "Powerful tools to build lasting customer loyalty",
    },
    buttonLabel: {
        type: ControlType.String,
        title: "Button Label",
        defaultValue: "Discover",
    },
    section1: sectionControl(0),
    section2: sectionControl(1),
    section3: sectionControl(2),
    section4: sectionControl(3),
    section5: sectionControl(4),
    section6: sectionControl(5),
    rewardImage: {
        type: ControlType.Image,
        title: "Reward Image",
    },
    tiersImage: {
        type: ControlType.Image,
        title: "Tiers Image",
    },
    descriptionSize: {
        type: ControlType.Number,
        title: "Description Size",
        defaultValue: 16,
        min: 12,
        max: 22,
        step: 1,
    },
    titleSize: {
        type: ControlType.Number,
        title: "Title Size",
        defaultValue: 40,
        min: 24,
        max: 52,
        step: 1,
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        defaultValue: 12,
        min: 0,
        max: 24,
        step: 1,
    },
    paddingTop: {
        type: ControlType.Number,
        title: "Padding Top",
        defaultValue: 0,
        min: 0,
        max: 200,
        step: 4,
    },
    paddingBottom: {
        type: ControlType.Number,
        title: "Padding Bottom",
        defaultValue: 0,
        min: 0,
        max: 200,
        step: 4,
    },
})
