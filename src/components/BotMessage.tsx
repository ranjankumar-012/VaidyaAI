import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type BotMessageProps = {
  children: React.ReactNode;
};

export function BotMessage({ children }: BotMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="w-9 h-9 border-2 border-primary shadow-md shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-lg w-fit">
        <p className="text-xs font-bold text-primary mb-1 ml-1">VaidyaAI</p>
        <div className="bg-white border border-primary/20 shadow-md rounded-2xl rounded-tl-none p-4">
          <p className="text-sm text-foreground leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}