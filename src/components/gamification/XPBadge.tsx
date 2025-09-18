import { Star, Zap } from "lucide-react";

interface XPBadgeProps {
  xp: number;
  level?: number;
  variant?: "default" | "compact" | "detailed";
  className?: string;
}

const XPBadge = ({ xp, level, variant = "default", className = "" }: XPBadgeProps) => {
  const formatXP = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  if (variant === "compact") {
    return (
      <div className={`xp-badge ${className}`}>
        <Zap className="w-3 h-3" />
        <span>{formatXP(xp)}</span>
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={`flex items-center space-x-3 p-3 rounded-lg bg-gradient-card border border-border/50 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <Star className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-medium">Level {level}</div>
            <div className="text-xs text-muted-foreground">{formatXP(xp)} XP</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`xp-badge ${className}`}>
      <Zap className="w-4 h-4" />
      <span className="font-semibold">{formatXP(xp)} XP</span>
      {level && <span className="text-primary-foreground/80">• Lv.{level}</span>}
    </div>
  );
};

export default XPBadge;