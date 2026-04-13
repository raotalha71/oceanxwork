/**
 * OCEANEX LANGUAGE CONTEXT
 * IP-based language detection with manual override.
 * Supported: EN, FR, ES, DE, AR, ZH, PT, IT, JA, RU
 */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type LangCode = "en" | "fr" | "es" | "de" | "ar" | "zh" | "pt" | "it" | "ja" | "ru";

export interface LangOption {
  code: LangCode;
  label: string;
  nativeLabel: string;
  flag: string;
  rtl?: boolean;
}

export const LANGUAGES: LangOption[] = [
  { code: "en", label: "English",    nativeLabel: "English",    flag: "🇬🇧" },
  { code: "fr", label: "French",     nativeLabel: "Français",   flag: "🇫🇷" },
  { code: "es", label: "Spanish",    nativeLabel: "Español",    flag: "🇪🇸" },
  { code: "de", label: "German",     nativeLabel: "Deutsch",    flag: "🇩🇪" },
  { code: "ar", label: "Arabic",     nativeLabel: "العربية",    flag: "🇦🇪", rtl: true },
  { code: "zh", label: "Chinese",    nativeLabel: "中文",        flag: "🇨🇳" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português",  flag: "🇧🇷" },
  { code: "it", label: "Italian",    nativeLabel: "Italiano",   flag: "🇮🇹" },
  { code: "ja", label: "Japanese",   nativeLabel: "日本語",      flag: "🇯🇵" },
  { code: "ru", label: "Russian",    nativeLabel: "Русский",    flag: "🇷🇺" },
];

// Country code → language mapping for IP-based detection
const COUNTRY_LANG: Record<string, LangCode> = {
  GB: "en", US: "en", AU: "en", CA: "en", NZ: "en", IE: "en", ZA: "en",
  FR: "fr", BE: "fr", CH: "fr", LU: "fr", MC: "fr",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  DE: "de", AT: "de",
  AE: "ar", SA: "ar", QA: "ar", KW: "ar", BH: "ar", OM: "ar", EG: "ar", JO: "ar",
  CN: "zh", TW: "zh", HK: "zh", SG: "zh",
  BR: "pt", PT: "pt",
  IT: "it",
  JP: "ja",
  RU: "ru", BY: "ru", KZ: "ru",
};

// Core UI translations — expand as needed
export type TranslationKey =
  | "nav_products" | "nav_shop" | "nav_blog" | "nav_about" | "nav_contact"
  | "nav_portals" | "nav_virtual_tours" | "nav_how_it_works"
  | "hero_cta_primary" | "hero_cta_secondary"
  | "book_a_call" | "enquire_now" | "learn_more" | "view_products"
  | "contact_us" | "apply_now" | "sign_in" | "sign_out"
  | "calculator_title" | "calculator_subtitle"
  | "calculator_daily_rate" | "calculator_activations" | "calculator_units"
  | "calculator_daily_revenue" | "calculator_monthly_revenue"
  | "calculator_annual_revenue" | "calculator_per_unit_month"
  | "calc_1x" | "calc_2x"
  | "dashboard_welcome" | "dashboard_subtitle"
  | "dashboard_enquiry" | "dashboard_book_call" | "dashboard_application"
  | "dashboard_calculator" | "dashboard_resources" | "dashboard_profile"
  | "enquiry_title" | "enquiry_product" | "enquiry_message" | "enquiry_send"
  | "footer_patent" | "footer_rights";

type Translations = Record<TranslationKey, string>;

const T: Record<LangCode, Translations> = {
  en: {
    nav_products: "Products", nav_shop: "Shop", nav_blog: "Journal",
    nav_about: "About", nav_contact: "Contact", nav_portals: "Portals",
    nav_virtual_tours: "Virtual Tours", nav_how_it_works: "How It Works",
    hero_cta_primary: "Explore the Collection", hero_cta_secondary: "Book a Trade Call",
    book_a_call: "Book a Trade Call", enquire_now: "Enquire Now",
    learn_more: "Learn More", view_products: "View Products",
    contact_us: "Contact Us", apply_now: "Apply Now",
    sign_in: "Sign In", sign_out: "Sign Out",
    calculator_title: "See Your Revenue Potential",
    calculator_subtitle: "Discover how an Oceanex structure generates new income from under-utilised spaces.",
    calculator_daily_rate: "Your daily activation rate",
    calculator_activations: "Activations per day",
    calculator_units: "Number of units",
    calculator_daily_revenue: "Daily Revenue",
    calculator_monthly_revenue: "Monthly Revenue",
    calculator_annual_revenue: "Annual Revenue",
    calculator_per_unit_month: "Per Unit / Month",
    calc_1x: "1× Per Day", calc_2x: "2× Per Day",
    dashboard_welcome: "Welcome back",
    dashboard_subtitle: "Your Oceanex operator dashboard. Everything you need to grow your business.",
    dashboard_enquiry: "Make an Enquiry",
    dashboard_book_call: "Book a Trade Call",
    dashboard_application: "My Application",
    dashboard_calculator: "Revenue Calculator",
    dashboard_resources: "Resources",
    dashboard_profile: "My Profile",
    enquiry_title: "Submit an Enquiry",
    enquiry_product: "Product of Interest",
    enquiry_message: "Your Message",
    enquiry_send: "Send Enquiry",
    footer_patent: "All Oceanex products are protected by internationally registered intellectual property rights.",
    footer_rights: "All rights reserved.",
  },
  fr: {
    nav_products: "Produits", nav_shop: "Boutique", nav_blog: "Journal",
    nav_about: "À propos", nav_contact: "Contact", nav_portals: "Portails",
    nav_virtual_tours: "Visites Virtuelles", nav_how_it_works: "Comment ça marche",
    hero_cta_primary: "Explorer la Collection", hero_cta_secondary: "Réserver un Appel",
    book_a_call: "Réserver un Appel Commercial", enquire_now: "Demander un Devis",
    learn_more: "En Savoir Plus", view_products: "Voir les Produits",
    contact_us: "Nous Contacter", apply_now: "Postuler",
    sign_in: "Se Connecter", sign_out: "Se Déconnecter",
    calculator_title: "Découvrez Votre Potentiel de Revenus",
    calculator_subtitle: "Découvrez comment une structure Oceanex génère de nouveaux revenus.",
    calculator_daily_rate: "Votre tarif journalier",
    calculator_activations: "Activations par jour",
    calculator_units: "Nombre d'unités",
    calculator_daily_revenue: "Revenus Journaliers",
    calculator_monthly_revenue: "Revenus Mensuels",
    calculator_annual_revenue: "Revenus Annuels",
    calculator_per_unit_month: "Par Unité / Mois",
    calc_1x: "1× Par Jour", calc_2x: "2× Par Jour",
    dashboard_welcome: "Bon retour",
    dashboard_subtitle: "Votre tableau de bord opérateur Oceanex.",
    dashboard_enquiry: "Faire une Demande",
    dashboard_book_call: "Réserver un Appel",
    dashboard_application: "Ma Candidature",
    dashboard_calculator: "Calculateur de Revenus",
    dashboard_resources: "Ressources",
    dashboard_profile: "Mon Profil",
    enquiry_title: "Soumettre une Demande",
    enquiry_product: "Produit Souhaité",
    enquiry_message: "Votre Message",
    enquiry_send: "Envoyer la Demande",
    footer_patent: "Tous les produits Oceanex sont protégés par des droits de propriété intellectuelle enregistrés à l'international.",
    footer_rights: "Tous droits réservés.",
  },
  es: {
    nav_products: "Productos", nav_shop: "Tienda", nav_blog: "Revista",
    nav_about: "Nosotros", nav_contact: "Contacto", nav_portals: "Portales",
    nav_virtual_tours: "Tours Virtuales", nav_how_it_works: "Cómo Funciona",
    hero_cta_primary: "Explorar la Colección", hero_cta_secondary: "Reservar una Llamada",
    book_a_call: "Reservar una Llamada Comercial", enquire_now: "Consultar Ahora",
    learn_more: "Saber Más", view_products: "Ver Productos",
    contact_us: "Contáctenos", apply_now: "Aplicar Ahora",
    sign_in: "Iniciar Sesión", sign_out: "Cerrar Sesión",
    calculator_title: "Descubra Su Potencial de Ingresos",
    calculator_subtitle: "Descubra cómo una estructura Oceanex genera nuevos ingresos.",
    calculator_daily_rate: "Su tarifa diaria de activación",
    calculator_activations: "Activaciones por día",
    calculator_units: "Número de unidades",
    calculator_daily_revenue: "Ingresos Diarios",
    calculator_monthly_revenue: "Ingresos Mensuales",
    calculator_annual_revenue: "Ingresos Anuales",
    calculator_per_unit_month: "Por Unidad / Mes",
    calc_1x: "1× Por Día", calc_2x: "2× Por Día",
    dashboard_welcome: "Bienvenido de nuevo",
    dashboard_subtitle: "Su panel de operador Oceanex.",
    dashboard_enquiry: "Hacer una Consulta",
    dashboard_book_call: "Reservar una Llamada",
    dashboard_application: "Mi Solicitud",
    dashboard_calculator: "Calculadora de Ingresos",
    dashboard_resources: "Recursos",
    dashboard_profile: "Mi Perfil",
    enquiry_title: "Enviar una Consulta",
    enquiry_product: "Producto de Interés",
    enquiry_message: "Su Mensaje",
    enquiry_send: "Enviar Consulta",
    footer_patent: "Todos los productos Oceanex están protegidos por derechos de propiedad intelectual registrados internacionalmente.",
    footer_rights: "Todos los derechos reservados.",
  },
  de: {
    nav_products: "Produkte", nav_shop: "Shop", nav_blog: "Journal",
    nav_about: "Über uns", nav_contact: "Kontakt", nav_portals: "Portale",
    nav_virtual_tours: "Virtuelle Touren", nav_how_it_works: "So funktioniert es",
    hero_cta_primary: "Kollektion Entdecken", hero_cta_secondary: "Handelsgespräch Buchen",
    book_a_call: "Handelsgespräch Buchen", enquire_now: "Jetzt Anfragen",
    learn_more: "Mehr Erfahren", view_products: "Produkte Ansehen",
    contact_us: "Kontaktieren Sie Uns", apply_now: "Jetzt Bewerben",
    sign_in: "Anmelden", sign_out: "Abmelden",
    calculator_title: "Entdecken Sie Ihr Umsatzpotenzial",
    calculator_subtitle: "Erfahren Sie, wie eine Oceanex-Struktur neue Einnahmen generiert.",
    calculator_daily_rate: "Ihr täglicher Aktivierungspreis",
    calculator_activations: "Aktivierungen pro Tag",
    calculator_units: "Anzahl der Einheiten",
    calculator_daily_revenue: "Täglicher Umsatz",
    calculator_monthly_revenue: "Monatlicher Umsatz",
    calculator_annual_revenue: "Jahresumsatz",
    calculator_per_unit_month: "Pro Einheit / Monat",
    calc_1x: "1× Pro Tag", calc_2x: "2× Pro Tag",
    dashboard_welcome: "Willkommen zurück",
    dashboard_subtitle: "Ihr Oceanex-Operator-Dashboard.",
    dashboard_enquiry: "Anfrage Stellen",
    dashboard_book_call: "Gespräch Buchen",
    dashboard_application: "Meine Bewerbung",
    dashboard_calculator: "Umsatzrechner",
    dashboard_resources: "Ressourcen",
    dashboard_profile: "Mein Profil",
    enquiry_title: "Anfrage Senden",
    enquiry_product: "Produkt von Interesse",
    enquiry_message: "Ihre Nachricht",
    enquiry_send: "Anfrage Senden",
    footer_patent: "Alle Oceanex-Produkte sind durch international registrierte Rechte des geistigen Eigentums geschützt.",
    footer_rights: "Alle Rechte vorbehalten.",
  },
  ar: {
    nav_products: "المنتجات", nav_shop: "المتجر", nav_blog: "المجلة",
    nav_about: "من نحن", nav_contact: "اتصل بنا", nav_portals: "البوابات",
    nav_virtual_tours: "الجولات الافتراضية", nav_how_it_works: "كيف يعمل",
    hero_cta_primary: "استكشف المجموعة", hero_cta_secondary: "احجز مكالمة تجارية",
    book_a_call: "احجز مكالمة تجارية", enquire_now: "استفسر الآن",
    learn_more: "اعرف المزيد", view_products: "عرض المنتجات",
    contact_us: "اتصل بنا", apply_now: "تقدم الآن",
    sign_in: "تسجيل الدخول", sign_out: "تسجيل الخروج",
    calculator_title: "اكتشف إمكانات إيراداتك",
    calculator_subtitle: "اكتشف كيف تولد منشأة أوشينكس دخلاً جديداً.",
    calculator_daily_rate: "سعر التفعيل اليومي",
    calculator_activations: "التفعيلات في اليوم",
    calculator_units: "عدد الوحدات",
    calculator_daily_revenue: "الإيرادات اليومية",
    calculator_monthly_revenue: "الإيرادات الشهرية",
    calculator_annual_revenue: "الإيرادات السنوية",
    calculator_per_unit_month: "لكل وحدة / شهر",
    calc_1x: "مرة واحدة يومياً", calc_2x: "مرتان يومياً",
    dashboard_welcome: "مرحباً بعودتك",
    dashboard_subtitle: "لوحة تحكم مشغل أوشينكس الخاصة بك.",
    dashboard_enquiry: "تقديم استفسار",
    dashboard_book_call: "حجز مكالمة",
    dashboard_application: "طلبي",
    dashboard_calculator: "حاسبة الإيرادات",
    dashboard_resources: "الموارد",
    dashboard_profile: "ملفي الشخصي",
    enquiry_title: "إرسال استفسار",
    enquiry_product: "المنتج المطلوب",
    enquiry_message: "رسالتك",
    enquiry_send: "إرسال الاستفسار",
    footer_patent: "جميع منتجات أوشينكس محمية بحقوق الملكية الفكرية المسجلة دولياً.",
    footer_rights: "جميع الحقوق محفوظة.",
  },
  zh: {
    nav_products: "产品", nav_shop: "商店", nav_blog: "杂志",
    nav_about: "关于我们", nav_contact: "联系我们", nav_portals: "门户",
    nav_virtual_tours: "虚拟参观", nav_how_it_works: "使用方法",
    hero_cta_primary: "探索系列产品", hero_cta_secondary: "预约贸易通话",
    book_a_call: "预约贸易通话", enquire_now: "立即咨询",
    learn_more: "了解更多", view_products: "查看产品",
    contact_us: "联系我们", apply_now: "立即申请",
    sign_in: "登录", sign_out: "退出",
    calculator_title: "了解您的收益潜力",
    calculator_subtitle: "了解Oceanex结构如何从未充分利用的空间创造新收入。",
    calculator_daily_rate: "您的每日激活费率",
    calculator_activations: "每日激活次数",
    calculator_units: "单位数量",
    calculator_daily_revenue: "每日收入",
    calculator_monthly_revenue: "每月收入",
    calculator_annual_revenue: "年收入",
    calculator_per_unit_month: "每单位/月",
    calc_1x: "每天1次", calc_2x: "每天2次",
    dashboard_welcome: "欢迎回来",
    dashboard_subtitle: "您的Oceanex运营商控制台。",
    dashboard_enquiry: "提交询价",
    dashboard_book_call: "预约通话",
    dashboard_application: "我的申请",
    dashboard_calculator: "收益计算器",
    dashboard_resources: "资源",
    dashboard_profile: "我的资料",
    enquiry_title: "提交询价",
    enquiry_product: "感兴趣的产品",
    enquiry_message: "您的留言",
    enquiry_send: "发送询价",
    footer_patent: "所有Oceanex产品均受国际注册知识产权保护。",
    footer_rights: "版权所有。",
  },
  pt: {
    nav_products: "Produtos", nav_shop: "Loja", nav_blog: "Revista",
    nav_about: "Sobre", nav_contact: "Contato", nav_portals: "Portais",
    nav_virtual_tours: "Tours Virtuais", nav_how_it_works: "Como Funciona",
    hero_cta_primary: "Explorar a Coleção", hero_cta_secondary: "Agendar uma Chamada",
    book_a_call: "Agendar Chamada Comercial", enquire_now: "Consultar Agora",
    learn_more: "Saiba Mais", view_products: "Ver Produtos",
    contact_us: "Fale Conosco", apply_now: "Candidatar-se",
    sign_in: "Entrar", sign_out: "Sair",
    calculator_title: "Veja Seu Potencial de Receita",
    calculator_subtitle: "Descubra como uma estrutura Oceanex gera nova receita.",
    calculator_daily_rate: "Sua taxa diária de ativação",
    calculator_activations: "Ativações por dia",
    calculator_units: "Número de unidades",
    calculator_daily_revenue: "Receita Diária",
    calculator_monthly_revenue: "Receita Mensal",
    calculator_annual_revenue: "Receita Anual",
    calculator_per_unit_month: "Por Unidade / Mês",
    calc_1x: "1× Por Dia", calc_2x: "2× Por Dia",
    dashboard_welcome: "Bem-vindo de volta",
    dashboard_subtitle: "Seu painel de operador Oceanex.",
    dashboard_enquiry: "Fazer uma Consulta",
    dashboard_book_call: "Agendar Chamada",
    dashboard_application: "Minha Candidatura",
    dashboard_calculator: "Calculadora de Receita",
    dashboard_resources: "Recursos",
    dashboard_profile: "Meu Perfil",
    enquiry_title: "Enviar Consulta",
    enquiry_product: "Produto de Interesse",
    enquiry_message: "Sua Mensagem",
    enquiry_send: "Enviar Consulta",
    footer_patent: "Todos os produtos Oceanex são protegidos por direitos de propriedade intelectual registados internacionalmente.",
    footer_rights: "Todos os direitos reservados.",
  },
  it: {
    nav_products: "Prodotti", nav_shop: "Negozio", nav_blog: "Rivista",
    nav_about: "Chi Siamo", nav_contact: "Contatti", nav_portals: "Portali",
    nav_virtual_tours: "Tour Virtuali", nav_how_it_works: "Come Funziona",
    hero_cta_primary: "Esplora la Collezione", hero_cta_secondary: "Prenota una Chiamata",
    book_a_call: "Prenota una Chiamata Commerciale", enquire_now: "Richiedi Informazioni",
    learn_more: "Scopri di Più", view_products: "Vedi Prodotti",
    contact_us: "Contattaci", apply_now: "Candidati Ora",
    sign_in: "Accedi", sign_out: "Esci",
    calculator_title: "Scopri il Tuo Potenziale di Ricavi",
    calculator_subtitle: "Scopri come una struttura Oceanex genera nuovi ricavi.",
    calculator_daily_rate: "La tua tariffa giornaliera",
    calculator_activations: "Attivazioni al giorno",
    calculator_units: "Numero di unità",
    calculator_daily_revenue: "Ricavi Giornalieri",
    calculator_monthly_revenue: "Ricavi Mensili",
    calculator_annual_revenue: "Ricavi Annuali",
    calculator_per_unit_month: "Per Unità / Mese",
    calc_1x: "1× Al Giorno", calc_2x: "2× Al Giorno",
    dashboard_welcome: "Bentornato",
    dashboard_subtitle: "Il tuo pannello operatore Oceanex.",
    dashboard_enquiry: "Invia una Richiesta",
    dashboard_book_call: "Prenota una Chiamata",
    dashboard_application: "La Mia Candidatura",
    dashboard_calculator: "Calcolatore di Ricavi",
    dashboard_resources: "Risorse",
    dashboard_profile: "Il Mio Profilo",
    enquiry_title: "Invia una Richiesta",
    enquiry_product: "Prodotto di Interesse",
    enquiry_message: "Il Tuo Messaggio",
    enquiry_send: "Invia Richiesta",
    footer_patent: "Tutti i prodotti Oceanex sono protetti da diritti di proprietà intellettuale registrati a livello internazionale.",
    footer_rights: "Tutti i diritti riservati.",
  },
  ja: {
    nav_products: "製品", nav_shop: "ショップ", nav_blog: "ジャーナル",
    nav_about: "会社概要", nav_contact: "お問い合わせ", nav_portals: "ポータル",
    nav_virtual_tours: "バーチャルツアー", nav_how_it_works: "使い方",
    hero_cta_primary: "コレクションを見る", hero_cta_secondary: "商談を予約する",
    book_a_call: "商談を予約する", enquire_now: "今すぐ問い合わせ",
    learn_more: "詳しく見る", view_products: "製品を見る",
    contact_us: "お問い合わせ", apply_now: "今すぐ申し込む",
    sign_in: "ログイン", sign_out: "ログアウト",
    calculator_title: "収益ポテンシャルを確認",
    calculator_subtitle: "Oceanex構造物が未活用スペースから新たな収益を生む方法を発見してください。",
    calculator_daily_rate: "1日あたりの料金",
    calculator_activations: "1日あたりのアクティベーション数",
    calculator_units: "ユニット数",
    calculator_daily_revenue: "1日の収益",
    calculator_monthly_revenue: "月間収益",
    calculator_annual_revenue: "年間収益",
    calculator_per_unit_month: "ユニットあたり / 月",
    calc_1x: "1日1回", calc_2x: "1日2回",
    dashboard_welcome: "おかえりなさい",
    dashboard_subtitle: "Oceanexオペレーターダッシュボード。",
    dashboard_enquiry: "問い合わせを送る",
    dashboard_book_call: "通話を予約する",
    dashboard_application: "私の申請",
    dashboard_calculator: "収益計算機",
    dashboard_resources: "リソース",
    dashboard_profile: "マイプロフィール",
    enquiry_title: "問い合わせを送る",
    enquiry_product: "関心のある製品",
    enquiry_message: "メッセージ",
    enquiry_send: "問い合わせを送信",
    footer_patent: "すべてのOceanex製品は、国際的に登録された知的財産権によって保護されています。",
    footer_rights: "全著作権所有。",
  },
  ru: {
    nav_products: "Продукты", nav_shop: "Магазин", nav_blog: "Журнал",
    nav_about: "О нас", nav_contact: "Контакты", nav_portals: "Порталы",
    nav_virtual_tours: "Виртуальные туры", nav_how_it_works: "Как это работает",
    hero_cta_primary: "Изучить коллекцию", hero_cta_secondary: "Записаться на звонок",
    book_a_call: "Записаться на торговый звонок", enquire_now: "Запросить информацию",
    learn_more: "Узнать больше", view_products: "Посмотреть продукты",
    contact_us: "Связаться с нами", apply_now: "Подать заявку",
    sign_in: "Войти", sign_out: "Выйти",
    calculator_title: "Узнайте свой потенциал дохода",
    calculator_subtitle: "Узнайте, как структура Oceanex генерирует новый доход.",
    calculator_daily_rate: "Ваша дневная ставка активации",
    calculator_activations: "Активаций в день",
    calculator_units: "Количество единиц",
    calculator_daily_revenue: "Дневной доход",
    calculator_monthly_revenue: "Месячный доход",
    calculator_annual_revenue: "Годовой доход",
    calculator_per_unit_month: "На единицу / месяц",
    calc_1x: "1× в день", calc_2x: "2× в день",
    dashboard_welcome: "С возвращением",
    dashboard_subtitle: "Ваша панель оператора Oceanex.",
    dashboard_enquiry: "Отправить запрос",
    dashboard_book_call: "Записаться на звонок",
    dashboard_application: "Моя заявка",
    dashboard_calculator: "Калькулятор доходов",
    dashboard_resources: "Ресурсы",
    dashboard_profile: "Мой профиль",
    enquiry_title: "Отправить запрос",
    enquiry_product: "Интересующий продукт",
    enquiry_message: "Ваше сообщение",
    enquiry_send: "Отправить запрос",
    footer_patent: "Все продукты Oceanex защищены международно зарегистрированными правами интеллектуальной собственности.",
    footer_rights: "Все права защищены.",
  },
};

interface LanguageContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
  currentLang: LangOption;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
  isRTL: false,
  currentLang: LANGUAGES[0],
});

async function detectCountryFromIP(): Promise<LangCode> {
  try {
    // Use ipapi.co free tier — no key needed for basic country detection
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return "en";
    const data = await res.json();
    const country: string = data.country_code || "";
    return COUNTRY_LANG[country] || "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    const saved = localStorage.getItem("oceanex_lang") as LangCode | null;
    if (saved && T[saved]) return saved;
    // Quick browser language hint while IP detection runs
    const browser = navigator.language?.slice(0, 2) as LangCode;
    return T[browser] ? browser : "en";
  });

  useEffect(() => {
    const saved = localStorage.getItem("oceanex_lang");
    if (saved) return; // user has manually chosen — respect it
    detectCountryFromIP().then(detected => {
      setLangState(detected);
    });
  }, []);

  const setLang = (l: LangCode) => {
    localStorage.setItem("oceanex_lang", l);
    setLangState(l);
  };

  const t = (key: TranslationKey): string => T[lang]?.[key] ?? T.en[key] ?? key;
  const currentLang = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0];
  const isRTL = currentLang.rtl ?? false;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL, currentLang }}>
      <div dir={isRTL ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
