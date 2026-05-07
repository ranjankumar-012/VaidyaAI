"use client";

import { Stethoscope } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { healthTopics } from "@/lib/data";
import { useLanguage } from "./LanguageProvider";

export function HealthTopics() {
  const { language } = useLanguage();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide mb-2">
        <Stethoscope className="w-4 h-4" />
        Health Topics
      </SidebarGroupLabel>
      <Accordion type="single" collapsible className="w-full space-y-1">
        {healthTopics.map((topic) => (
          <AccordionItem
            value={topic.topicId}
            key={topic.topicId}
            className="border border-sidebar-border rounded-lg px-3 bg-sidebar-accent/30"
          >
            <AccordionTrigger className="text-sm font-semibold hover:no-underline hover:text-primary py-3">
              {topic[language].title}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-sidebar-foreground/80 space-y-2 pb-3">
              <div className="bg-primary/10 rounded-md p-2">
                <h4 className="font-bold text-primary mb-1">Symptoms:</h4>
                <p>{topic[language].symptoms}</p>
              </div>
              <div className="bg-accent/10 rounded-md p-2">
                <h4 className="font-bold text-accent mb-1">Prevention:</h4>
                <p>{topic[language].prevention}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SidebarGroup>
  );
}