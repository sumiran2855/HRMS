import type React from "react"
import { ShieldCheck, Calendar, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react"

export interface TrustFeature {
    icon: React.ElementType
    title: string
    description: string
    color: string
    gradient: string
}

export const trustFeatures: TrustFeature[] = [
    {
        icon: ShieldCheck,
        title: "Enterprise Grade Security",
        description: "SOC2 Type II, GDPR, ISO 27001 certified with end-to-end encryption.",
        color: "from-emerald-500 to-green-600",
        gradient: "from-emerald-500/10 to-green-500/10",
    },
    {
        icon: Calendar,
        title: "14-Day Free Trial",
        description: "Full platform access. No commitment. Cancel anytime.",
        color: "from-blue-500 to-indigo-600",
        gradient: "from-blue-500/10 to-indigo-500/10",
    },
    {
        icon: Zap,
        title: "Lightning Fast Setup",
        description: "Onboard 1000+ employees in under 15 minutes with our smart importer.",
        color: "from-purple-500 to-violet-600",
        gradient: "from-purple-500/10 to-violet-500/10",
    },
]

export const testimonials = [
    {
        quote:
            "Switched from BambooHR to this platform. The automation alone saved us 20+ hours per week. Best HR decision we've made.",
        author: "Sarah Mitchell",
        role: "VP of People, TechVentures Inc.",
        rating: 5,
    },
    {
        quote:
            "Implementation was seamless. Our team of 500+ was up and running in days, not weeks. The support team is phenomenal.",
        author: "James Chen",
        role: "CHRO, GrowthScale",
        rating: 5,
    },
    {
        quote: "Finally, an HRMS that employees actually enjoy using. Self-service features reduced our HR tickets by 70%.",
        author: "Priya Sharma",
        role: "HR Director, InnovateCorp",
        rating: 5,
    },
    {
        quote:
            "The analytics dashboard gave us visibility we never had before. Reporting that used to take days now takes minutes.",
        author: "Alex Rodriguez",
        role: "Head of HR, PeopleFirst",
        rating: 5,
    },
    {
        quote: "Their onboarding workflows are a game changer. New hires are productive from day one.",
        author: "Emily Carter",
        role: "People Ops Lead, ScaleBridge",
        rating: 5,
    },
]