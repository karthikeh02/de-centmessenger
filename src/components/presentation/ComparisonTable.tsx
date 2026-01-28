import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  feature: string;
  whatsapp: boolean | "partial";
  telegram: boolean | "partial";
  signal: boolean | "partial";
  demessenger: boolean | "partial";
}

interface ComparisonTableProps {
  data: ComparisonRow[];
}

const StatusIcon = ({ value }: { value: boolean | "partial" }) => {
  if (value === true) return <Check className="w-5 h-5 text-neon-green" />;
  if (value === "partial") return <Minus className="w-5 h-5 text-yellow-500" />;
  return <X className="w-5 h-5 text-destructive" />;
};

export const ComparisonTable = ({ data }: ComparisonTableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 font-display text-sm text-muted-foreground">Feature</th>
            <th className="text-center py-4 px-4 font-display text-sm text-muted-foreground">WhatsApp</th>
            <th className="text-center py-4 px-4 font-display text-sm text-muted-foreground">Telegram</th>
            <th className="text-center py-4 px-4 font-display text-sm text-muted-foreground">Signal</th>
            <th className="text-center py-4 px-4 font-display text-sm font-bold text-gradient">De Messenger</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr 
              key={idx} 
              className={cn(
                "border-b border-border/50 transition-colors",
                "hover:bg-card/50"
              )}
            >
              <td className="py-4 px-4 text-foreground font-medium">{row.feature}</td>
              <td className="py-4 px-4 text-center"><StatusIcon value={row.whatsapp} /></td>
              <td className="py-4 px-4 text-center"><StatusIcon value={row.telegram} /></td>
              <td className="py-4 px-4 text-center"><StatusIcon value={row.signal} /></td>
              <td className="py-4 px-4 text-center bg-primary/5">
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-neon-green" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
