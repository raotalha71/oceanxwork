/**
 * OCEANEX — WHITE GLOVE AI CHAT AGENT
 * Design: Deep navy luxury, gold accents — matches Oceanex brand
 * Features:
 *   - Multilingual: EN, FR, ES, AR, ZH, DE, IT
 *   - Intelligent FAQ responses for common trade enquiries
 *   - Calendly booking shortcut
 *   - Brochure download shortcuts
 *   - Lead capture (name + email) before handoff
 *   - Smooth entrance/exit animations
 */

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Globe, ChevronDown, Calendar, Download, ArrowRight, Minimize2 } from 'lucide-react';
import { ghlChatLead } from '@/lib/ghl';
import { trpc } from '@/lib/trpc';

// ─── Language definitions ───────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
];

// ─── UI strings per language ─────────────────────────────────────────────────
const UI: Record<string, {
  greeting: string; subgreeting: string; placeholder: string;
  send: string; bookCall: string; downloadBrochure: string;
  quickReplies: string[]; typing: string;
}> = {
  en: {
    greeting: "Hello, I'm Oceana",
    subgreeting: "Oceanex Trade Concierge · Available 24/7",
    placeholder: "Ask me anything about our products…",
    send: "Send",
    bookCall: "Book a Trade Call",
    downloadBrochure: "Download Brochure",
    typing: "Oceana is typing…",
    quickReplies: ["What products do you offer?", "How quickly can it deploy?", "Do you ship worldwide?", "What's the pricing?"],
  },
  fr: {
    greeting: "Bonjour, je suis Oceana",
    subgreeting: "Concierge Commercial Oceanex · Disponible 24h/24",
    placeholder: "Posez-moi vos questions sur nos produits…",
    send: "Envoyer",
    bookCall: "Réserver un appel",
    downloadBrochure: "Télécharger la brochure",
    typing: "Oceana écrit…",
    quickReplies: ["Quels produits proposez-vous ?", "Délai de déploiement ?", "Livraison mondiale ?", "Quels sont les tarifs ?"],
  },
  es: {
    greeting: "Hola, soy Oceana",
    subgreeting: "Concierge Comercial Oceanex · Disponible 24/7",
    placeholder: "Pregúntame sobre nuestros productos…",
    send: "Enviar",
    bookCall: "Reservar una llamada",
    downloadBrochure: "Descargar folleto",
    typing: "Oceana está escribiendo…",
    quickReplies: ["¿Qué productos ofrecen?", "¿Cuánto tarda el despliegue?", "¿Envíos mundiales?", "¿Cuáles son los precios?"],
  },
  ar: {
    greeting: "مرحباً، أنا أوشيانا",
    subgreeting: "كونسيرج تجاري أوشينكس · متاح 24/7",
    placeholder: "اسألني عن منتجاتنا…",
    send: "إرسال",
    bookCall: "احجز مكالمة تجارية",
    downloadBrochure: "تحميل الكتيب",
    typing: "أوشيانا تكتب…",
    quickReplies: ["ما هي منتجاتكم؟", "كم يستغرق النشر؟", "هل تشحنون عالمياً؟", "ما هي الأسعار؟"],
  },
  zh: {
    greeting: "您好，我是 Oceana",
    subgreeting: "Oceanex 贸易礼宾 · 全天候服务",
    placeholder: "请询问我们的产品…",
    send: "发送",
    bookCall: "预约贸易通话",
    downloadBrochure: "下载宣传册",
    typing: "Oceana 正在输入…",
    quickReplies: ["你们有哪些产品？", "部署需要多长时间？", "是否全球发货？", "价格是多少？"],
  },
  de: {
    greeting: "Hallo, ich bin Oceana",
    subgreeting: "Oceanex Handels-Concierge · 24/7 verfügbar",
    placeholder: "Fragen Sie mich zu unseren Produkten…",
    send: "Senden",
    bookCall: "Handelsgespräch buchen",
    downloadBrochure: "Broschüre herunterladen",
    typing: "Oceana schreibt…",
    quickReplies: ["Welche Produkte bieten Sie an?", "Wie schnell ist der Aufbau?", "Weltweiter Versand?", "Was kostet es?"],
  },
  it: {
    greeting: "Ciao, sono Oceana",
    subgreeting: "Concierge Commerciale Oceanex · Disponibile 24/7",
    placeholder: "Chiedimi dei nostri prodotti…",
    send: "Invia",
    bookCall: "Prenota una chiamata",
    downloadBrochure: "Scarica il brochure",
    typing: "Oceana sta scrivendo…",
    quickReplies: ["Quali prodotti offrite?", "Quanto tempo per il deploy?", "Spedizioni mondiali?", "Quali sono i prezzi?"],
  },
};

