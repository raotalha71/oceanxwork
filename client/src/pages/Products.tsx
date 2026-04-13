/**
 * OCEANEX PRODUCTS PAGE — Editorial Luxury
 * Design: Warm Ink (#2C2416) + Cream (#FAF8F5) + Gold (#C9A961)
 * Typography: Cormorant Garamond (display) + Montserrat (body)
 * All product data sourced from official Oceanex brochures
 * Features: Video modal, 360 VR Tour modal, product spec sheets, real CDN imagery
 */

import { useState, useEffect, type FormEvent } from "react";
import { Link } from "wouter";
import {
  Play, Eye, ChevronRight, X, Zap, Clock, Shield, Package,
  TrendingUp, Globe, Award, ArrowRight, Check, Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

const CDN = {
  santorini:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/Totem1Front_842495f2.webp",
  baliSpa:      "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/Totem2Front_ce3e4359.webp",
  bahamasBack:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/Totem2Back_073ede92.webp",
  champagne:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/Totem3Front_05128652.webp",
  djBooth:      "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/Totem3Back_c47d9324.webp",
  worldCupFront:"https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/Totem4(WC)Front_2be17e0b.webp",
  worldCupBack: "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/Totem4(WC)Back_033b60c7.webp",
  // New product images from totem uploads
  coolPort1:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/cool_port_1_7f34a0e0.webp",
  coolPort2:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/cool_port_2_4d0fe11a.webp",
  tahitiBar1:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/tahiti_pool_bar_1_3f07b4e9.webp",
  tahitiBar2:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/tahiti_pool_bar_2_4aefbbbc.webp",
  aquaShack:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/aqua_shack_8fcdac52.webp",
  miamiBar:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/miami_bar_4ee0990c.webp",
  americanBar:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/american_bar_1dbc82d0.webp",
  longBarNew:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/long_bar_118020c1.webp",
  champagneBarNew: "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/champagne_bar_acf1500a.webp",
  santoriniLifestyle: "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/santorini_lifestyle_7787bce1.webp",
  santoriniProduct1:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/santorini_product_1_696d84c3.webp",
  santoriniProduct2:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/santorini_product_2_0c1ab5ed.webp",
  santoriniPlus:      "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/santorini_plus_4c3ef129.webp",
  megaResort:         "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/mega_resort_4dee9b9b.webp",
  bahamasPoolBar:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/bahamas_pool_bar_f3245809.webp",
  miamiPoolBar:       "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/miami_pool_bar_5aa849b2.webp",
  baliSpaLifestyle:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/bali_spa_lifestyle_3e8f676e.webp",
  baliSpaProduct1:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/bali_spa_product_1_e05103a6.webp",
  baliSpaProduct2:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/bali_spa_product_2_2fb37621.webp",
  inflatabaleBarSystem: "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/inflatable_bar_system_c118b544.webp",
};

const PRODUCTS = [
  {
    id: "santorini-pool-bar",
    code: "SPB-001",
    name: "Santorini Pool Bar",
    tagline: "The Original Swim-Up Pool Bar",
    category: "Pool Bars",
    badge: "BESTSELLER",
    badgeStyle: { background: "rgba(201,169,97,0.15)", border: "1px solid rgba(201,169,97,0.5)", color: "#C9A961" },
    image: CDN.santorini,
    slots: 12,
    description: "A self-contained swim-up pool bar that places hospitality directly on the water. Designed for residential and hospitality settings, it installs in 8 minutes with no permits or permanent construction. Built with premium Drop Stitch technology for exceptional stability and commercial durability.",
    longDescription: "The Santorini Pool Bar is the product that started the revolution. Inspired by the iconic architecture of the Greek islands, it transforms any pool into a destination. The integrated swim-up bar creates an immersive hospitality experience that guests never forget, and keeps them spending longer at your venue.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Globe, label: "Material", value: "Military-grade Drop Stitch" },
    ],
    features: [
      "Self-contained swim-up bar integrated into pool zone",
      "No permits or permanent construction required",
      "Premium Drop Stitch technology, solid and rigid for up to 6 days",
      "Aqua-Zip cleaning system for effortless maintenance",
      "UV-printed full-coverage custom branding available",
      "Heavy-duty, weather-resistant for repeated commercial use",
      "Includes storage bag; wheeled transport case recommended for local logistics",
      "Compatible with sea water, lake water, and chlorinated pools",
    ],
    markets: ["Luxury Resorts", "Hotels", "Private Villas", "Cruise Lines", "Beach Clubs"],
    revenueAdvantages: [
      "2x lift on F&B spend per guest vs standard poolside service",
      "Brandable surfaces generate sponsorship & liquor activation fees",
      "Portable design enables more locations, more days open",
      "Silent, power-free operation reduces costs and boosts profit",
    ],
    price: "Enquire for Pricing",
    hasVideo: true,
    hasVR: true,
  },
  {
    id: "bali-spa",
    code: "BSP-002",
    name: "Bali Spa",
    tagline: "Transform Overlooked Spaces Into Destinations",
    category: "Pool Bars",
    badge: "NEW 2026",
    badgeStyle: { background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.4)", color: "#38BDF8" },
    image: CDN.baliSpa,
    slots: 8,
    description: "Transform overlooked spaces into destinations. Beachfronts, rooftops, courtyards, lawns. Activated with intention. A fully self-contained bar environment, placed exactly where it belongs. No permits. No construction. No disruption. Built with military-grade Drop Stitch for quiet strength and enduring stability.",
    longDescription: "The Bali Spa is the most versatile product in the Oceanex collection. Its circular cabana design creates an intimate, resort-quality experience that works equally well on a hotel rooftop, a private beachfront, or a luxury garden. The draped canopy and integrated pool zone create a complete destination, not just a bar.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Globe, label: "Material", value: "Military-grade Drop Stitch" },
    ],
    features: [
      "Circular cabana design with integrated pool zone",
      "Draped canopy for shade and privacy",
      "Works on any flat surface, no pool required",
      "Premium Drop Stitch technology, solid and rigid",
      "Aqua-Zip cleaning system",
      "Full-surface UV-printed branding available",
      "Ideal for honeymoon suites and VIP experiences",
      "Adaptable for hotel rentals and DTC market",
    ],
    markets: ["Luxury Hotels", "Spas & Wellness", "Private Villas", "Rooftop Venues", "Beach Resorts"],
    revenueAdvantages: [
      "Premium rental income, VIP and honeymoon packages",
      "Instagrammable moments drive organic social reach",
      "Multi-use: spa, bar, private cabana, event space",
      "Year-round indoor/outdoor deployment flexibility",
    ],
    price: "Enquire for Pricing",
    hasVideo: true,
    hasVR: true,
  },
  {
    id: "bahamas-pool-bar",
    code: "BPB-003",
    name: "Bahamas Pool Bar",
    tagline: "The Mega Resort Platform",
    category: "Pool Bars",
    badge: "FLAGSHIP",
    badgeStyle: { background: "rgba(201,169,97,0.15)", border: "1px solid rgba(201,169,97,0.5)", color: "#C9A961" },
    image: CDN.bahamasBack,
    slots: 5,
    description: "The Bahamas Pool Bar is the centrepiece of the Oceanex Mega Resort Platform. A modular, large-format swim-up bar system designed to anchor entire pool zones and create the kind of destination experience that defines a resort's identity. Starting at 80 ft. Easy rental revenue at scale.",
    longDescription: "When a resort needs a statement piece, the Bahamas Pool Bar delivers. Its circular swim-up design accommodates multiple bartenders and dozens of guests simultaneously, creating the kind of high-energy pool experience that fills social media feeds and drives repeat bookings.",
    specs: [
      { icon: Clock, label: "Inflation", value: "Under 15 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Format", value: "Modular, from 80 ft" },
      { icon: Zap, label: "Power", value: "Multi-pump system" },
      { icon: Globe, label: "Material", value: "Military-grade Drop Stitch" },
      { icon: Award, label: "Capacity", value: "Multi-bartender format" },
    ],
    features: [
      "Circular modular design, configurable to any pool",
      "Multi-bartender format for peak demand service",
      "Starting at 80 ft, scalable to full resort size",
      "Aqua-Zip cleaning system",
      "Full-surface UV-printed branding",
      "Complete destination experience in one system",
      "Easy rental revenue at scale",
      "Includes: Bahamas Pool Bar, Miami Pool Bar, Santorini Plus",
    ],
    markets: ["Mega Resorts", "Cruise Lines", "Private Islands", "Large Hotels", "Theme Parks"],
    revenueAdvantages: [
      "Anchor entire pool zones and create destination experiences",
      "Multiple revenue streams: F&B, cabana rental, sponsorship",
      "Drives repeat bookings and social media reach",
      "Modular format scales revenue with demand",
    ],
    price: "Enquire for Pricing",
    hasVideo: true,
    hasVR: true,
  },
  {
    id: "champagne-bar",
    code: "CHB-004",
    name: "Champagne Bar",
    tagline: "Luxury Pavilion Collection",
    category: "Event Bars",
    badge: "LUXURY",
    badgeStyle: { background: "rgba(201,169,97,0.15)", border: "1px solid rgba(201,169,97,0.5)", color: "#C9A961" },
    image: CDN.champagne,
    slots: 15,
    description: "The Champagne Bar is the centrepiece of the Oceanex Luxury Pavilion Collection. An architectural inflatable bar designed for the most discerning events, weddings, corporate galas, rooftop launches, and private celebrations. Its arched form and gold-lit interior create an atmosphere of effortless opulence.",
    longDescription: "The Champagne Bar redefines what a temporary bar structure can be. Its architectural arched design and premium gold interior lighting create an atmosphere that rivals permanent luxury venues. Paired with the Luxury Pavilion tent structure, it creates a complete, self-contained event environment that can be deployed anywhere in the world in under 20 minutes.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Award, label: "Collection", value: "Luxury Pavilion" },
    ],
    features: [
      "Architectural arched form, premium aesthetic",
      "Gold-lit interior for luxury atmosphere",
      "Pairs with Luxury Pavilion tent structure",
      "Full-surface UV-printed branding",
      "No pool required, deploys anywhere",
      "Premium Drop Stitch construction",
      "Ideal for weddings, galas, and corporate events",
    ],
    markets: ["Weddings", "Corporate Events", "Luxury Galas", "Private Celebrations", "Brand Activations"],
    revenueAdvantages: [
      "Premium event hire rates available on enquiry",
      "Sponsorship and brand activation revenue",
      "Pairs with Luxury Pavilion for complete event packages",
      "Year-round indoor/outdoor deployment",
    ],
    price: "Enquire for Pricing",
    hasVideo: true,
    hasVR: true,
  },
  {
    id: "dj-booth",
    code: "DJB-005",
    name: "Instant DJ Booth",
    tagline: "Deploy Atmosphere. Anywhere.",
    category: "Event Bars",
    badge: "TRENDING",
    badgeStyle: { background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.4)", color: "#38BDF8" },
    image: CDN.djBooth,
    slots: 20,
    description: "A standalone inflatable DJ booth designed to create atmosphere and energy. A professional platform for music across beach, pool, and outdoor environments. Fast to deploy and easy to reposition. Supports private use, rentals, and large-scale projects without approvals or structural complexity.",
    longDescription: "The Instant DJ Booth is the product that makes any outdoor space a venue. Its integrated LED lighting system and branded exterior create a professional setup that rivals permanent DJ booths, but can be deployed on a beach, by a pool, or at a festival in under 8 minutes.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Globe, label: "Lighting", value: "Integrated LED system" },
    ],
    features: [
      "Integrated LED lighting for professional atmosphere",
      "Full-surface UV-printed branding",
      "No approvals or structural complexity required",
      "Works on beach, pool, festival, or indoor venue",
      "Military-grade Drop Stitch for high-use conditions",
      "Easy reposition between sets or events",
      "Pairs with any Oceanex bar system",
    ],
    markets: ["Beach Clubs", "Festivals", "Pool Parties", "Corporate Events", "Private Hire"],
    revenueAdvantages: [
      "Premium DJ hire packages available on enquiry",
      "Branded exterior generates sponsorship revenue",
      "Pairs with bar systems for complete event packages",
      "Multi-use: DJ booth, sampling station, merch stand",
    ],
    price: "Enquire for Pricing",
    hasVideo: true,
    hasVR: true,
  },
  {
    id: "world-cup-event-bar",
    code: "WC-001",
    name: "World Cup Event Bar",
    tagline: "Fast to Deploy. Built for the Moment.",
    category: "Themed Bars",
    badge: "FIFA 2026",
    badgeStyle: { background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.5)", color: "#F87171" },
    image: CDN.worldCupFront,
    slots: 7,
    description: "A standalone inflatable bar designed for large-scale celebration. Ideal for fan zones, festivals, and major events, it becomes an instant focal point. Fast to deploy with no permits or permanent construction. A customisable exterior allows matching of teams, brands, and event themes.",
    longDescription: "The World Cup Event Bar is the most commercially significant product in the Oceanex range for 2026. With FIFA World Cup 2026 spanning the USA, Canada, and Mexico, the largest sporting event in history, the demand for branded fan zone infrastructure is unprecedented. Available in 32 national team colourways.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Globe, label: "Customisation", value: "32 national colourways" },
      { icon: Award, label: "Codes", value: "WC0001 to WC0015+" },
    ],
    features: [
      "Available in 32 national team colourways",
      "Full-surface UV-printed team branding",
      "No permits or permanent construction required",
      "Military-grade Drop Stitch for high-energy environments",
      "Fast to deploy, operational in 8 minutes",
      "Perfect for fan zones, festivals, and brand activations",
      "No pool required, deploys anywhere",
    ],
    markets: ["Fan Zones", "Sports Bars", "Retailers", "Wholesalers", "Distributors", "Festivals"],
    revenueAdvantages: [
      "FIFA World Cup 2026, largest sporting event in history",
      "32 national team versions, global demand",
      "Liquor brand activation fees, premium sponsorship rates",
      "Pre-order now, limited production slots available",
    ],
    price: "Enquire for Pricing",
    hasVideo: true,
    hasVR: true,
  },
  {
    id: "long-bar",
    code: "LGB-006",
    name: "The Long Bar",
    tagline: "Scale Service Without Compromising Style",
    category: "Event Bars",
    badge: "HIGH VOLUME",
    badgeStyle: { background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.4)", color: "#38BDF8" },
    image: CDN.worldCupBack,
    slots: 18,
    description: "A self-contained inflatable bar designed to scale service without compromising style. Its extended format supports multiple bartenders working simultaneously, ensuring smooth flow at peak demand. Built with military-grade Drop Stitch for strong structural integrity and a refined, architectural presence.",
    longDescription: "The Long Bar is the workhorse of the Oceanex event range. When you need to serve hundreds of guests simultaneously without sacrificing the premium aesthetic, the Long Bar delivers. Its extended format creates a natural focal point for any event space.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Award, label: "Format", value: "Multi-bartender extended" },
    ],
    features: [
      "Extended format for multiple simultaneous bartenders",
      "Architectural presence, refined and premium",
      "Full-surface UV-printed branding",
      "Military-grade Drop Stitch construction",
      "No pool required, deploys anywhere",
      "Ideal for festivals, beach clubs, and large events",
      "Pairs with DJ Booth for complete event setup",
    ],
    markets: ["Festivals", "Beach Clubs", "Corporate Events", "Sports Events", "Large Private Hire"],
    revenueAdvantages: [
      "High-volume service, maximum F&B revenue per hour",
      "Branded surfaces generate sponsorship income",
      "Multiple bartender format reduces service bottlenecks",
      "Multi-use: bar, sampling booth, merch stand",
    ],
    price: "Enquire for Pricing",
    hasVideo: true,
    hasVR: true,
  },
  {
    id: "halloween-collection",
    code: "HAL-001",
    name: "Halloween Collection",
    tagline: "Seasonal Revenue. Year-Round Business.",
    category: "Themed Bars",
    badge: "SEASONAL",
    badgeStyle: { background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)", color: "#FB923C" },
    image: CDN.djBooth,
    slots: 25,
    description: "The Oceanex Halloween Collection brings the same military-grade Drop Stitch construction and 8-minute deployment to the seasonal events market. Available in 9 themed colourways (HAL 004 to HAL 013), these bars create instant atmosphere for Halloween events, festivals, and brand activations.",
    longDescription: "Seasonal theming is one of the most powerful revenue multipliers in the events industry. The Halloween Collection gives event companies, bars, and retailers a turnkey solution for the fastest-growing seasonal event market in the UK and US.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Globe, label: "Colourways", value: "9 themed options" },
      { icon: Award, label: "Codes", value: "HAL 004 to HAL 013" },
    ],
    features: [
      "9 themed Halloween colourways available",
      "Solid black, solid orange, and carbon black base options",
      "Full UV-printed seasonal graphics",
      "Military-grade Drop Stitch construction",
      "8-minute deployment, no setup crew needed",
      "No pool required, deploys anywhere",
      "Pairs with Christmas Collection for year-round revenue",
    ],
    markets: ["Event Companies", "Bars & Pubs", "Retailers", "Festivals", "Brand Activations"],
    revenueAdvantages: [
      "Seasonal demand premium, peak event season",
      "Pairs with Christmas Collection for year-round rental fleet",
      "Brandable surfaces for liquor brand sponsorship",
      "One asset, multiple seasonal revenue streams",
    ],
    price: "Enquire for Pricing",
    hasVideo: false,
    hasVR: true,
  },
  {
    id: "christmas-collection",
    code: "XMAS-001",
    name: "Christmas Collection",
    tagline: "The Most Wonderful Revenue of the Year",
    category: "Themed Bars",
    badge: "SEASONAL",
    badgeStyle: { background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.4)", color: "#F87171" },
    image: CDN.champagne,
    slots: 22,
    description: "The Oceanex Christmas Collection transforms any space into a festive destination. Available in solid red and solid green base colours with full UV-printed Christmas graphics (XMAS 003 to XMAS 012), these bars create the kind of magical atmosphere that drives premium event hire rates throughout the festive season.",
    longDescription: "Christmas is the single biggest revenue period for the events industry. The Christmas Collection gives rental companies, event planners, and venues a premium, deployable bar solution that commands the highest hire rates of the year.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Globe, label: "Colourways", value: "6 themed options" },
      { icon: Award, label: "Codes", value: "XMAS 003 to XMAS 012" },
    ],
    features: [
      "6 themed Christmas colourways available",
      "Solid red and solid green base options",
      "Full UV-printed festive graphics",
      "Military-grade Drop Stitch construction",
      "8-minute deployment, no setup crew needed",
      "No pool required, deploys anywhere",
      "Pairs with Halloween Collection for year-round revenue",
    ],
    markets: ["Event Companies", "Bars & Pubs", "Shopping Centres", "Corporate Events", "Private Hire"],
    revenueAdvantages: [
      "Premium festive hire rates, peak season",
      "Shopping centre and retail activation opportunities",
      "Pairs with Halloween Collection for year-round fleet",
      "Brandable surfaces for seasonal brand sponsorship",
    ],
    price: "Enquire for Pricing",
    hasVideo: false,
    hasVR: true,
  },
  // ── NEW PRODUCTS FROM TOTEM UPLOADS ─────────────────────────────────────
  {
    id: "cool-port",
    code: "CPT-010",
    name: "Cool Port",
    tagline: "The Inflatable Brandable Hospitality Tent",
    category: "Hospitality Structures",
    badge: "CRUISE READY",
    badgeStyle: { background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.4)", color: "#38BDF8" },
    image: CDN.coolPort1,
    slots: 10,
    description: "An inflatable brandable tent perfect to serve as a support point for clients. Designed for hospitality settings, it installs quickly with no permits or permanent construction. Built with premium Drop Stitch technology for exceptional stability, strength, and commercial durability. Ideal for cruise lines.",
    longDescription: "The Cool Port is Oceanex's answer to the cruise line hospitality challenge. A fully brandable inflatable structure that creates an instant, premium support point for guests at port. No construction permits, no permanent fixtures, just a stunning branded environment that deploys in minutes and packs away just as fast.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Globe, label: "Market", value: "Cruise Lines & Ports" },
    ],
    features: [
      "Fully brandable interior and exterior surfaces",
      "No permits or permanent construction required",
      "Premium Drop Stitch technology, solid and rigid",
      "Ideal for cruise line port support points",
      "UV-printed full-coverage custom branding",
      "Heavy-duty, weather-resistant for repeated commercial use",
      "Includes storage bag; wheeled transport case recommended for local logistics",
    ],
    markets: ["Cruise Lines", "Ports & Marinas", "Luxury Hotels", "Beach Resorts", "Corporate Events"],
    revenueAdvantages: [
      "Premium branded hospitality at every port of call",
      "Sponsorship and brand activation revenue",
      "Portable, moves with the cruise itinerary",
      "No construction costs or permits",
    ],
    price: "Enquire for Pricing",
    hasVideo: false,
    hasVR: false,
  },
  {
    id: "tahiti-pool-bar",
    code: "TPB-011",
    name: "Tahiti Pool Bar",
    tagline: "The Self-Contained Swim-Up Pool Bar",
    category: "Pool Bars",
    badge: "NEW",
    badgeStyle: { background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.4)", color: "#38BDF8" },
    image: CDN.tahitiBar1,
    slots: 12,
    description: "A self-contained inflatable swim-up pool bar that places hospitality directly on the water. Designed for residential and hospitality settings, it installs quickly with no permits or permanent construction. Built with premium Drop Stitch technology for exceptional stability, strength, and commercial durability.",
    longDescription: "The Tahiti Pool Bar brings the spirit of French Polynesia to any pool or beach. Its distinctive rounded form and open-plan swim-up design create an immersive tropical hospitality experience. The dual-branded banner format makes it ideal for resort branding and liquor sponsorship activations.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Globe, label: "Material", value: "Military-grade Drop Stitch" },
    ],
    features: [
      "Rounded swim-up design, distinctive tropical aesthetic",
      "Dual-branded banner format for sponsorship",
      "No permits or permanent construction required",
      "Premium Drop Stitch technology, solid and rigid",
      "UV-printed full-coverage custom branding",
      "Compatible with sea water, lake water, and chlorinated pools",
      "Includes storage bag",
      "Aqua-Zip cleaning system",
    ],
    markets: ["Luxury Resorts", "Beach Clubs", "Hotels", "Private Villas", "Cruise Lines"],
    revenueAdvantages: [
      "2x lift on F&B spend per guest vs standard poolside service",
      "Dual-branded banner format generates sponsorship income",
      "Portable design enables more locations, more days open",
      "Silent, power-free operation reduces costs and boosts profit",
    ],
    price: "Enquire for Pricing",
    hasVideo: false,
    hasVR: false,
  },
  {
    id: "aqua-shack",
    code: "AQS-012",
    name: "Aqua Shack",
    tagline: "Extra Revenue Front. Multiple Possibilities.",
    category: "Kiosks",
    badge: "VERSATILE",
    badgeStyle: { background: "rgba(201,169,97,0.15)", border: "1px solid rgba(201,169,97,0.5)", color: "#C9A961" },
    image: CDN.aquaShack,
    slots: 20,
    description: "The Aqua Shack is an inflatable kiosk designed to generate extra revenue from any beachfront, poolside, or event location. Multiple possibilities, ice cream, beverages, merchandise, food service, and more. Fast to deploy, easy to brand, and built with the same Drop Stitch technology as the full bar range.",
    longDescription: "The Aqua Shack is the most versatile revenue-generating structure in the Oceanex range. Its open-front kiosk design works for any retail or service application, from ice cream and coconut water to merchandise and food service. Deploy it alongside any Oceanex pool bar to create a complete beach or poolside hospitality zone.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Globe, label: "Use Cases", value: "Food, Beverage, Retail" },
    ],
    features: [
      "Open-front kiosk design for any retail or service use",
      "Menu board panels included",
      "Full-surface UV-printed branding",
      "Military-grade Drop Stitch construction",
      "Pairs with any Oceanex pool bar system",
      "No permits or permanent construction required",
      "Includes storage bag for easy transport",
    ],
    markets: ["Beach Clubs", "Resorts", "Festivals", "Sports Events", "Retail Activations"],
    revenueAdvantages: [
      "Extra revenue front alongside existing pool bar",
      "Multiple service types, food, beverage, merchandise",
      "Branded surfaces generate sponsorship income",
      "Low operating cost, one person can run it",
    ],
    price: "Enquire for Pricing",
    hasVideo: false,
    hasVR: false,
  },
  {
    id: "miami-bar",
    code: "MIB-013",
    name: "Miami Bar",
    tagline: "Compact. Powerful. Unmistakably Miami.",
    category: "Event Bars",
    badge: "COMPACT",
    badgeStyle: { background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.4)", color: "#38BDF8" },
    image: CDN.miamiBar,
    slots: 18,
    description: "A compact inflatable bar with the distinctive Miami aesthetic, clean white curves, open-front service design, and full branding capability. Perfect for garden parties, corporate events, brand activations, and anywhere a full-size bar would be impractical. Deploys in 8 minutes.",
    longDescription: "The Miami Bar is the compact powerhouse of the Oceanex event range. Its distinctive rounded white form is immediately recognisable and creates an instant premium atmosphere at any event. The open-front service design allows efficient service for up to 50 guests simultaneously.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Globe, label: "Material", value: "Military-grade Drop Stitch" },
    ],
    features: [
      "Distinctive rounded white Miami aesthetic",
      "Open-front service design for efficient service",
      "Full-surface UV-printed branding",
      "Military-grade Drop Stitch construction",
      "No pool required, deploys anywhere",
      "Ideal for garden parties and corporate events",
      "Includes storage bag for easy transport",
    ],
    markets: ["Corporate Events", "Garden Parties", "Brand Activations", "Weddings", "Private Hire"],
    revenueAdvantages: [
      "Compact format, premium event hire",
      "Brandable surfaces for sponsorship income",
      "Low operating cost, one bartender format",
      "Year-round indoor/outdoor deployment",
    ],
    price: "Enquire for Pricing",
    hasVideo: false,
    hasVR: false,
  },
  {
    id: "american-bar",
    code: "AMB-014",
    name: "American Bar",
    tagline: "Stars, Stripes & Premium Hospitality",
    category: "Themed Bars",
    badge: "USA EDITION",
    badgeStyle: { background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.5)", color: "#F87171" },
    image: CDN.americanBar,
    slots: 15,
    description: "The American Bar brings patriotic flair to any event. Full Stars and Stripes UV-printed branding on a premium Drop Stitch inflatable bar. Perfect for Independence Day events, sports fan zones, American brand activations, and 4th of July celebrations. Deploys in 8 minutes.",
    longDescription: "The American Bar is the definitive patriotic event bar. Its full Stars and Stripes UV-printed exterior creates an instant focal point at any American-themed event. With FIFA World Cup 2026 spanning the USA, Canada, and Mexico, demand for American-themed hospitality infrastructure is at an all-time high.",
    specs: [
      { icon: Clock, label: "Inflation", value: "8 minutes" },
      { icon: Clock, label: "Deflation", value: "12 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Globe, label: "Theme", value: "Full Stars & Stripes" },
    ],
    features: [
      "Full Stars and Stripes UV-printed exterior",
      "Open-front service design",
      "Military-grade Drop Stitch construction",
      "No pool required, deploys anywhere",
      "Perfect for Independence Day and 4th of July events",
      "Ideal for FIFA World Cup 2026 fan zones",
      "Includes storage bag for easy transport",
    ],
    markets: ["Fan Zones", "Sports Bars", "Independence Day Events", "Brand Activations", "Festivals"],
    revenueAdvantages: [
      "Premium themed hire rates for patriotic events",
      "FIFA World Cup 2026, unprecedented demand",
      "Liquor brand activation fees",
      "Year-round American-themed event opportunities",
    ],
    price: "Enquire for Pricing",
    hasVideo: false,
    hasVR: false,
  },
  {
    id: "santorini-plus",
    code: "SPB-015",
    name: "Santorini Plus",
    tagline: "The Expanded Swim-Up Experience",
    category: "Pool Bars",
    badge: "EXPANDED",
    badgeStyle: { background: "rgba(201,169,97,0.15)", border: "1px solid rgba(201,169,97,0.5)", color: "#C9A961" },
    image: CDN.santoriniPlus,
    slots: 8,
    description: "The Santorini Plus is the expanded version of the original Santorini Pool Bar. A larger swim-up pool bar with extended seating zones and enhanced bar capacity. Designed for resorts and hotels that need more capacity without sacrificing the iconic Santorini aesthetic.",
    longDescription: "The Santorini Plus takes everything that made the original Santorini Pool Bar the bestselling product in the Oceanex range and scales it up. More seating, more bar capacity, more revenue. The same iconic whitewashed Santorini aesthetic, but with the footprint to match a full resort pool.",
    specs: [
      { icon: Clock, label: "Inflation", value: "Under 15 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Storage", value: "Includes storage bag" },
      { icon: Zap, label: "Power", value: "Single high-pressure pump" },
      { icon: Globe, label: "Material", value: "Military-grade Drop Stitch" },
      { icon: Award, label: "Capacity", value: "Extended seating zones" },
    ],
    features: [
      "Extended seating zones for higher guest capacity",
      "Enhanced bar capacity for peak service",
      "Iconic Santorini whitewashed aesthetic",
      "No permits or permanent construction required",
      "Premium Drop Stitch technology",
      "UV-printed full-coverage custom branding",
      "Compatible with sea water, lake water, and pools",
      "Aqua-Zip cleaning system",
    ],
    markets: ["Luxury Resorts", "Large Hotels", "Beach Clubs", "Private Islands", "Cruise Lines"],
    revenueAdvantages: [
      "Higher capacity = higher revenue per deployment",
      "Premium resort pricing for expanded format",
      "Brandable surfaces generate sponsorship income",
      "Portable, deploy across multiple resort locations",
    ],
    price: "Enquire for Pricing",
    hasVideo: false,
    hasVR: false,
  },
  {
    id: "mega-resort",
    code: "MGR-016",
    name: "Mega Resort",
    tagline: "The Ultimate Pool Bar Platform",
    category: "Pool Bars",
    badge: "FLAGSHIP",
    badgeStyle: { background: "rgba(201,169,97,0.15)", border: "1px solid rgba(201,169,97,0.5)", color: "#C9A961" },
    image: CDN.megaResort,
    slots: 4,
    description: "The Mega Resort is the largest and most impressive product in the Oceanex collection. A full-scale inflatable pool bar platform designed to anchor entire resort pool zones. Features a central tower bar with surrounding swim-up seating, the ultimate statement piece for any luxury resort.",
    longDescription: "The Mega Resort is in a category of its own. Its central tower bar design with surrounding swim-up seating creates a complete destination that can anchor an entire resort pool zone. When guests see the Mega Resort, they don't just visit the pool, they spend the entire day there.",
    specs: [
      { icon: Clock, label: "Inflation", value: "Under 20 minutes" },
      { icon: Shield, label: "Holds Pressure", value: "Up to 6 days" },
      { icon: Package, label: "Format", value: "Central tower + swim-up ring" },
      { icon: Zap, label: "Power", value: "Multi-pump system" },
      { icon: Globe, label: "Material", value: "Military-grade Drop Stitch" },
      { icon: Award, label: "Capacity", value: "Full resort scale" },
    ],
    features: [
      "Central tower bar design, maximum visual impact",
      "Surrounding swim-up seating ring",
      "Full resort-scale footprint",
      "Multi-pump inflation system",
      "Full-surface UV-printed branding",
      "Aqua-Zip cleaning system",
      "Anchors entire resort pool zones",
      "Drives all-day guest dwell time",
    ],
    markets: ["Mega Resorts", "5-Star Hotels", "Private Islands", "Cruise Lines", "Theme Parks"],
    revenueAdvantages: [
      "Anchors entire pool zones, drives all-day dwell time",
      "Multiple revenue streams: F&B, cabana rental, sponsorship",
      "Statement piece drives resort bookings and social media",
      "Modular format scales revenue with demand",
    ],
    price: "Enquire for Pricing",
    hasVideo: false,
    hasVR: false,
  },
];

