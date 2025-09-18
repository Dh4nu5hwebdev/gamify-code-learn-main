import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, Trophy, BookOpen, Zap, Menu, X } from "lucide-react";

interface UserStats {
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Mock user stats - in real app, this would come from state/API
  const userStats: UserStats = {
    level: 1, // Start at level 1
    xp: 0, // Start with 0 XP
    maxXp: 100, // Lower XP requirement for first level
    streak: 0, // Start with 0 streak
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/learning", label: "Learning" },
    { path: "/achievements", label: "Achievements" },
    { path: "/leaderboard", label: "Leaderboard" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">EchoLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Stats & Profile - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* XP Progress */}
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  Level {userStats.level}
                </div>
                <div className="text-xs font-medium">
                  {userStats.xp}/{userStats.maxXp} XP
                </div>
              </div>
              <div className="w-20">
                <Progress
                  value={(userStats.xp / userStats.maxXp) * 100}
                  className="h-2"
                />
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-success text-success-foreground text-xs font-medium">
              <Trophy className="w-3 h-3" />
              <span>{userStats.streak}</span>
            </div>

            {/* Profile */}
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile User Stats */}
              <div className="px-4 py-2 border-t border-border/50 mt-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    Level {userStats.level} • {userStats.xp}/{userStats.maxXp}{" "}
                    XP
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-success text-success-foreground text-xs">
                    <Trophy className="w-3 h-3" />
                    <span>{userStats.streak}</span>
                  </div>
                </div>
                <Progress
                  value={(userStats.xp / userStats.maxXp) * 100}
                  className="h-2 mt-2"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