// ─── Knowledge base (English, used for all languages with translated wrapper) ─
const KB: { patterns: RegExp[]; answer: string; action?: 'calendly' | 'brochure' }[] = [
  {
    patterns: [/product|range|collection|bar|pool|spa|champagne|dj|long bar|santorini|bali|bahamas/i],
    answer: "Our collection includes **8 flagship structures**: the Santorini Pool Bar, Bali Spa, Bahamas Pool Bar, Champagne Bar, DJ Booth, Long Bar, World Cup Event Bar, and Luxury Pavilion. Each is available in custom branded versions. Would you like to book a 30-minute trade briefing to see the full range?",
    action: 'calendly',
  },
  {
    patterns: [/deploy|setup|set up|install|time|minute|quick|fast/i],
    answer: "All Oceanex structures deploy in **8 minutes** with two people — no tools required. Deflation and packing takes approximately 12 minutes. The entire system packs into a single bag the size of a large suitcase.",
  },
  {
    patterns: [/ship|deliver|worldwide|international|country|global/i],
    answer: "Yes — we ship **worldwide**. We work with cruise lines, resorts, and event operators across Europe, the Middle East, Asia-Pacific, and the Americas. Lead time for standard units is 4–6 weeks; custom branded units are 6–8 weeks from artwork approval.",
  },
  {
    patterns: [/price|cost|pricing|how much|quote|budget|invest/i],
    answer: "Pricing varies by model and configuration. Our trade pricing starts from **£8,500** for standard units, with volume pricing available for fleet orders. The best way to get accurate pricing for your specific requirements is a 30-minute trade briefing.",
    action: 'calendly',
  },
  {
    patterns: [/cruise|ship|marine|imo|deck|vessel|fleet/i],
    answer: "Our cruise line range is **IMO fire safety compliant**, deck-load approved (< 0.5 kN/m²), and operational in 8 minutes. We supply cruise lines globally and provide full compliance documentation for procurement teams. Download our Cruise Line brochure for full technical specs.",
    action: 'brochure',
  },
  {
    patterns: [/resort|hotel|pool|beach club|outdoor|hospitality/i],
    answer: "Oceanex structures are the world's leading inflatable hospitality solution for luxury resorts. Operators report **30–45% uplift in F&B spend** per guest during activations. Download our Resort Collection brochure for full details.",
    action: 'brochure',
  },
  {
    patterns: [/brand|custom|logo|colour|color|livery|print/i],
    answer: "Full **custom branding** is available — your colours, logo, and livery printed directly onto the structure. Lead time is 6–8 weeks from artwork approval. There is no minimum order quantity. Book a call to discuss your branding requirements.",
    action: 'calendly',
  },
  {
    patterns: [/weight|store|storage|pack|bag|locker/i],
    answer: "Packed weight is **under 40 kg** — a two-person carry, no crane required. The entire structure fits into a single storage bag approximately the size of a large suitcase, suitable for any standard deck locker or equipment room.",
  },
  {
    patterns: [/power|electric|socket|voltage|generator/i],
    answer: "All Oceanex structures run from a **standard 240V domestic socket**. No generator or special electrical installation is required.",
  },
  {
    patterns: [/weather|wind|outdoor|rain|waterproof|beaufort/i],
    answer: "Our structures are rated for operation in winds up to **Beaufort 5 (38 km/h)**. In higher wind conditions, deflation takes under 15 minutes. All materials are UV-stabilised and weather-resistant.",
  },
  {
    patterns: [/moq|minimum|order|quantity|one unit|single/i],
    answer: "There is **no minimum order quantity**. We supply single units for trial deployments and multi-unit fleet orders. Volume pricing is available for orders of 3+ units.",
  },
  {
    patterns: [/brochure|spec|specification|pdf|download/i],
    answer: "You can download our trade brochures directly from the Press page. We have the Resort Collection, Cruise Line, and Themed 2026 brochures available.",
    action: 'brochure',
  },
  {
    patterns: [/book|call|meeting|demo|briefing|speak|talk|contact|enquir/i],
    answer: "I'd love to connect you with our commercial team. You can book a **30-minute trade briefing** at a time that suits you — we cover compliance documentation, deployment logistics, and pricing in a single call.",
    action: 'calendly',
  },
  {
    patterns: [/hello|hi|hey|good morning|good afternoon|good evening|bonjour|hola|ciao|hallo/i],
    answer: "Hello! Welcome to Oceanex — the world's leading luxury inflatable hospitality structures. I'm here to help with product information, pricing, compliance documentation, and trade enquiries. What can I help you with today?",
  },
];

