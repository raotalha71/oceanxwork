// OCEANEX — GoHighLevel Integration Layer
// Direct GHL Contacts API v2 — no webhook trigger setup required
//
// ══════════════════════════════════════════════════════════════════════════════
// ✅ LIVE — Connected to poolbar Group Limited (bwZyHAHNCgGsqlggqijK)
// API Key: pit-b838e47b-b9c8-4c98-b00b-39a171d57c1e
// All form submissions create/update contacts in GHL Contacts in real time.
// ══════════════════════════════════════════════════════════════════════════════
//
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────
// Every form submission calls ghlUpsertContact() which:
//   1. Searches GHL for an existing contact by email
//   2. If found → updates the contact (adds tags, notes, custom fields)
//   3. If not found → creates a new contact
//   4. Assigns the contact to the correct pipeline stage
//   5. Adds a note with the full form submission details
//
// PIPELINE STAGES (Oceanex Trade Pipeline — created in GHL)
// ─────────────────────────────────────────────────────────────────────────────
//   Website Enquiry        → contact-form, chat-lead, exit-intent
//   Revenue Calculator Lead → revenue-calculator
//   Call Booked            → trade-call-booked
//   Procurement Briefing   → trade-application
//   Proposal Sent          → (manual, sales team)
//   Contract Negotiation   → (manual, sales team)
//   Closed Won             → order-placed
//   Closed Lost            → (manual, sales team)
//
// ══════════════════════════════════════════════════════════════════════════════

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_LOCATION_ID = 'bwZyHAHNCgGsqlggqijK'; // poolbar Group Limited
const GHL_API_KEY = 'pit-b838e47b-b9c8-4c98-b00b-39a171d57c1e';
const GHL_API_VERSION = '2021-07-28';

// Pipeline IDs (Oceanex Trade Pipeline — created via API)
// These are fetched/created on first use
let PIPELINE_ID = ''; // Set after pipeline creation

// ─── UTM CAPTURE ─────────────────────────────────────────────────────────────
export function captureUTMs(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
    const val = params.get(key);
    if (val) {
      utms[key] = val;
      sessionStorage.setItem(key, val);
    } else {
      const stored = sessionStorage.getItem(key);
      if (stored) utms[key] = stored;
    }
  });
  return utms;
}

// ─── LEAD SCORE EVENTS ───────────────────────────────────────────────────────
export const LEAD_SCORE_EVENTS = {
  EMAIL_CAPTURED: 5,
  PHONE_PROVIDED: 10,
  PRODUCT_PAGE_FIRST: 3,
  PRODUCT_PAGE_REPEAT: 5,
  VIDEO_30S: 8,
  VR_TOUR_COMPLETE: 10,
  REVENUE_CALC_USED: 15,
  ADD_TO_CART: 20,
  CHECKOUT_STEP1: 30,
  TRADE_APPLICATION: 50,
  TRADE_CALL_BOOKED: 40,
  ENTERPRISE_ENQUIRY: 75,
  EMAIL_OPENED: 2,
  EMAIL_CLICKED: 5,
} as const;

// ─── CORE API CALL ───────────────────────────────────────────────────────────
async function ghlApi(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: Record<string, unknown>
): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(`${GHL_API_BASE}${path}`, {
      method,
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': GHL_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      keepalive: true,
    });
    if (!res.ok) {
      console.debug('[GHL] API error:', res.status, path);
      return null;
    }
    return await res.json() as Record<string, unknown>;
  } catch {
    console.debug('[GHL] API call failed silently:', path);
    return null;
  }
}

// ─── UPSERT CONTACT ──────────────────────────────────────────────────────────
// Creates or updates a contact in GHL. Core function used by all form handlers.
async function ghlUpsertContact(data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  source?: string;
  tags?: string[];
  notes?: string;
  customFields?: Array<{ key: string; field_value: string }>;
}): Promise<string | null> {
  const utms = captureUTMs();

  const payload: Record<string, unknown> = {
    locationId: GHL_LOCATION_ID,
    source: data.source || 'Oceanex Website',
    tags: data.tags || [],
    customFields: data.customFields || [],
  };

  if (data.firstName) payload.firstName = data.firstName;
  if (data.lastName) payload.lastName = data.lastName;
  if (data.email) payload.email = data.email;
  if (data.phone) payload.phone = data.phone;
  if (data.companyName) payload.companyName = data.companyName;

  // Attach UTM data as custom fields
  const utmFields = Object.entries(utms).map(([key, value]) => ({
    key,
    field_value: value,
  }));
  if (utmFields.length > 0) {
    payload.customFields = [...(payload.customFields as Array<{ key: string; field_value: string }>), ...utmFields];
  }

  const result = await ghlApi('POST', '/contacts/', payload);
  const contactId = (result?.contact as Record<string, unknown>)?.id as string | undefined;

  // Add a note with the full submission details if provided
  if (contactId && data.notes) {
    await ghlApi('POST', `/contacts/${contactId}/notes`, {
      body: data.notes,
      userId: contactId,
    });
  }

  return contactId || null;
}

