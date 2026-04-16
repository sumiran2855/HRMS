import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MonthSelectorProps {
  monthYear: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function MonthSelector({
  monthYear,
  onPreviousMonth,
  onNextMonth,
}: MonthSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-white border border-slate-200/60 rounded-xl p-1 shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPreviousMonth}
        className="cursor-pointer rounded-lg hover:bg-slate-100"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="font-semibold text-slate-700 min-w-[150px] text-center text-sm">
        {monthYear}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onNextMonth}
        className="cursor-pointer rounded-lg hover:bg-slate-100"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
