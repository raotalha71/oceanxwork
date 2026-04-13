import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { captureUTMs } from "./lib/ghl";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import VirtualTours from "./pages/VirtualTours";
import Portals from "./pages/Portals";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import AgentsPortal from "./pages/AgentsPortal";
import { SocialProofTicker, ExitIntentPopup, StickyShopBar, WhatsAppButton } from "./components/CROLayer";
import AIChatAgent from "./components/AIChatAgent";
import { TrackingPixels, GHLChatWidget } from "./components/GHLWidgets";
import LandingPage from "./pages/LandingPage";
import TradePortal from "./pages/TradePortal";
import Checkout from "./pages/Checkout";
import InflationGuide from "./pages/InflationGuide";
import Legal from "./pages/Legal";
import OperatorDashboard from "./pages/OperatorDashboard";
import CruiseLanding from "./pages/CruiseLanding";
import ResortLanding from "./pages/ResortLanding";
import Press from "./pages/Press";
import { LanguageProvider } from "./contexts/LanguageContext";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/shop" component={Shop} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/how-it-works" component={InflationGuide} />
      <Route path="/trade-portal" component={TradePortal} />
      <Route path="/agents-portal" component={AgentsPortal} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogArticle} />
      <Route path="/virtual-tours" component={VirtualTours} />
      <Route path="/portals" component={Portals} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/lp/pool-bar" component={() => <LandingPage variant="pool-bar" />} />
      <Route path="/lp/trade" component={() => <LandingPage variant="trade" />} />
      <Route path="/lp/world-cup" component={() => <LandingPage variant="world-cup" />} />
      <Route path="/lp/resort" component={() => <LandingPage variant="resort" />} />
      <Route path="/legal" component={Legal} />
      <Route path="/legal/:tab" component={Legal} />
      <Route path="/dashboard" component={OperatorDashboard} />
      <Route path="/lp/cruise" component={CruiseLanding} />
      <Route path="/lp/resort-pro" component={ResortLanding} />
      <Route path="/press" component={Press} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    // Instant scroll to top on every route change — no smooth scroll so it's immediate
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);
  return null;
}

function UTMCapture() {
  useEffect(() => { captureUTMs(); }, []);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <UTMCapture />
            <ScrollToTop />
            <TrackingPixels />
            <GHLChatWidget />
            <Router />
            <SocialProofTicker />
            <ExitIntentPopup />
            <StickyShopBar />
            <WhatsAppButton />
            <AIChatAgent />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