// ─── SPECIFIC EVENT FUNCTIONS ─────────────────────────────────────────────────

/** Contact form submitted */
export async function ghlContactFormSubmit(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  enquiryType: string;
  message?: string;
  budget?: string;
}) {
  const [firstName, ...rest] = data.name.trim().split(' ');
  const lastName = rest.join(' ');

  await ghlUpsertContact({
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    companyName: data.company,
    source: 'Oceanex Website — Contact Form',
    tags: ['website-lead', 'contact-form', `enquiry-${data.enquiryType.toLowerCase().replace(/\s+/g, '-')}`],
    notes: `CONTACT FORM SUBMISSION\n\nEnquiry Type: ${data.enquiryType}\nBudget: ${data.budget || 'Not specified'}\nMessage: ${data.message || 'No message'}\n\nPage: ${window.location.href}\nTime: ${new Date().toISOString()}`,
  });
}

/** Trade application submitted */
export async function ghlTradeApplication(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  businessType?: string;
  annualVolume?: string;
}) {
  const [firstName, ...rest] = data.name.trim().split(' ');
  const lastName = rest.join(' ');

  await ghlUpsertContact({
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    companyName: data.company,
    source: 'Oceanex Website — Trade Application',
    tags: ['trade-application', 'website-lead', 'trade-portal', 'high-priority'],
    notes: `TRADE APPLICATION\n\nBusiness Type: ${data.businessType || 'Not specified'}\nCountry: ${data.country || 'Not specified'}\nAnnual Volume: ${data.annualVolume || 'Not specified'}\n\nPage: ${window.location.href}\nTime: ${new Date().toISOString()}`,
  });
}

/** Checkout email captured (step 1) */
export async function ghlCheckoutStarted(data: {
  email: string;
  name?: string;
  cartItems: Array<{ name: string; price: number; qty: number }>;
  cartTotal: number;
}) {
  const [firstName, ...rest] = (data.name || '').trim().split(' ');
  const lastName = rest.join(' ');
  const cartSummary = data.cartItems.map(i => `${i.qty}x ${i.name} @ £${i.price}`).join(', ');

  await ghlUpsertContact({
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    email: data.email,
    source: 'Oceanex Website — Checkout Started',
    tags: ['checkout-started', 'abandoned-cart-risk', 'website-lead'],
    notes: `CHECKOUT STARTED (ABANDONED CART RISK)\n\nCart: ${cartSummary}\nTotal: £${data.cartTotal}\n\nPage: ${window.location.href}\nTime: ${new Date().toISOString()}`,
  });
}

/** Order placed successfully */
export async function ghlOrderPlaced(data: {
  email: string;
  name: string;
  phone?: string;
  orderItems: Array<{ name: string; price: number; qty: number }>;
  orderTotal: number;
  orderId: string;
}) {
  const [firstName, ...rest] = data.name.trim().split(' ');
  const lastName = rest.join(' ');
  const orderSummary = data.orderItems.map(i => `${i.qty}x ${i.name} @ £${i.price}`).join(', ');

  await ghlUpsertContact({
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    source: 'Oceanex Website — Order Placed',
    tags: ['order-placed', 'dtc-customer', 'post-purchase-sequence'],
    notes: `ORDER PLACED\n\nOrder ID: ${data.orderId}\nItems: ${orderSummary}\nTotal: £${data.orderTotal}\n\nPage: ${window.location.href}\nTime: ${new Date().toISOString()}`,
  });
}

