import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ArogyaIcon } from "@/components/ArogyaIcon";
import { HealthTopics } from "@/components/HealthTopics";
import { PublicHealthAlerts } from "@/components/PublicHealthAlerts";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border pb-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 rounded-xl p-1.5">
              <ArogyaIcon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-headline font-bold text-foreground">VaidyaAI</h1>
              <p className="text-xs text-foreground/50">Your Health Assistant</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <HealthTopics />
          <PublicHealthAlerts />
        </SidebarContent>
        <SidebarFooter>
          <LanguageSelector />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset
        className="flex flex-col"
        style={{background: "linear-gradient(135deg, #f0f7e6 0%, #e8f4f0 50%, #f5f0e8 100%)"}}
      >
        {/* Mobile header */}
        <header className="flex items-center justify-between p-2 border-b md:hidden">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 rounded-xl p-1.5">
              <ArogyaIcon className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-lg font-headline font-bold">VaidyaAI</h1>
          </div>
          <SidebarTrigger />
        </header>

        {/* Desktop top banner */}
        <div className="hidden md:flex items-center justify-between px-6 py-3 border-b border-primary/20"
          style={{background: "linear-gradient(90deg, #1d9e75 0%, #174f3e 100%)"}}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl p-1.5">
              <ArogyaIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">VaidyaAI</h1>
              <p className="text-white/70 text-xs">AI-Powered Public Health Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-white font-bold text-sm">7</p>
              <p className="text-white/70 text-xs">Diseases</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <p className="text-white font-bold text-sm">3</p>
              <p className="text-white/70 text-xs">Languages</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <p className="text-white font-bold text-sm">24/7</p>
              <p className="text-white/70 text-xs">Available</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Chat />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}