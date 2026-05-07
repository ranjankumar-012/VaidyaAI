import { Megaphone, Sun, Syringe, CloudRain, Icon } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { publicHealthAlerts } from "@/lib/data";

const iconMap: Record<string, Icon> = {
  Sun,
  Syringe,
  CloudRain,
};

export function PublicHealthAlerts() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide mb-2">
        <Megaphone className="w-4 h-4" />
        Public Health Alerts
      </SidebarGroupLabel>
      <div className="space-y-2">
        {publicHealthAlerts.map((alert) => {
          const IconComponent = iconMap[alert.icon];
          return (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-sidebar-border bg-sidebar-accent/30 hover:bg-sidebar-accent/50 transition-colors"
            >
              {IconComponent && (
                <div className="bg-accent/20 rounded-full p-1.5 shrink-0">
                  <IconComponent className="w-4 h-4 text-accent" />
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-foreground">{alert.title}</h4>
                <p className="text-xs text-sidebar-foreground/80 mt-0.5">{alert.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SidebarGroup>
  );
}