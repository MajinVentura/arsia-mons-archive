import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
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
import SignalIndicator from "./components/SignalIndicator";

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

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="scanlines crt-flicker min-h-screen pb-6">
            <TerminalNav />
            <Router />
            <SignalIndicator />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
