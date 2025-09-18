import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import XPBadge from "@/components/gamification/XPBadge";
import { 
  Crown, 
  Medal, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Zap,
  Target,
  Users
} from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  rank: number;
  weeklyXP: number;
  streak: number;
  coursesCompleted: number;
}

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<"all-time" | "weekly" | "monthly">("all-time");

  const leaderboardData: LeaderboardUser[] = [
    {
      id: "1",
      name: "CodeMaster Alex",
      level: 28,
      xp: 15420,
      rank: 1,
      weeklyXP: 1240,
      streak: 45,
      coursesCompleted: 8
    },
    {
      id: "2", 
      name: "Python Prodigy",
      level: 25,
      xp: 13850,
      rank: 2,
      weeklyXP: 980,
      streak: 32,
      coursesCompleted: 7
    },
    {
      id: "3",
      name: "Web Dev Wizard",
      level: 24,
      xp: 12900,
      rank: 3,
      weeklyXP: 1120,
      streak: 28,
      coursesCompleted: 6
    },
    {
      id: "4",
      name: "JS Ninja",
      level: 22,
      xp: 11200,
      rank: 4,
      weeklyXP: 750,
      streak: 21,
      coursesCompleted: 5
    },
    {
      id: "5",
      name: "Data Scientist",
      level: 21,
      xp: 10850,
      rank: 5,
      weeklyXP: 890,
      streak: 19,
      coursesCompleted: 5
    },
    {
      id: "156", // Current user
      name: "You",
      level: 12,
      xp: 2340,
      rank: 156,
      weeklyXP: 340,
      streak: 7,
      coursesCompleted: 3
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-yellow-500/50 bg-yellow-500/5";
      case 2:
        return "border-gray-400/50 bg-gray-400/5";
      case 3:
        return "border-amber-600/50 bg-amber-600/5";
      default:
        return "border-border/50";
    }
  };

  const currentUser = leaderboardData.find(user => user.name === "You");
  const topUsers = leaderboardData.filter(user => user.name !== "You").slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">Compete with learners from around the world</p>
      </div>

      {/* Timeframe Selection */}
      <div className="flex items-center space-x-2 mb-6">
        <Button 
          variant={timeframe === "all-time" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("all-time")}
        >
          All Time
        </Button>
        <Button 
          variant={timeframe === "weekly" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("weekly")}
        >
          This Week
        </Button>
        <Button 
          variant={timeframe === "monthly" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeframe("monthly")}
        >
          This Month
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <Card className="module-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Top Performers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topUsers.map((user) => (
                <div 
                  key={user.id} 
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${getRankColor(user.rank)} transition-colors`}
                >
                  <div className="flex items-center space-x-3">
                    {getRankIcon(user.rank)}
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{user.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Level {user.level}</span>
                      <span>•</span>
                      <span>{user.coursesCompleted} courses</span>
                      <span>•</span>
                      <span>{user.streak} day streak</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <XPBadge xp={user.xp} variant="compact" />
                    {timeframe === "weekly" && (
                      <div className="text-xs text-muted-foreground mt-1">
                        +{user.weeklyXP} this week
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Your Position */}
          {currentUser && (
            <Card className="module-card mt-6 achievement-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Your Position</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-primary/30 bg-primary/5">
                  <div className="flex items-center space-x-3">
                    {getRankIcon(currentUser.rank)}
                    <Avatar>
                      <AvatarFallback>YOU</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{currentUser.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Level {currentUser.level}</span>
                      <span>•</span>
                      <span>{currentUser.coursesCompleted} courses</span>
                      <span>•</span>
                      <span>{currentUser.streak} day streak</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <XPBadge xp={currentUser.xp} variant="compact" />
                    {timeframe === "weekly" && (
                      <div className="text-xs text-muted-foreground mt-1">
                        +{currentUser.weeklyXP} this week
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Community Stats */}
          <Card className="module-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Community</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">12,847</div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">245,692</div>
                <div className="text-sm text-muted-foreground">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1,294</div>
                <div className="text-sm text-muted-foreground">Active Today</div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Leaders */}
          <Card className="module-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>This Week's Top Gainers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topUsers.slice(0, 3).map((user, index) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{user.name.split(' ')[0]}</div>
                    <div className="text-xs text-muted-foreground">+{user.weeklyXP} XP</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="module-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Your Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-bold">Rank #156</div>
                <div className="text-sm text-muted-foreground">Current Position</div>
                <Badge variant="outline" className="mt-2">
                  +12 this week
                </Badge>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <div className="text-sm font-medium mb-2">Next Milestone</div>
                <div className="text-xs text-muted-foreground">
                  Reach Top 100 • 47 positions to go
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;