/**
 * OCEANEX OPERATOR DASHBOARD
 * Post-login portal for approved operators and agents.
 * Gated behind a simple session-based login (upgradeable to real auth).
 * Tools: Revenue Calculator, Enquiry Form, Trade Call Booking, Application Status, Resources
 */
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'wouter';
import {
  Calculator, Phone, FileText, BookOpen, User, LogOut,
  TrendingUp, Package, Calendar, MessageSquare, Download,
  ChevronRight, CheckCircle, Clock, AlertCircle, Globe,
  ArrowRight, Zap, Shield, Star
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import RevenueCalculator from '@/components/RevenueCalculator';
import { ghlContactFormSubmit } from '@/lib/ghl';
import { LANGUAGES, type LangCode } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';

// ── Simple session auth ──────────────────────────────────────────────────────
const SESSION_KEY = 'oceanex_operator_session';

interface Session {
  name: string;
  email: string;
  company: string;
  role: 'agent' | 'operator' | 'trade';
  lang: LangCode;
  currency: string;
}

function getSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveSession(s: Session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ── Translations (minimal, for the dashboard itself) ─────────────────────────
const DASH_T: Record<LangCode, Record<string, string>> = {
  en: { welcome: 'Welcome back', subtitle: 'Your Oceanex operator dashboard', calc: 'Revenue Calculator', enquiry: 'Make an Enquiry', call: 'Book a Trade Call', app: 'My Application', resources: 'Resources & Downloads', profile: 'My Profile', signout: 'Sign Out', signin: 'Sign In to Your Dashboard', signin_sub: 'Access your operator tools, revenue calculator, and trade support.', email: 'Email Address', password: 'Password', name: 'Full Name', company: 'Company / Organisation', role: 'Account Type', role_agent: 'Sales Agent', role_operator: 'Resort / Hotel Operator', role_trade: 'Trade / Wholesale Buyer', create: 'Create Account', have_account: 'Already have an account?', no_account: "Don't have an account?", register: 'Register', send: 'Send', product: 'Product of Interest', message: 'Your Message', sent: 'Enquiry sent. We will respond within 24 hours.', call_note: 'Click below to book a 30-minute trade call with our commercial team.', call_btn: 'Book a 30-Minute Trade Call', status_pending: 'Application Under Review', status_approved: 'Application Approved', status_note: 'Our team will contact you within 24–48 hours to discuss next steps.', dl_brochure: 'Product Brochure', dl_spec: 'Technical Spec Sheet', dl_guide: 'Operator Setup Guide', dl_media: 'Media & Brand Assets', lang: 'Language' },
  fr: { welcome: 'Bon retour', subtitle: 'Votre tableau de bord opérateur Oceanex', calc: 'Calculateur de Revenus', enquiry: 'Faire une Demande', call: 'Réserver un Appel', app: 'Ma Candidature', resources: 'Ressources', profile: 'Mon Profil', signout: 'Se Déconnecter', signin: 'Connectez-vous à votre tableau de bord', signin_sub: 'Accédez à vos outils opérateur et au calculateur de revenus.', email: 'Adresse e-mail', password: 'Mot de passe', name: 'Nom complet', company: 'Entreprise', role: 'Type de compte', role_agent: 'Agent commercial', role_operator: 'Opérateur Resort / Hôtel', role_trade: 'Acheteur en gros', create: 'Créer un compte', have_account: 'Vous avez déjà un compte?', no_account: "Pas encore de compte?", register: "S'inscrire", send: 'Envoyer', product: 'Produit souhaité', message: 'Votre message', sent: 'Demande envoyée. Nous répondrons sous 24 heures.', call_note: 'Cliquez ci-dessous pour réserver un appel commercial de 30 minutes.', call_btn: 'Réserver un appel de 30 minutes', status_pending: 'Candidature en cours d\'examen', status_approved: 'Candidature approuvée', status_note: 'Notre équipe vous contactera sous 24 à 48 heures.', dl_brochure: 'Brochure Produit', dl_spec: 'Fiche Technique', dl_guide: 'Guide d\'installation', dl_media: 'Médias & Marque', lang: 'Langue' },
  es: { welcome: 'Bienvenido de nuevo', subtitle: 'Su panel de operador Oceanex', calc: 'Calculadora de Ingresos', enquiry: 'Hacer una Consulta', call: 'Reservar una Llamada', app: 'Mi Solicitud', resources: 'Recursos', profile: 'Mi Perfil', signout: 'Cerrar Sesión', signin: 'Inicie sesión en su panel', signin_sub: 'Acceda a sus herramientas de operador y calculadora de ingresos.', email: 'Correo electrónico', password: 'Contraseña', name: 'Nombre completo', company: 'Empresa', role: 'Tipo de cuenta', role_agent: 'Agente de ventas', role_operator: 'Operador Resort / Hotel', role_trade: 'Comprador mayorista', create: 'Crear cuenta', have_account: '¿Ya tiene una cuenta?', no_account: '¿No tiene una cuenta?', register: 'Registrarse', send: 'Enviar', product: 'Producto de interés', message: 'Su mensaje', sent: 'Consulta enviada. Responderemos en 24 horas.', call_note: 'Haga clic a continuación para reservar una llamada comercial de 30 minutos.', call_btn: 'Reservar una llamada de 30 minutos', status_pending: 'Solicitud en revisión', status_approved: 'Solicitud aprobada', status_note: 'Nuestro equipo se pondrá en contacto con usted en 24 a 48 horas.', dl_brochure: 'Folleto del Producto', dl_spec: 'Ficha Técnica', dl_guide: 'Guía del Operador', dl_media: 'Medios y Marca', lang: 'Idioma' },
  de: { welcome: 'Willkommen zurück', subtitle: 'Ihr Oceanex-Operator-Dashboard', calc: 'Umsatzrechner', enquiry: 'Anfrage Stellen', call: 'Gespräch Buchen', app: 'Meine Bewerbung', resources: 'Ressourcen', profile: 'Mein Profil', signout: 'Abmelden', signin: 'Melden Sie sich an', signin_sub: 'Zugang zu Ihren Operator-Tools und dem Umsatzrechner.', email: 'E-Mail-Adresse', password: 'Passwort', name: 'Vollständiger Name', company: 'Unternehmen', role: 'Kontotyp', role_agent: 'Vertriebsagent', role_operator: 'Resort / Hotel Betreiber', role_trade: 'Großhandelskäufer', create: 'Konto erstellen', have_account: 'Haben Sie bereits ein Konto?', no_account: 'Noch kein Konto?', register: 'Registrieren', send: 'Senden', product: 'Produkt von Interesse', message: 'Ihre Nachricht', sent: 'Anfrage gesendet. Wir antworten innerhalb von 24 Stunden.', call_note: 'Klicken Sie unten, um ein 30-minütiges Handelsgespräch zu buchen.', call_btn: '30-minütiges Gespräch buchen', status_pending: 'Bewerbung wird geprüft', status_approved: 'Bewerbung genehmigt', status_note: 'Unser Team wird sich innerhalb von 24 bis 48 Stunden bei Ihnen melden.', dl_brochure: 'Produktbroschüre', dl_spec: 'Technisches Datenblatt', dl_guide: 'Betreiberleitfaden', dl_media: 'Medien & Marke', lang: 'Sprache' },
  ar: { welcome: 'مرحباً بعودتك', subtitle: 'لوحة تحكم المشغل الخاصة بك', calc: 'حاسبة الإيرادات', enquiry: 'تقديم استفسار', call: 'حجز مكالمة تجارية', app: 'طلبي', resources: 'الموارد', profile: 'ملفي الشخصي', signout: 'تسجيل الخروج', signin: 'سجل الدخول إلى لوحة التحكم', signin_sub: 'الوصول إلى أدوات المشغل وحاسبة الإيرادات.', email: 'البريد الإلكتروني', password: 'كلمة المرور', name: 'الاسم الكامل', company: 'الشركة', role: 'نوع الحساب', role_agent: 'وكيل مبيعات', role_operator: 'مشغل منتجع / فندق', role_trade: 'مشتري بالجملة', create: 'إنشاء حساب', have_account: 'لديك حساب بالفعل؟', no_account: 'ليس لديك حساب؟', register: 'تسجيل', send: 'إرسال', product: 'المنتج المطلوب', message: 'رسالتك', sent: 'تم إرسال الاستفسار. سنرد خلال 24 ساعة.', call_note: 'انقر أدناه لحجز مكالمة تجارية مدتها 30 دقيقة.', call_btn: 'حجز مكالمة 30 دقيقة', status_pending: 'الطلب قيد المراجعة', status_approved: 'تمت الموافقة على الطلب', status_note: 'سيتواصل معك فريقنا خلال 24 إلى 48 ساعة.', dl_brochure: 'كتيب المنتج', dl_spec: 'ورقة المواصفات التقنية', dl_guide: 'دليل المشغل', dl_media: 'الوسائط والعلامة التجارية', lang: 'اللغة' },
  zh: { welcome: '欢迎回来', subtitle: '您的Oceanex运营商仪表板', calc: '收入计算器', enquiry: '提交询价', call: '预约贸易电话', app: '我的申请', resources: '资源', profile: '我的资料', signout: '退出登录', signin: '登录您的仪表板', signin_sub: '访问您的运营商工具和收入计算器。', email: '电子邮件', password: '密码', name: '全名', company: '公司', role: '账户类型', role_agent: '销售代理', role_operator: '度假村/酒店运营商', role_trade: '批发买家', create: '创建账户', have_account: '已有账户？', no_account: '没有账户？', register: '注册', send: '发送', product: '感兴趣的产品', message: '您的留言', sent: '询价已发送。我们将在24小时内回复。', call_note: '点击下方预约30分钟贸易电话。', call_btn: '预约30分钟贸易电话', status_pending: '申请审核中', status_approved: '申请已批准', status_note: '我们的团队将在24至48小时内与您联系。', dl_brochure: '产品手册', dl_spec: '技术规格表', dl_guide: '运营商设置指南', dl_media: '媒体和品牌资产', lang: '语言' },
  pt: { welcome: 'Bem-vindo de volta', subtitle: 'Seu painel de operador Oceanex', calc: 'Calculadora de Receitas', enquiry: 'Fazer uma Consulta', call: 'Agendar uma Chamada', app: 'Minha Candidatura', resources: 'Recursos', profile: 'Meu Perfil', signout: 'Sair', signin: 'Entre no seu painel', signin_sub: 'Acesse suas ferramentas de operador e calculadora de receitas.', email: 'Endereço de e-mail', password: 'Senha', name: 'Nome completo', company: 'Empresa', role: 'Tipo de conta', role_agent: 'Agente de vendas', role_operator: 'Operador de Resort / Hotel', role_trade: 'Comprador atacadista', create: 'Criar conta', have_account: 'Já tem uma conta?', no_account: 'Não tem uma conta?', register: 'Registrar', send: 'Enviar', product: 'Produto de interesse', message: 'Sua mensagem', sent: 'Consulta enviada. Responderemos em 24 horas.', call_note: 'Clique abaixo para agendar uma chamada comercial de 30 minutos.', call_btn: 'Agendar chamada de 30 minutos', status_pending: 'Candidatura em análise', status_approved: 'Candidatura aprovada', status_note: 'Nossa equipe entrará em contato em 24 a 48 horas.', dl_brochure: 'Brochura do Produto', dl_spec: 'Ficha Técnica', dl_guide: 'Guia do Operador', dl_media: 'Mídia e Marca', lang: 'Idioma' },
  it: { welcome: 'Bentornato', subtitle: 'Il tuo pannello operatore Oceanex', calc: 'Calcolatore di Ricavi', enquiry: 'Invia una Richiesta', call: 'Prenota una Chiamata', app: 'La Mia Candidatura', resources: 'Risorse', profile: 'Il Mio Profilo', signout: 'Esci', signin: 'Accedi al tuo pannello', signin_sub: 'Accedi ai tuoi strumenti operatore e al calcolatore di ricavi.', email: 'Indirizzo e-mail', password: 'Password', name: 'Nome completo', company: 'Azienda', role: 'Tipo di account', role_agent: 'Agente di vendita', role_operator: 'Operatore Resort / Hotel', role_trade: 'Acquirente all\'ingrosso', create: 'Crea account', have_account: 'Hai già un account?', no_account: 'Non hai un account?', register: 'Registrati', send: 'Invia', product: 'Prodotto di interesse', message: 'Il tuo messaggio', sent: 'Richiesta inviata. Risponderemo entro 24 ore.', call_note: 'Clicca qui sotto per prenotare una chiamata commerciale di 30 minuti.', call_btn: 'Prenota una chiamata di 30 minuti', status_pending: 'Candidatura in revisione', status_approved: 'Candidatura approvata', status_note: 'Il nostro team ti contatterà entro 24-48 ore.', dl_brochure: 'Brochure del Prodotto', dl_spec: 'Scheda Tecnica', dl_guide: 'Guida dell\'Operatore', dl_media: 'Media e Brand', lang: 'Lingua' },
  ja: { welcome: 'おかえりなさい', subtitle: 'Oceanexオペレーターダッシュボード', calc: '収益計算機', enquiry: 'お問い合わせ', call: 'トレードコールを予約', app: '私の申請', resources: 'リソース', profile: 'プロフィール', signout: 'サインアウト', signin: 'ダッシュボードにサインイン', signin_sub: 'オペレーターツールと収益計算機にアクセスします。', email: 'メールアドレス', password: 'パスワード', name: '氏名', company: '会社名', role: 'アカウントタイプ', role_agent: '営業エージェント', role_operator: 'リゾート/ホテル運営者', role_trade: '卸売バイヤー', create: 'アカウント作成', have_account: 'すでにアカウントをお持ちですか？', no_account: 'アカウントをお持ちでないですか？', register: '登録', send: '送信', product: '関心のある製品', message: 'メッセージ', sent: 'お問い合わせを送信しました。24時間以内に返信します。', call_note: '下のボタンをクリックして30分のトレードコールを予約してください。', call_btn: '30分のトレードコールを予約', status_pending: '申請審査中', status_approved: '申請承認済み', status_note: '24〜48時間以内にチームからご連絡します。', dl_brochure: '製品パンフレット', dl_spec: '技術仕様書', dl_guide: 'オペレーターガイド', dl_media: 'メディア＆ブランド', lang: '言語' },
  ru: { welcome: 'Добро пожаловать', subtitle: 'Панель оператора Oceanex', calc: 'Калькулятор доходов', enquiry: 'Отправить запрос', call: 'Забронировать звонок', app: 'Моя заявка', resources: 'Ресурсы', profile: 'Мой профиль', signout: 'Выйти', signin: 'Войдите в панель управления', signin_sub: 'Доступ к инструментам оператора и калькулятору доходов.', email: 'Адрес электронной почты', password: 'Пароль', name: 'Полное имя', company: 'Компания', role: 'Тип аккаунта', role_agent: 'Торговый агент', role_operator: 'Оператор курорта / отеля', role_trade: 'Оптовый покупатель', create: 'Создать аккаунт', have_account: 'Уже есть аккаунт?', no_account: 'Нет аккаунта?', register: 'Зарегистрироваться', send: 'Отправить', product: 'Интересующий продукт', message: 'Ваше сообщение', sent: 'Запрос отправлен. Мы ответим в течение 24 часов.', call_note: 'Нажмите ниже, чтобы забронировать 30-минутный торговый звонок.', call_btn: 'Забронировать 30-минутный звонок', status_pending: 'Заявка на рассмотрении', status_approved: 'Заявка одобрена', status_note: 'Наша команда свяжется с вами в течение 24–48 часов.', dl_brochure: 'Брошюра продукта', dl_spec: 'Технический паспорт', dl_guide: 'Руководство оператора', dl_media: 'Медиа и бренд', lang: 'Язык' },
};

const PRODUCTS_LIST = [
  'Santorini Pool Bar', 'Bali Spa & Wellness Bar', 'Bahamas Pool Bar',
  'Tahiti Pool Bar', 'Champagne Bar', 'American Bar', 'Miami Bar',
  'DJ Booth & Stage', 'World Cup Event Bar', 'The Long Bar',
  'Mega Resort Bundle', 'Santorini Plus Bundle', 'Multiple Products',
];

const CURRENCY_BY_LANG: Record<LangCode, string> = {
  en: 'GBP', fr: 'EUR', es: 'EUR', de: 'EUR',
  ar: 'AED', zh: 'USD', pt: 'EUR', it: 'EUR',
  ja: 'JPY', ru: 'USD',
};

type Tab = 'calculator' | 'enquiry' | 'call' | 'application' | 'resources' | 'profile';

export default function OperatorDashboard() {
  const { isDark } = useTheme();
  const [, navigate] = useLocation();
  const [session, setSession] = useState<Session | null>(getSession);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  const [lang, setLang] = useState<LangCode>((session?.lang ?? 'en') as LangCode);
  const [calcOpen, setCalcOpen] = useState(false);

  // Auth form
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', company: '', role: 'operator' as Session['role'] });
  const [authError, setAuthError] = useState('');

  // Enquiry form
  const [enquiryForm, setEnquiryForm] = useState({ product: PRODUCTS_LIST[0], message: '' });
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);

  const t = DASH_T[lang] ?? DASH_T.en;
  const gold = '#c9a84c';
  const bg = isDark ? '#0a0a14' : '#f8f6f0';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const text = isDark ? '#e8e6e0' : '#1a1a2e';
  const muted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : '#ffffff';
  const isRTL = lang === 'ar';

  // Detect browser language on first load
  useEffect(() => {
    if (!session) {
      const browserLang = navigator.language.split('-')[0] as LangCode;
      if (DASH_T[browserLang]) setLang(browserLang);
    }
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password) { setAuthError('Please enter your email and password.'); return; }
    const s: Session = {
      name: authForm.name || authForm.email.split('@')[0],
      email: authForm.email,
      company: authForm.company || '',
      role: authForm.role,
      lang,
      currency: CURRENCY_BY_LANG[lang],
    };
    saveSession(s);
    setSession(s);
    setAuthError('');
  };

  const registerMutation = trpc.operator.registerApplication.useMutation();
  const enquiryMutation = trpc.operator.submitEnquiry.useMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.name || !authForm.email || !authForm.company) { setAuthError('Please fill in all required fields.'); return; }
    try {
      await registerMutation.mutateAsync({
        name: authForm.name,
        email: authForm.email,
        company: authForm.company,
        role: authForm.role,
        language: lang,
      });
      await ghlContactFormSubmit({
        name: authForm.name, email: authForm.email,
        phone: '', company: authForm.company,
        message: `New operator registration. Role: ${authForm.role}`,
        enquiryType: 'Operator Portal Registration',
        budget: '',
      }).catch(() => {/* silent */});
    } catch { /* silent */ }
    const s: Session = {
      name: authForm.name, email: authForm.email,
      company: authForm.company, role: authForm.role,
      lang, currency: CURRENCY_BY_LANG[lang],
    };
    saveSession(s);
    setSession(s);
    setAuthError('');
  };

  const handleSignOut = () => { clearSession(); setSession(null); };

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryLoading(true);
    try {
      await enquiryMutation.mutateAsync({
        name: session?.name ?? '',
        email: session?.email ?? '',
        company: session?.company ?? '',
        product: enquiryForm.product,
        message: enquiryForm.message,
        language: lang,
        role: session?.role,
      });
      await ghlContactFormSubmit({
        name: session?.name ?? '', email: session?.email ?? '',
        phone: '', company: session?.company ?? '',
        message: `[Operator Dashboard Enquiry]\nProduct: ${enquiryForm.product}\n\n${enquiryForm.message}`,
        enquiryType: 'Operator Enquiry',
        budget: '',
      }).catch(() => {/* silent */});
    } catch { /* silent */ }
    setEnquiryLoading(false);
    setEnquirySent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.875rem', boxSizing: 'border-box',
    background: inputBg, border: `1px solid ${border}`,
    color: text, fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem',
    outline: 'none', borderRadius: '8px',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: muted, marginBottom: '0.4rem',
  };

  // ── AUTH WALL ──────────────────────────────────────────────────────────────
  if (!session) {
    return (
      <div style={{ background: bg, minHeight: '100vh', color: text, direction: isRTL ? 'rtl' : 'ltr' }}>
        <Navbar />
        <div style={{ paddingTop: '8rem', paddingBottom: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ width: '100%', maxWidth: '460px', padding: '0 1.5rem' }}>
            {/* Language selector */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {LANGUAGES.map(l => (
                <button key={l.code} onClick={() => setLang(l.code)} style={{ padding: '0.3rem 0.6rem', borderRadius: '6px', border: `1px solid ${lang === l.code ? gold : border}`, background: lang === l.code ? `${gold}18` : 'transparent', color: lang === l.code ? gold : muted, fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}>
                  {l.flag} {l.nativeLabel}
                </button>
              ))}
            </div>

            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '16px', padding: '2.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.06em', color: text, lineHeight: 1 }}>OCEANEX</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: gold, marginTop: '0.25rem' }}>OPERATOR PORTAL</div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.82rem', color: muted, marginTop: '1rem', lineHeight: 1.7 }}>{t.signin_sub}</p>
              </div>

              {/* Mode toggle */}
              <div style={{ display: 'flex', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', borderRadius: '8px', padding: '4px', marginBottom: '1.5rem' }}>
                {(['signin', 'register'] as const).map(m => (
                  <button key={m} onClick={() => setAuthMode(m)} style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: 'none', background: authMode === m ? (isDark ? 'rgba(255,255,255,0.1)' : '#ffffff') : 'transparent', color: authMode === m ? text : muted, fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.06em' }}>
                    {m === 'signin' ? t.signin.split(' ')[0] : t.register}
                  </button>
                ))}
              </div>

              <form onSubmit={authMode === 'signin' ? handleSignIn : handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {authMode === 'register' && (
                  <>
                    <div><label style={labelStyle}>{t.name}</label><input type="text" required value={authForm.name} onChange={e => setAuthForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} /></div>
                    <div><label style={labelStyle}>{t.company}</label><input type="text" required value={authForm.company} onChange={e => setAuthForm(p => ({ ...p, company: e.target.value }))} style={inputStyle} /></div>
                    <div>
                      <label style={labelStyle}>{t.role}</label>
                      <select value={authForm.role} onChange={e => setAuthForm(p => ({ ...p, role: e.target.value as Session['role'] }))} style={{ ...inputStyle }}>
                        <option value="operator">{t.role_operator}</option>
                        <option value="agent">{t.role_agent}</option>
                        <option value="trade">{t.role_trade}</option>
                      </select>
                    </div>
                  </>
                )}
                <div><label style={labelStyle}>{t.email}</label><input type="email" required value={authForm.email} onChange={e => setAuthForm(p => ({ ...p, email: e.target.value }))} style={inputStyle} /></div>
                <div><label style={labelStyle}>{t.password}</label><input type="password" required value={authForm.password} onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))} style={inputStyle} /></div>
                {authError && <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', color: '#ef4444', textAlign: 'center' }}>{authError}</p>}
                <button type="submit" style={{ padding: '1rem', background: `linear-gradient(135deg, ${gold}, #e8c96a, ${gold})`, color: '#0a0a14', fontFamily: 'Montserrat, sans-serif', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: `0 4px 20px ${gold}40` }}>
                  {authMode === 'signin' ? t.signin.split(' ')[0] : t.create}
                </button>
              </form>
            </div>

            <p style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', color: muted, marginTop: '1.5rem' }}>
              {authMode === 'signin' ? t.no_account : t.have_account}{' '}
              <button onClick={() => setAuthMode(authMode === 'signin' ? 'register' : 'signin')} style={{ background: 'none', border: 'none', color: gold, cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>
                {authMode === 'signin' ? t.register : t.signin.split(' ')[0]}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  const TABS: { id: Tab; icon: typeof Calculator; label: string }[] = [
    { id: 'calculator', icon: Calculator, label: t.calc },
    { id: 'enquiry', icon: MessageSquare, label: t.enquiry },
    { id: 'call', icon: Phone, label: t.call },
    { id: 'application', icon: FileText, label: t.app },
    { id: 'resources', icon: BookOpen, label: t.resources },
    { id: 'profile', icon: User, label: t.profile },
  ];

  return (
    <div style={{ background: bg, minHeight: '100vh', color: text, direction: isRTL ? 'rtl' : 'ltr' }}>
      <Navbar />

      {/* Dashboard header */}
      <div style={{ paddingTop: '6rem', paddingBottom: '2rem', background: isDark ? 'linear-gradient(180deg, rgba(201,168,76,0.05) 0%, transparent 100%)' : 'linear-gradient(180deg, rgba(201,168,76,0.03) 0%, transparent 100%)' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '0.4rem' }}>OPERATOR PORTAL</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '0.04em', color: text, lineHeight: 1, margin: 0 }}>
              {t.welcome}, {session.name.split(' ')[0]}
            </h1>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.82rem', color: muted, marginTop: '0.4rem' }}>{t.subtitle}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Language switcher */}
            <select value={lang} onChange={e => setLang(e.target.value as LangCode)} style={{ padding: '0.5rem 0.75rem', background: cardBg, border: `1px solid ${border}`, color: text, borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', outline: 'none', fontFamily: 'Montserrat, sans-serif' }}>
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.nativeLabel}</option>)}
            </select>
            <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem', background: 'transparent', border: `1px solid ${border}`, color: muted, borderRadius: '6px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', fontWeight: 600 }}>
              <LogOut size={13} /> {t.signout}
            </button>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div style={{ background: cardBg, borderBottom: `1px solid ${border}`, position: 'sticky', top: '72px', zIndex: 40 }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', overflowX: 'auto', gap: '0' }}>
          {TABS.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 1.25rem', background: 'transparent', border: 'none', borderBottom: activeTab === id ? `2px solid ${gold}` : '2px solid transparent', color: activeTab === id ? gold : muted, fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1rem' }}>

        {/* CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <div>
            <RevenueCalculator isOpen={true} onClose={() => {}} inline={true} defaultCurrency={session.currency} />
          </div>
        )}

        {/* ENQUIRY TAB */}
        {activeTab === 'enquiry' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '0.04em', color: text, marginBottom: '0.5rem' }}>{t.enquiry_title ?? t.enquiry}</h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: muted, marginBottom: '2rem' }}>Our commercial team will respond within 24 hours.</p>
            {enquirySent ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.5rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '10px' }}>
                <CheckCircle size={20} style={{ color: '#22c55e', flexShrink: 0 }} />
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: text, margin: 0 }}>{t.sent}</p>
              </div>
            ) : (
              <form onSubmit={handleEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>{t.product}</label>
                  <select value={enquiryForm.product} onChange={e => setEnquiryForm(p => ({ ...p, product: e.target.value }))} style={{ ...inputStyle }}>
                    {PRODUCTS_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t.message}</label>
                  <textarea required rows={6} value={enquiryForm.message} onChange={e => setEnquiryForm(p => ({ ...p, message: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <button type="submit" disabled={enquiryLoading} style={{ padding: '1rem 2rem', background: gold, color: '#0a0a14', fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer', opacity: enquiryLoading ? 0.7 : 1 }}>
                  {enquiryLoading ? '...' : t.send}
                </button>
              </form>
            )}
          </div>
        )}

        {/* BOOK A CALL TAB */}
        {activeTab === 'call' && (
          <div style={{ maxWidth: '900px' }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '0.04em', color: text, marginBottom: '0.5rem' }}>{t.call}</h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: muted, marginBottom: '2.5rem' }}>{t.call_note}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { icon: Clock, text: '30-minute focused commercial discussion' },
                { icon: Globe, text: 'Available in your timezone — worldwide' },
                { icon: TrendingUp, text: 'Discuss your revenue potential and deployment plan' },
                { icon: Package, text: 'Get exclusive operator pricing and availability' },
              ].map(({ icon: Icon, text: itemText }) => (
                <div key={itemText} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', background: `${gold}18`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} style={{ color: gold }} />
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: text }}>{itemText}</span>
                </div>
              ))}
            </div>
            {/* Inline Calendly embed */}
            <div style={{
              background: cardBg,
              border: `1px solid ${border}`,
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '1rem',
            }}>
              <iframe
                src="https://calendly.com/hello-oceanex/30min?embed_domain=oceanex.group&embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1"
                width="100%"
                height="700"
                frameBorder="0"
                title="Book a Trade Call with Oceanex"
                style={{ display: 'block', border: 'none' }}
              />
            </div>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: muted }}>
              If the calendar does not load,{' '}
              <a href="https://calendly.com/hello-oceanex/30min" target="_blank" rel="noopener noreferrer" style={{ color: gold, textDecoration: 'underline' }}>click here to book directly</a>.
            </p>
            <style>{`@keyframes goldPulse { 0%,100% { box-shadow: 0 6px 28px ${gold}50; } 50% { box-shadow: 0 10px 40px ${gold}80; } }`}</style>
          </div>
        )}

        {/* APPLICATION STATUS TAB */}
        {activeTab === 'application' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '0.04em', color: text, marginBottom: '2rem' }}>{t.app}</h2>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(251,191,36,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={18} style={{ color: '#fbbf24' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fbbf24' }}>STATUS</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', letterSpacing: '0.04em', color: text }}>{t.status_pending}</div>
                </div>
              </div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.82rem', color: muted, lineHeight: 1.7, margin: 0 }}>{t.status_note}</p>
            </div>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, marginBottom: '1rem' }}>YOUR DETAILS</div>
              {[
                { label: 'Name', value: session.name },
                { label: 'Email', value: session.email },
                { label: 'Company', value: session.company || 'Not provided' },
                { label: 'Account Type', value: session.role.charAt(0).toUpperCase() + session.role.slice(1) },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', color: muted }}>{label}</span>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', color: text, fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <button onClick={() => setActiveTab('call')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', background: gold, color: '#0a0a14', fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                <Phone size={14} /> Accelerate My Application
              </button>
            </div>
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeTab === 'resources' && (
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '0.04em', color: text, marginBottom: '0.5rem' }}>{t.resources}</h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: muted, marginBottom: '2rem' }}>Download product materials and brand assets. Full access granted upon approval.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {[
                { icon: BookOpen, label: 'Resort Collection 2025–2026', desc: 'Full resort product range with specifications and deployment examples', locked: false, url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/OCEANEXRESORTCOLLECTION2025-2026(1)_002ec483.pdf' },
                { icon: BookOpen, label: 'Cruise Line Brochure', desc: 'Dedicated cruise industry product guide with compliance and procurement details', locked: false, url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/CruiseLineBrochure_1598d880.pdf' },
                { icon: BookOpen, label: 'Themed Collection 2026', desc: 'Halloween, Christmas, and seasonal themed inflatable structures', locked: false, url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/OceanexThemedBrochure2026_b288b4c1.pdf' },
                { icon: FileText, label: t.dl_spec, desc: 'Technical drawings, dimensions, and materials', locked: true, url: '' },
                { icon: Star, label: t.dl_media, desc: 'High-resolution images and brand guidelines', locked: true, url: '' },
                { icon: Calculator, label: 'Revenue Projection Template', desc: 'Excel template for your own projections', locked: true, url: '' },
                { icon: Shield, label: 'Patent Documentation', desc: 'UK, EU, and PCT patent reference numbers', locked: true, url: '' },
              ].map(({ icon: Icon, label, desc, locked, url }) => (
                <div key={label} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ width: '40px', height: '40px', background: locked ? isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' : `${gold}18`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} style={{ color: locked ? muted : gold }} />
                    </div>
                    {locked && <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.25rem 0.6rem', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', borderRadius: '9999px' }}><Shield size={10} style={{ color: muted }} /><span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', color: muted }}>APPROVED ONLY</span></div>}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.82rem', fontWeight: 700, color: locked ? muted : text, marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', color: muted, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                  {locked ? (
                    <button onClick={() => setActiveTab('call')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 0.875rem', background: 'transparent', border: `1px solid ${border}`, color: muted, borderRadius: '6px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                      <Phone size={11} /> Book a Call to Unlock
                    </button>
                  ) : url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 0.875rem', background: `${gold}18`, border: `1px solid ${gold}40`, color: gold, borderRadius: '6px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textDecoration: 'none' }}>
                      <Download size={11} /> Download Brochure
                    </a>
                  ) : (
                    <button onClick={() => setActiveTab('enquiry')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 0.875rem', background: `${gold}18`, border: `1px solid ${gold}40`, color: gold, borderRadius: '6px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                      <Download size={11} /> Request via Enquiry
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '0.04em', color: text, marginBottom: '2rem' }}>{t.profile}</h2>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '56px', height: '56px', background: `${gold}20`, border: `2px solid ${gold}40`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: gold }}>{session.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', fontWeight: 700, color: text }}>{session.name}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', color: muted }}>{session.email}</div>
                </div>
              </div>
              {[
                { label: 'Company', value: session.company || 'Not provided' },
                { label: 'Account Type', value: session.role.charAt(0).toUpperCase() + session.role.slice(1) },
                { label: 'Currency', value: session.currency },
                { label: 'Language', value: LANGUAGES.find(l => l.code === lang)?.nativeLabel ?? 'English' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', color: muted }}>{label}</span>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.78rem', color: text, fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
            <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', background: 'transparent', border: `1px solid ${border}`, color: muted, borderRadius: '8px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', fontWeight: 700 }}>
              <LogOut size={14} /> {t.signout}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
