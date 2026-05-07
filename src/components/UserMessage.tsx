import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserMessageProps = {
  children: React.ReactNode;
};

export function UserMessage({ children }: UserMessageProps) {
  return (
    <div className="flex justify-end items-start gap-3">
      <div className="max-w-lg w-fit">
        <p className="text-xs font-bold text-right text-foreground/60 mb-1 mr-1">You</p>
        <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none shadow-md">
          <p className="text-sm leading-relaxed">{children}</p>
        </div>
      </div>
      <Avatar className="w-9 h-9 border-2 border-foreground/20 shadow-md shrink-0">
        <AvatarFallback className="bg-foreground/10 text-foreground">
          <User className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}