const CATEGORIES = ["All", "Pool Bars", "Event Bars", "Themed Bars", "Hospitality Structures", "Kiosks"];

const PROMO_VIDEO_URL = "https://oceanex-group.s3.us-east-2.amazonaws.com/Oceanex+Video+Promo+2026.mp4";

const PRODUCT_VIDEO_URLS: Record<string, string> = {
  "santorini-pool-bar": "https://oceanex-group.s3.us-east-2.amazonaws.com/Santorini+Walk+Through.mp4",
  "bali-spa": "https://oceanex-group.s3.us-east-2.amazonaws.com/Bali+Spa+Walk+through.mp4",
  "champagne-bar": "https://oceanex-group.s3.us-east-2.amazonaws.com/Champagne+Bar+Walk+Through.mp4",
  "bahamas-pool-bar": "https://oceanex-group.s3.us-east-2.amazonaws.com/Miami+PoolBar++Bar+Video+1.mp4",
};

type Product = typeof PRODUCTS[0];
type ModalTab = "overview" | "specs" | "revenue";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [videoModal, setVideoModal] = useState(false);
  const [vrModal, setVrModal] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>("overview");
  const [hovered, setHovered] = useState<string | null>(null);
  const [vrRequestForm, setVrRequestForm] = useState({ name: "", email: "", phone: "" });
  const [vrRequestSubmitting, setVrRequestSubmitting] = useState(false);
  const [vrRequestSubmitted, setVrRequestSubmitted] = useState(false);
  const [vrRequestError, setVrRequestError] = useState("");

  const submitContactMutation = trpc.contact.submit.useMutation();

  const filtered = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const activeVideoUrl = selectedProduct
    ? PRODUCT_VIDEO_URLS[selectedProduct.id] ?? PROMO_VIDEO_URL
    : PROMO_VIDEO_URL;

  const isPromoVideo = selectedProduct
    ? !PRODUCT_VIDEO_URLS[selectedProduct.id]
    : true;

  useEffect(() => {
    if (selectedProduct || videoModal || vrModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProduct, videoModal, vrModal]);

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab("overview");
    setVideoModal(false);
    setVrModal(false);
  };

  const openVrRequest = (product: Product) => {
    setSelectedProduct(product);
    setVrModal(true);
    setVideoModal(false);
    setVrRequestSubmitted(false);
    setVrRequestError("");
    setVrRequestForm({ name: "", email: "", phone: "" });
  };

  const handleVrRequestSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setVrRequestSubmitting(true);
    setVrRequestError("");

    try {
      await submitContactMutation.mutateAsync({
        name: vrRequestForm.name.trim(),
        email: vrRequestForm.email.trim(),
        phone: vrRequestForm.phone.trim() || null,
        company: null,
        enquiryType: "360 Tour Request",
        budget: null,
        message: `360 VR tour requested for ${selectedProduct.name} (${selectedProduct.code}).`,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      });

      setVrRequestSubmitted(true);
    } catch (error) {
      setVrRequestError(error instanceof Error ? error.message : "Failed to submit request. Please try again.");
    } finally {
      setVrRequestSubmitting(false);
    }
  };

  const closeAll = () => {
    setSelectedProduct(null);
    setVideoModal(false);
    setVrModal(false);
  };

  return (
    <div style={{ background: "#FAF8F5", minHeight: "100vh" }}>
      <Navbar />

      {/* PAGE HERO */}
      <section style={{ paddingTop: "9rem", paddingBottom: "5rem", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #2C2416 0%, #3A3020 60%, #2C2416 100%)" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "linear-gradient(rgba(201,169,97,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,97,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "20%", width: "500px", height: "500px", borderRadius: "50%", opacity: 0.08, filter: "blur(120px)", background: "radial-gradient(circle, #C9A961 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A961", marginBottom: "1rem" }}>The Complete Collection</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 8vw, 6rem)", fontWeight: 700, color: "#FAF8F5", lineHeight: 1, marginBottom: "1.5rem" }}>
            Oceanex<br /><span style={{ color: "#C9A961" }}>Products</span>
          </h1>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", color: "rgba(250,248,245,0.65)", maxWidth: "520px", lineHeight: 1.7 }}>
            Nine world-class Drop Stitch structures. Eight minutes to deploy. Unlimited revenue potential. Each product is engineered for commercial performance and built to the highest hospitality standard.
          </p>
        </div>
      </section>

      {/* TECHNOLOGY STRIP */}
      <section style={{ padding: "3.5rem 0", background: "#2C2416", borderBottom: "1px solid rgba(201,169,97,0.15)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem" }}>
            {[
              { icon: Zap, title: "Drop Stitch Technology", desc: "Military-grade woven fibres, solid and rigid, not a bouncy castle." },
              { icon: Clock, title: "8-Minute Inflation", desc: "Single high-pressure pump. Open for business faster than any competitor." },
              { icon: Shield, title: "6-Day Pressure Hold", desc: "No blowers. No continuous power. No noise. Up to 6 days on one inflation." },
              { icon: Package, title: "Aqua-Zip Cleaning", desc: "Proprietary drain system. Lift, unzip, sweep, rinse. Ready in minutes." },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} style={{ textAlign: "center" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", border: "1px solid rgba(201,169,97,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <Icon size={18} style={{ color: "#C9A961" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#FAF8F5", marginBottom: "0.4rem" }}>{f.title}</h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "rgba(250,248,245,0.45)", lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PATENT IP NOTICE */}
      <section style={{ padding: "1.25rem 0", background: "#1a1510", borderBottom: "1px solid rgba(201,169,97,0.2)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#C9A961", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#0e0d0b", fontFamily: "'Montserrat', sans-serif" }}>®</span>
              </div>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A961" }}>IP Protected</span>
            </div>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 300, color: "rgba(250,248,245,0.5)", lineHeight: 1.5 }}>
              All Oceanex product designs, structural systems, and manufacturing processes are protected by internationally registered intellectual property rights. Unauthorised reproduction or manufacture constitutes IP infringement and will be pursued with full legal force.
            </span>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section style={{ padding: "1.5rem 0", position: "sticky", top: "72px", zIndex: 30, background: "rgba(250,248,245,0.96)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(44,36,22,0.08)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(44,36,22,0.35)", marginRight: "0.5rem" }}>Filter:</span>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "0.4rem 1.25rem", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid", transition: "all 0.25s ease", background: activeCategory === cat ? "#2C2416" : "transparent", borderColor: activeCategory === cat ? "#2C2416" : "rgba(44,36,22,0.2)", color: activeCategory === cat ? "#FAF8F5" : "rgba(44,36,22,0.5)", cursor: "pointer" }}>
                {cat}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", color: "rgba(44,36,22,0.3)" }}>{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "2rem" }}>
            {filtered.map((product) => (
              <div key={product.id} onMouseEnter={() => setHovered(product.id)} onMouseLeave={() => setHovered(null)} style={{ background: "white", border: `1px solid ${hovered === product.id ? "rgba(201,169,97,0.4)" : "rgba(44,36,22,0.08)"}`, transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)", transform: hovered === product.id ? "translateY(-4px)" : "none", boxShadow: hovered === product.id ? "0 20px 60px rgba(44,36,22,0.12)" : "0 2px 8px rgba(44,36,22,0.04)", display: "flex", flexDirection: "column" }}>
                {/* Image */}
                <div style={{ position: "relative", height: "280px", overflow: "hidden", background: "#F0EDE6" }}>
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)", transform: hovered === product.id ? "scale(1.05)" : "scale(1)" }} />
                  {/* No bottom gradient — show full product image */}
                  <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.25rem 0.6rem", ...product.badgeStyle }}>{product.badge}</span>
                  </div>
                  <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(44,36,22,0.35)", background: "rgba(255,255,255,0.8)", padding: "0.2rem 0.5rem" }}>{product.code}</span>
                  </div>
                  <div style={{ position: "absolute", bottom: "1rem", right: "1rem", display: "flex", alignItems: "center", gap: "0.35rem", background: "rgba(255,255,255,0.9)", padding: "0.25rem 0.6rem", border: "1px solid rgba(220,38,38,0.2)" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#DC2626", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 600, color: "#DC2626" }}>{product.slots} slots left</span>
                  </div>
                  {/* Hover overlay */}
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "rgba(44,36,22,0.55)", opacity: hovered === product.id ? 1 : 0, transition: "opacity 0.3s ease" }}>
                    {product.hasVideo && (
                      <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); setVideoModal(true); }} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                        <Play size={12} />Video
                      </button>
                    )}
                    {product.hasVR && (
                      <button onClick={(e) => { e.stopPropagation(); openVrRequest(product); }} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: "rgba(201,169,97,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,169,97,0.5)", color: "#C9A961", fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                        <Eye size={12} />360 Tour
                      </button>
                    )}
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.3rem" }}>{product.category}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: "#2C2416", lineHeight: 1.1, marginBottom: "0.3rem" }}>{product.name}</h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", color: "rgba(44,36,22,0.5)", fontStyle: "italic", marginBottom: "0.875rem" }}>{product.tagline}</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", color: "rgba(44,36,22,0.65)", lineHeight: 1.65, marginBottom: "1.25rem", flex: 1 }}>{product.description.substring(0, 155)}...</p>
                  {/* Specs strip */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginBottom: "1.25rem", padding: "0.875rem 0", borderTop: "1px solid rgba(44,36,22,0.06)", borderBottom: "1px solid rgba(44,36,22,0.06)" }}>
                    {[{ val: "8 min", lbl: "Inflation" }, { val: "6 days", lbl: "Pressure" }, { val: "Drop Stitch", lbl: "Technology" }].map((s, i) => (
                      <div key={s.lbl} style={{ textAlign: "center", borderRight: i < 2 ? "1px solid rgba(44,36,22,0.06)" : "none" }}>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 700, color: "#C9A961", lineHeight: 1 }}>{s.val}</p>
                        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", color: "rgba(44,36,22,0.35)", marginTop: "0.2rem" }}>{s.lbl}</p>
                      </div>
                    ))}
                  </div>
                  {/* CTAs */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <button onClick={() => openDetail(product)} style={{ width: "100%", padding: "0.875rem", background: "#2C2416", color: "#FAF8F5", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                      View Full Details<ChevronRight size={13} />
                    </button>
                    <div style={{ display: "grid", gridTemplateColumns: product.hasVideo && product.hasVR ? "1fr 1fr" : "1fr", gap: "0.5rem" }}>
                      {product.hasVideo && (
                        <button onClick={() => { setSelectedProduct(product); setVideoModal(true); }} style={{ padding: "0.6rem", background: "transparent", color: "rgba(44,36,22,0.55)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(44,36,22,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                          <Play size={11} />Watch Video
                        </button>
                      )}
                      {product.hasVR && (
                        <button onClick={() => openVrRequest(product)} style={{ padding: "0.6rem", background: "transparent", color: "#C9A961", fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(201,169,97,0.3)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                          <Eye size={11} />360 VR Tour
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && !videoModal && !vrModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(44,36,22,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2rem 1rem", overflowY: "auto" }} onClick={closeAll}>
          <div style={{ width: "100%", maxWidth: "900px", background: "#FAF8F5", position: "relative", marginTop: "4rem", boxShadow: "0 40px 120px rgba(44,36,22,0.4)" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeAll} style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10, width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(44,36,22,0.08)", border: "1px solid rgba(44,36,22,0.12)", color: "rgba(44,36,22,0.6)", cursor: "pointer" }}>
              <X size={16} />
            </button>
            <div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,5,0.75) 0%, rgba(10,8,5,0.25) 40%, transparent 70%)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "2rem" }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.25rem 0.6rem", marginBottom: "0.75rem", display: "inline-block", ...selectedProduct.badgeStyle }}>{selectedProduct.badge}</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 700, color: "#FAF8F5", lineHeight: 1 }}>{selectedProduct.name}</h2>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", color: "#C9A961", marginTop: "0.3rem" }}>{selectedProduct.tagline}</p>
              </div>
              <div style={{ position: "absolute", bottom: "1.5rem", right: "2rem", display: "flex", gap: "0.75rem" }}>
                {selectedProduct.hasVideo && (
                  <button onClick={() => setVideoModal(true)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                    <Play size={12} />Watch Video
                  </button>
                )}
                {selectedProduct.hasVR && (
                  <button onClick={() => openVrRequest(selectedProduct)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: "rgba(201,169,97,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,169,97,0.5)", color: "#C9A961", fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                    <Eye size={12} />360 VR Tour
                  </button>
                )}
              </div>
            </div>
            <div style={{ borderBottom: "1px solid rgba(44,36,22,0.1)", padding: "0 2rem" }}>
              <div style={{ display: "flex", gap: "2rem" }}>
                {(["overview", "specs", "revenue"] as ModalTab[]).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "1rem 0", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: "none", border: "none", borderBottom: `2px solid ${activeTab === tab ? "#C9A961" : "transparent"}`, color: activeTab === tab ? "#C9A961" : "rgba(44,36,22,0.4)", cursor: "pointer" }}>
                    {tab === "overview" ? "Overview" : tab === "specs" ? "Specifications" : "Revenue Model"}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: "2rem" }}>
              {activeTab === "overview" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  <div>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.88rem", color: "rgba(44,36,22,0.7)", lineHeight: 1.75, marginBottom: "1.5rem" }}>{selectedProduct.longDescription}</p>
                    <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A961", marginBottom: "1rem" }}>Key Features</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {selectedProduct.features.map((f) => (
                        <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", color: "rgba(44,36,22,0.7)" }}>
                          <Check size={14} style={{ color: "#C9A961", marginTop: "2px", flexShrink: 0 }} />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.75rem" }}>Target Markets</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                      {selectedProduct.markets.map((m) => (
                        <span key={m} style={{ padding: "0.3rem 0.7rem", border: "1px solid rgba(44,36,22,0.12)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: "rgba(44,36,22,0.55)" }}>{m}</span>
                      ))}
                    </div>
                    <div style={{ padding: "1.25rem", border: "1px solid rgba(201,169,97,0.25)", background: "rgba(201,169,97,0.04)", marginBottom: "1.5rem" }}>
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(44,36,22,0.4)", marginBottom: "0.4rem" }}>Pricing</p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "#2C2416", lineHeight: 1.4 }}>Available on enquiry. Contact us for a tailored quote based on your requirements.</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <Link href="/contact">
                        <button style={{ width: "100%", padding: "0.875rem", background: "#C9A961", color: "#2C2416", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                          Request a Quote<ArrowRight size={13} />
                        </button>
                      </Link>
                      <Link href="/portals">
                        <button style={{ width: "100%", padding: "0.875rem", background: "transparent", color: "#2C2416", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(44,36,22,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                          Pre-Order Now<ChevronRight size={13} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "specs" && (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    {selectedProduct.specs.map((spec) => {
                      const Icon = spec.icon;
                      return (
                        <div key={spec.label} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid rgba(44,36,22,0.08)" }}>
                          <div style={{ width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,169,97,0.2)", flexShrink: 0 }}>
                            <Icon size={16} style={{ color: "#C9A961" }} />
                          </div>
                          <div>
                            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", color: "rgba(44,36,22,0.4)" }}>{spec.label}</p>
                            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "#2C2416" }}>{spec.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ padding: "1.25rem", border: "1px solid rgba(201,169,97,0.2)", background: "rgba(201,169,97,0.04)" }}>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.5rem" }}>Drop Stitch Technology</p>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", color: "rgba(44,36,22,0.65)", lineHeight: 1.7 }}>All Oceanex products are manufactured using military-grade Drop Stitch technology, thousands of internal fibres woven between two PVC layers create a solid, rigid structure when inflated. The material withstands extreme temperatures (Dubai summer heat to winter cold) and is compatible with sea water, lake water, tap water, and chlorinated pools.</p>
                  </div>
                </div>
              )}
              {activeTab === "revenue" && (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    {selectedProduct.revenueAdvantages.map((adv, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "1rem", border: "1px solid rgba(44,36,22,0.08)" }}>
                        <TrendingUp size={16} style={{ color: "#C9A961", marginTop: "1px", flexShrink: 0 }} />
                        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", color: "rgba(44,36,22,0.7)", lineHeight: 1.55 }}>{adv}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "1.25rem", border: "1px solid rgba(201,169,97,0.2)", background: "rgba(201,169,97,0.04)" }}>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.75rem" }}>Universal Revenue Advantages</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {["Open for business faster, more trading hours per event", "Brandable surfaces generate sponsorship and liquor activation fees", "Portable design enables more locations, more days open", "Silent, power-free operation reduces costs and boosts profit", "Multi-use: bar, sampling booth, merch stand, one asset, multiple revenue streams", "No permits, no construction, no delays, deploy anywhere, anytime"].map((adv, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                          <Star size={11} style={{ color: "#C9A961", marginTop: "3px", flexShrink: 0 }} />
                          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "rgba(44,36,22,0.6)", lineHeight: 1.5 }}>{adv}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {videoModal && selectedProduct && (
        <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(6,14,24,0.97)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }} onClick={() => setVideoModal(false)}>
          <div style={{ width: "100%", maxWidth: "900px", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideoModal(false)} style={{ position: "absolute", top: "-3rem", right: 0, display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: "rgba(250,248,245,0.5)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
              <X size={14} />Close
            </button>
            <div style={{ aspectRatio: "16/9", background: "#060E18", border: "1px solid rgba(201,169,97,0.2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <video
                key={`${selectedProduct.id}-${activeVideoUrl}`}
                src={activeVideoUrl}
                poster={selectedProduct.image}
                controls
                autoPlay
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "contain", background: "#060E18" }}
              >
                Your browser does not support the video tag.
              </video>
              <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", zIndex: 3, padding: "0.28rem 0.55rem", background: "rgba(6,14,24,0.75)", border: "1px solid rgba(201,169,97,0.35)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#C9A961" }}>
                {isPromoVideo ? "Promo Video" : "Product Walkthrough"}
              </div>
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", right: "0.75rem", zIndex: 3, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", padding: "0.45rem 0.6rem", background: "rgba(6,14,24,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <p style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(250,248,245,0.86)" }}>{selectedProduct.name}</p>
                <a href="mailto:hello@oceanex.group" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#C9A961", fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
                  Request Demo<ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 360 VR TOUR MODAL */}
      {vrModal && selectedProduct && (
        <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(6,14,24,0.97)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }} onClick={() => setVrModal(false)}>
          <div style={{ width: "100%", maxWidth: "560px", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVrModal(false)} style={{ position: "absolute", top: "-3rem", right: 0, display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: "rgba(250,248,245,0.5)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
              <X size={14} />Close
            </button>
            <div style={{ background: "#060E18", border: "1px solid rgba(201,169,97,0.28)", position: "relative", overflow: "hidden", padding: "2rem" }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.6rem" }}>360 Virtual Tour Request</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "white", marginBottom: "0.5rem", lineHeight: 1 }}>{selectedProduct.name}</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", color: "rgba(250,248,245,0.58)", lineHeight: 1.6, marginBottom: "1.5rem" }}>Fill in your details and our team will send your 360 tour access details by email.</p>

              {vrRequestSubmitted ? (
                <div style={{ border: "1px solid rgba(34,197,94,0.35)", background: "rgba(34,197,94,0.08)", padding: "1rem" }}>
                  <p style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#86efac" }}>Request sent successfully.</p>
                  <p style={{ margin: "0.4rem 0 0", fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: "rgba(250,248,245,0.75)", lineHeight: 1.6 }}>Our team will contact you shortly on {vrRequestForm.email}.</p>
                </div>
              ) : (
                <form onSubmit={handleVrRequestSubmit}>
                  <div style={{ display: "grid", gap: "0.9rem" }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,248,245,0.6)", marginBottom: "0.35rem" }}>Name *</label>
                      <input
                        type="text"
                        required
                        value={vrRequestForm.name}
                        onChange={(e) => setVrRequestForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        style={{ width: "100%", padding: "0.72rem 0.85rem", border: "1px solid rgba(250,248,245,0.18)", background: "rgba(250,248,245,0.04)", color: "#FAF8F5", fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,248,245,0.6)", marginBottom: "0.35rem" }}>Email *</label>
                      <input
                        type="email"
                        required
                        value={vrRequestForm.email}
                        onChange={(e) => setVrRequestForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="you@example.com"
                        style={{ width: "100%", padding: "0.72rem 0.85rem", border: "1px solid rgba(250,248,245,0.18)", background: "rgba(250,248,245,0.04)", color: "#FAF8F5", fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,248,245,0.6)", marginBottom: "0.35rem" }}>Phone (Optional)</label>
                      <input
                        type="tel"
                        value={vrRequestForm.phone}
                        onChange={(e) => setVrRequestForm((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+44 7xxx xxxxxx"
                        style={{ width: "100%", padding: "0.72rem 0.85rem", border: "1px solid rgba(250,248,245,0.18)", background: "rgba(250,248,245,0.04)", color: "#FAF8F5", fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", outline: "none" }}
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={vrRequestSubmitting} style={{ marginTop: "1.2rem", width: "100%", padding: "0.82rem", background: "#C9A961", color: "#2C2416", fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", border: "none", cursor: "pointer", opacity: vrRequestSubmitting ? 0.72 : 1 }}>
                    {vrRequestSubmitting ? "Sending..." : "Request 360 Tour"}
                  </button>

                  {vrRequestError ? (
                    <p style={{ marginTop: "0.7rem", marginBottom: 0, fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: "#fca5a5", lineHeight: 1.5 }}>{vrRequestError}</p>
                  ) : null}
                </form>
              )}

              <p style={{ marginTop: "1rem", marginBottom: 0, fontFamily: "'Montserrat', sans-serif", fontSize: "0.66rem", color: "rgba(250,248,245,0.42)", lineHeight: 1.55 }}>
                Fields marked with * are required.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM CTA */}
      <section style={{ padding: "6rem 0", background: "#2C2416", textAlign: "center" }}>
        <div className="container">
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A961", marginBottom: "1rem" }}>Ready to Deploy?</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#FAF8F5", lineHeight: 1.05, marginBottom: "1.5rem" }}>
            Limited Only by Your<br /><span style={{ color: "#C9A961" }}>Imagination</span>
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem", color: "rgba(250,248,245,0.55)", maxWidth: "540px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Every Oceanex product is available for pre-order now. Secure your production slot with a 50% deposit. No stock required. No risk. Just revenue.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/portals">
              <button style={{ padding: "1rem 2.5rem", background: "#C9A961", color: "#2C2416", fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Pre-Order Now<ArrowRight size={15} />
              </button>
            </Link>
            <Link href="/contact">
              <button style={{ padding: "1rem 2.5rem", background: "transparent", color: "rgba(250,248,245,0.7)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(250,248,245,0.2)", cursor: "pointer" }}>
                Speak to the Team
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Responsive styles injected via a global style tag in the component
// (CSS classes are defined in index.css; inline overrides for Products-specific grids)