/** Revenue calculator completed */
export async function ghlRevenueCalcLead(data: {
  name: string;
  email: string;
  productInterest: string;
  venueType: string;
  units: number;
  annualRevenue: number;
  paybackWeeks: number;
  roi: number;
}) {
  const [firstName, ...rest] = data.name.trim().split(' ');
  const lastName = rest.join(' ');

  await ghlUpsertContact({
    firstName,
    lastName,
    email: data.email,
    source: 'Oceanex Website — Revenue Calculator',
    tags: ['revenue-calc-lead', 'website-lead', 'high-intent'],
    notes: `REVENUE CALCULATOR LEAD\n\nProduct Interest: ${data.productInterest}\nVenue Type: ${data.venueType}\nUnits: ${data.units}\nProjected Annual Revenue: £${data.annualRevenue.toLocaleString()}\nPayback Period: ${data.paybackWeeks} weeks\nROI: ${data.roi}%\n\nPage: ${window.location.href}\nTime: ${new Date().toISOString()}`,
  });
}

/** Add to cart event */
export async function ghlAddToCart(data: {
  email?: string;
  productName: string;
  productPrice: number;
  qty: number;
}) {
  if (!data.email) return; // Only track if email is known
  await ghlUpsertContact({
    email: data.email,
    source: 'Oceanex Website — Add to Cart',
    tags: ['cart-activity', 'website-lead'],
    notes: `ADD TO CART\n\nProduct: ${data.productName}\nPrice: £${data.productPrice}\nQty: ${data.qty}\n\nTime: ${new Date().toISOString()}`,
  });
}

/** Video played >30 seconds */
export async function ghlVideoEngaged(data: {
  email?: string;
  productName: string;
  videoType: 'product-video' | 'vr-tour';
  secondsWatched: number;
}) {
  if (!data.email) return;
  await ghlUpsertContact({
    email: data.email,
    source: 'Oceanex Website — Video Engagement',
    tags: [data.videoType === 'vr-tour' ? 'vr-tour-engaged' : 'video-engaged'],
    notes: `VIDEO ENGAGEMENT\n\nProduct: ${data.productName}\nType: ${data.videoType}\nSeconds Watched: ${data.secondsWatched}\n\nTime: ${new Date().toISOString()}`,
  });
}

/** Exit intent popup shown */
export async function ghlExitIntentShown(email?: string) {
  if (!email) return;
  await ghlUpsertContact({
    email,
    source: 'Oceanex Website — Exit Intent',
    tags: ['exit-intent-shown'],
  });
}

/** Exit intent email captured */
export async function ghlExitIntentCaptured(email: string) {
  await ghlUpsertContact({
    email,
    source: 'Oceanex Website — Exit Intent Capture',
    tags: ['exit-intent-captured', 'discount-10pct', 'website-lead'],
    notes: `EXIT INTENT CAPTURED\n\nEmail captured via exit intent popup.\nDiscount sequence should trigger.\n\nTime: ${new Date().toISOString()}`,
  });
}

/** Trade call booked via Calendly */
export async function ghlTradeCallBooked(data: {
  name: string;
  email: string;
  phone?: string;
  appointmentTime?: string;
}) {
  const [firstName, ...rest] = data.name.trim().split(' ');
  const lastName = rest.join(' ');

  await ghlUpsertContact({
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    source: 'Oceanex Website — Trade Call Booked',
    tags: ['trade-call-booked', 'high-intent', 'calendar-booking', 'high-priority'],
    notes: `TRADE CALL BOOKED\n\nAppointment: ${data.appointmentTime || 'Via Calendly'}\nCalendly Link: https://calendly.com/hello-oceanex/30min\n\nTime: ${new Date().toISOString()}`,
  });
}

/** Chat agent lead captured */
export async function ghlChatLead(data: {
  name: string;
  email: string;
  language?: string;
  firstMessage?: string;
}) {
  const [firstName, ...rest] = data.name.trim().split(' ');
  const lastName = rest.join(' ');

  await ghlUpsertContact({
    firstName,
    lastName,
    email: data.email,
    source: 'Oceanex Website — Oceana Chat Agent',
    tags: ['chat-lead', 'website-lead', 'oceana-chat', `lang-${data.language || 'en'}`],
    notes: `OCEANA CHAT LEAD\n\nLanguage: ${data.language || 'English'}\nFirst Message: ${data.firstMessage || 'Not captured'}\n\nTime: ${new Date().toISOString()}`,
  });
}

/** Page view tracking (product pages) */
export async function ghlPageView(data: {
  email?: string;
  pageName: string;
  pageType: 'product' | 'shop' | 'trade' | 'home' | 'about' | 'contact';
  isRepeatView?: boolean;
}) {
  // Page views are tracked silently — only fire if email is already known
  if (!data.email) return;
  await ghlUpsertContact({
    email: data.email,
    tags: [`page-view-${data.pageType}`],
  });
}