function getAnswer(input: string): { text: string; action?: 'calendly' | 'brochure' } {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.patterns.some(p => p.test(lower))) {
      return { text: entry.answer, action: entry.action };
    }
  }
  return {
    text: "Thank you for your message. Our commercial team will be in touch within one business day. For an immediate response, you can **book a 30-minute trade call** — we're available now.",
    action: 'calendly',
  };
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  role: 'agent' | 'user';
  text: string;
  action?: 'calendly' | 'brochure';
  ts: Date;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function AIChatAgent() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [lang, setLang] = useState('en');
  const [langOpen, setLangOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadCapturing, setLeadCapturing] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const firstUserMsgRef = useRef<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ui = UI[lang] || UI.en;
  const isRtl = lang === 'ar';

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Stop pulse after 8s
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  // Greet on first open
  const handleOpen = () => {
    setOpen(true);
    setMinimised(false);
    setPulse(false);
    if (!hasOpened) {
      setHasOpened(true);
      setTimeout(() => {
        addAgentMessage(
          lang === 'en'
            ? "Hello! I'm **Oceana**, your Oceanex trade concierge. I can help with product information, pricing, compliance documentation, and booking a trade call. How can I assist you today?"
            : lang === 'fr'
            ? "Bonjour ! Je suis **Oceana**, votre concierge commercial Oceanex. Je peux vous aider avec les informations produits, les tarifs, la documentation de conformité et la réservation d'un appel commercial. Comment puis-je vous aider aujourd'hui ?"
            : lang === 'es'
            ? "¡Hola! Soy **Oceana**, tu concierge comercial de Oceanex. Puedo ayudarte con información de productos, precios, documentación de cumplimiento y reservar una llamada comercial. ¿Cómo puedo ayudarte hoy?"
            : lang === 'ar'
            ? "مرحباً! أنا **أوشيانا**، كونسيرج أوشينكس التجاري. يمكنني مساعدتك في معلومات المنتجات والأسعار ووثائق الامتثال وحجز مكالمة تجارية. كيف يمكنني مساعدتك اليوم؟"
            : lang === 'zh'
            ? "您好！我是 **Oceana**，您的 Oceanex 贸易礼宾。我可以帮助您了解产品信息、定价、合规文件以及预约贸易通话。今天我能为您做什么？"
            : lang === 'de'
            ? "Hallo! Ich bin **Oceana**, Ihr Oceanex Handels-Concierge. Ich helfe Ihnen gerne bei Produktinformationen, Preisen, Compliance-Dokumentation und der Buchung eines Handelsgesprächs. Wie kann ich Ihnen heute helfen?"
            : "Ciao! Sono **Oceana**, la tua concierge commerciale Oceanex. Posso aiutarti con informazioni sui prodotti, prezzi, documentazione di conformità e prenotare una chiamata commerciale. Come posso aiutarti oggi?"
        );
      }, 500);
    }
  };

  const addAgentMessage = (text: string, action?: 'calendly' | 'brochure') => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'agent',
      text,
      action,
      ts: new Date(),
    }]);
  };

  const handleLeadSubmit = async () => {
    if (!leadName.trim() || !leadEmail.trim()) return;
    setLeadSubmitting(true);
    try {
      await ghlChatLead({
        name: leadName.trim(),
        email: leadEmail.trim(),
        language: lang,
        firstMessage: firstUserMsgRef.current,
      });
    } catch { /* fail silently */ }
    setLeadSubmitting(false);
    setLeadCaptured(true);
    setLeadCapturing(false);
    setTimeout(() => {
      addAgentMessage(
        `Thank you, **${leadName.trim().split(' ')[0]}**! I've noted your details. Our team will follow up within one business day. In the meantime, is there anything else I can help you with?`
      );
    }, 400);
  };

  const chatMutation = trpc.oceana.chat.useMutation();

  const sendToLLM = async (userText: string, currentMessages: Message[], count: number) => {
    setTyping(true);
    try {
      const history = currentMessages
        .filter(m => m.id !== 0)
        .map(m => ({ role: m.role === 'user' ? 'user' as const : 'assistant' as const, content: m.text }));
      history.push({ role: 'user', content: userText });

      const result = await chatMutation.mutateAsync({ messages: history, language: lang });
      setTyping(false);

      if (result.leadData && !leadCaptured) {
        setLeadCaptured(true);
        try {
          await ghlChatLead({
            name: result.leadData.name,
            email: result.leadData.email,
            language: lang,
            firstMessage: firstUserMsgRef.current,
          });
        } catch { /* fail silently */ }
      }

      addAgentMessage(result.content);

      if (count === 2 && !leadCaptured && !result.leadData) {
        setTimeout(() => setLeadCapturing(true), 1500);
      }
    } catch {
      setTyping(false);
      const { text, action } = getAnswer(userText);
      addAgentMessage(text, action);
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: trimmed, ts: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);
    if (newCount === 1) firstUserMsgRef.current = trimmed;
    sendToLLM(trimmed, newMessages, newCount);
  };

  const handleQuickReply = (text: string) => {
    const userMsg: Message = { id: Date.now(), role: 'user', text, ts: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);
    if (newCount === 1) firstUserMsgRef.current = text;
    sendToLLM(text, newMessages, newCount);
  };

  const renderText = (text: string) => {
    // Bold markdown **text**
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={handleOpen}
        aria-label="Open chat"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9000,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c9a961 0%, #f0d080 50%, #c9a961 100%)',
          backgroundSize: '200% 200%',
          border: 'none',
          cursor: 'pointer',
          display: open && !minimised ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(201,169,97,0.6)',
          animation: pulse ? 'chatPulse 2s ease-in-out infinite' : 'chatShimmer 4s ease-in-out infinite',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <MessageCircle size={26} style={{ color: '#0a0c14' }} />
        {/* Notification dot */}
        {!hasOpened && (
          <span style={{
            position: 'absolute', top: '4px', right: '4px',
            width: '12px', height: '12px',
            background: '#ef4444', borderRadius: '50%',
            border: '2px solid #0a0c14',
          }} />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 9001,
            width: 'min(420px, calc(100vw - 32px))',
            height: minimised ? '72px' : 'min(620px, calc(100vh - 100px))',
            background: '#040e1e',
            borderRadius: '16px',
            border: '1px solid rgba(201,169,97,0.25)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,97,0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
            animation: 'chatSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px 18px',
            background: 'linear-gradient(135deg, #0d1a2e 0%, #0a0c14 100%)',
            borderBottom: '1px solid rgba(201,169,97,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}>
            {/* Avatar */}
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a961, #f0d080)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: '18px',
            }}>
              🌊
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#e8e4d8' }}>
                {ui.greeting}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.65rem', color: 'rgba(201,169,97,0.8)', letterSpacing: '0.05em' }}>
                {ui.subgreeting}
              </div>
            </div>
            {/* Online indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.6rem', color: '#22c55e', fontWeight: 600 }}>LIVE</span>
            </div>
            {/* Language picker */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{ background: 'none', border: '1px solid rgba(201,169,97,0.3)', borderRadius: '6px', cursor: 'pointer', color: '#c9a961', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem' }}
              >
                <Globe size={12} />
                {LANGUAGES.find(l => l.code === lang)?.flag}
                <ChevronDown size={10} style={{ transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              {langOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '4px',
                  background: '#0d1a2e', border: '1px solid rgba(201,169,97,0.2)',
                  borderRadius: '8px', overflow: 'hidden', zIndex: 10,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  minWidth: '140px',
                }}>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        width: '100%', padding: '8px 14px',
                        background: lang === l.code ? 'rgba(201,169,97,0.15)' : 'transparent',
                        border: 'none', cursor: 'pointer',
                        color: lang === l.code ? '#c9a961' : '#e8e4d8',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '0.78rem', textAlign: 'left',
                      }}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Minimise */}
            <button onClick={() => setMinimised(!minimised)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,228,216,0.5)', padding: '4px', display: 'flex', flexShrink: 0 }}>
              <Minimize2 size={16} />
            </button>
            {/* Close */}
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,228,216,0.5)', padding: '4px', display: 'flex', flexShrink: 0 }}>
              <X size={18} />
            </button>
          </div>

          {!minimised && (
            <>
              {/* Messages */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(201,169,97,0.2) transparent',
              }}>
                {/* Quick replies — shown when no messages yet */}
                {messages.length === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.7rem', color: 'rgba(232,228,216,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Quick questions
                    </div>
                    {ui.quickReplies.map(qr => (
                      <button
                        key={qr}
                        onClick={() => handleQuickReply(qr)}
                        style={{
                          background: 'rgba(201,169,97,0.08)',
                          border: '1px solid rgba(201,169,97,0.2)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          color: '#e8e4d8',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '0.82rem',
                          textAlign: isRtl ? 'right' : 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          transition: 'background 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,97,0.15)'; e.currentTarget.style.borderColor = 'rgba(201,169,97,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,169,97,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,169,97,0.2)'; }}
                      >
                        {qr}
                        <ArrowRight size={14} style={{ color: '#c9a961', flexShrink: 0 }} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Message bubbles */}
                {messages.map(msg => (
                  <div key={msg.id} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.role === 'user' ? (isRtl ? 'flex-start' : 'flex-end') : (isRtl ? 'flex-end' : 'flex-start'),
                    gap: '6px',
                  }}>
                    <div style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user'
                        ? (isRtl ? '16px 4px 16px 16px' : '4px 16px 16px 16px')
                        : (isRtl ? '4px 16px 16px 16px' : '16px 4px 16px 16px'),
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #c9a961, #e8c96a)'
                        : 'rgba(255,255,255,0.06)',
                      color: msg.role === 'user' ? '#0a0c14' : '#e8e4d8',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '0.85rem',
                      lineHeight: 1.55,
                      fontWeight: msg.role === 'user' ? 600 : 400,
                      border: msg.role === 'agent' ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}>
                      {renderText(msg.text)}
                    </div>
                    {/* Action buttons */}
                    {msg.role === 'agent' && msg.action && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingLeft: isRtl ? 0 : '4px', paddingRight: isRtl ? '4px' : 0 }}>
                        {msg.action === 'calendly' && (
                          <a
                            href="https://calendly.com/hello-oceanex/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              padding: '7px 14px',
                              background: 'linear-gradient(135deg, #c9a961, #f0d080)',
                              color: '#0a0c14',
                              borderRadius: '6px',
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontSize: '0.72rem', fontWeight: 800,
                              letterSpacing: '0.08em', textTransform: 'uppercase',
                              textDecoration: 'none',
                              boxShadow: '0 4px 16px rgba(201,169,97,0.4)',
                            }}
                          >
                            <Calendar size={13} />
                            {ui.bookCall}
                          </a>
                        )}
                        {msg.action === 'brochure' && (
                          <a
                            href="/press"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              padding: '7px 14px',
                              background: 'transparent',
                              color: '#c9a961',
                              borderRadius: '6px',
                              border: '1px solid rgba(201,169,97,0.4)',
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontSize: '0.72rem', fontWeight: 700,
                              letterSpacing: '0.08em', textTransform: 'uppercase',
                              textDecoration: 'none',
                            }}
                          >
                            <Download size={13} />
                            {ui.downloadBrochure}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px 4px 16px 16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: '#c9a961',
                          animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }} />
                      ))}
                    </div>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.65rem', color: 'rgba(232,228,216,0.4)' }}>{ui.typing}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Lead capture form — shown after 2nd message */}
              {leadCapturing && (
                <div style={{
                  padding: '16px 14px',
                  borderTop: '1px solid rgba(201,169,97,0.25)',
                  background: 'linear-gradient(180deg, rgba(201,169,97,0.06) 0%, rgba(4,14,30,0.98) 100%)',
                  flexShrink: 0,
                  animation: 'chatSlideIn 0.3s ease both',
                }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.75rem', color: '#c9a961', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.05em' }}>
                    To follow up with you, may I take your details?
                  </p>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={leadName}
                    onChange={e => setLeadName(e.target.value)}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(201,169,97,0.2)',
                      borderRadius: '6px',
                      padding: '9px 12px',
                      color: '#e8e4d8',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '0.82rem',
                      outline: 'none',
                      marginBottom: '8px',
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={leadEmail}
                    onChange={e => setLeadEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLeadSubmit()}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(201,169,97,0.2)',
                      borderRadius: '6px',
                      padding: '9px 12px',
                      color: '#e8e4d8',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '0.82rem',
                      outline: 'none',
                      marginBottom: '10px',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handleLeadSubmit}
                      disabled={!leadName.trim() || !leadEmail.trim() || leadSubmitting}
                      style={{
                        flex: 1,
                        padding: '9px',
                        background: leadName.trim() && leadEmail.trim() ? 'linear-gradient(135deg, #c9a961, #f0d080)' : 'rgba(201,169,97,0.2)',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#0a0c14',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: leadName.trim() && leadEmail.trim() ? 'pointer' : 'default',
                      }}
                    >
                      {leadSubmitting ? 'Sending…' : 'Send Details'}
                    </button>
                    <button
                      onClick={() => { setLeadCapturing(false); setLeadCaptured(true); }}
                      style={{
                        padding: '9px 14px',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        color: 'rgba(232,228,216,0.4)',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                      }}
                    >
                      Skip
                    </button>
                  </div>
                </div>
              )}

              {/* Input bar */}
              <div style={{
                padding: '12px 14px',
                borderTop: '1px solid rgba(201,169,97,0.15)',
                background: '#040e1e',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                flexShrink: 0,
              }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder={ui.placeholder}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(201,169,97,0.2)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#e8e4d8',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.85rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(201,169,97,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(201,169,97,0.2)')}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  style={{
                    width: '40px', height: '40px',
                    borderRadius: '8px',
                    background: input.trim() ? 'linear-gradient(135deg, #c9a961, #f0d080)' : 'rgba(201,169,97,0.15)',
                    border: 'none',
                    cursor: input.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                  }}
                >
                  <Send size={16} style={{ color: input.trim() ? '#0a0c14' : 'rgba(201,169,97,0.4)' }} />
                </button>
              </div>

              {/* Footer */}
              <div style={{
                padding: '8px 14px',
                background: '#040e1e',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.6rem', color: 'rgba(232,228,216,0.25)', letterSpacing: '0.08em' }}>
                  POWERED BY OCEANEX AI · AVAILABLE 24/7
                </span>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(201,169,97,0.6); transform: scale(1); }
          50% { box-shadow: 0 8px 48px rgba(201,169,97,0.9), 0 0 0 8px rgba(201,169,97,0.15); transform: scale(1.04); }
        }
        @keyframes chatShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
