import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, useRef } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AgencyDossier from "./pages/AgencyDossier";
import Timeline from "./pages/Timeline";
import Equipment from "./pages/Equipment";
import Districts from "./pages/Districts";
import Conspiracies from "./pages/Conspiracies";
import ClassifiedFiles from "./pages/ClassifiedFiles";
import TerminalNav from "./components/TerminalNav";
import PageTransition from "./components/PageTransition";

function Router() {
  const [location] = useLocation();

  return (
    <PageTransition locationKey={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/agency/:id" component={AgencyDossier} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/equipment" component={Equipment} />
        <Route path="/districts" component={Districts} />
        <Route path="/conspiracies" component={Conspiracies} />
        <Route path="/classified" component={ClassifiedFiles} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

// Global click sound handler — plays menu_select_1 on any clickable element
// except nav tabs (which have their own sounds) and the PLAY SFX button
function useGlobalClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the closest interactive element
      const clickable = target.closest('a, button, [role="button"]') as HTMLElement | null;
      if (!clickable) return;

      // Skip nav tab links (they have their own sounds via TerminalNav)
      if (clickable.closest('nav')) return;

      // Skip the PLAY SFX button (it plays its own weapon sound)
      if (clickable.getAttribute('title') === 'Play weapon sound effect') return;

      // Skip the audio toggle button
      if (clickable.getAttribute('title')?.includes('lobby music')) return;

      // Play menu select sound
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio("/manus-storage/menu_select_1_3496193a.wav");
      audio.volume = 0.2;
      audioRef.current = audio;
      audio.play().catch(() => {});
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

function App() {
  useGlobalClickSound();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="scanlines crt-flicker min-h-screen pb-6">
            <TerminalNav />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
