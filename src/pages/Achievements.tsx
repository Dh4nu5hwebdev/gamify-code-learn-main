import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import XPBadge from "@/components/gamification/XPBadge";
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Award,
  Crown,
  Medal,
  Lock,
  CheckCircle
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "learning" | "streak" | "skill" | "community";
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

const Achievements = () => {
  const achievements: Achievement[] = [
    {
      id: "first-steps",
      title: "First Steps",
      description: "Complete your very first module",
      icon: <Star className="w-6 h-6" />,
      category: "learning",
      rarity: "common",
      xpReward: 50,
      unlocked: true,
      unlockedAt: "2024-01-15"
    },
    {
      id: "week-warrior",
      title: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      icon: <Trophy className="w-6 h-6" />,
      category: "streak",
      rarity: "rare",
      xpReward: 150,
      unlocked: true,
      unlockedAt: "2024-01-22"
    },
    {
      id: "html-master",
      title: "HTML Master",
      description: "Complete all HTML modules",
      icon: <Award className="w-6 h-6" />,
      category: "skill",
      rarity: "epic",
      xpReward: 300,
      unlocked: false,
      progress: 3,
      maxProgress: 5
    },
    {
      id: "speed-learner",
      title: "Speed Learner",
      description: "Complete 5 modules in one day",
      icon: <Zap className="w-6 h-6" />,
      category: "learning",
      rarity: "rare",
      xpReward: 200,
      unlocked: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: "python-pro",
      title: "Python Pro",
      description: "Master Python fundamentals",
      icon: <Crown className="w-6 h-6" />,
      category: "skill",
      rarity: "epic",
      xpReward: 400,
      unlocked: false,
      progress: 1,
      maxProgress: 8
    },
    {
      id: "knowledge-seeker",
      title: "Knowledge Seeker",
      description: "Complete 25 modules across all courses",
      icon: <Medal className="w-6 h-6" />,
      category: "learning",
      rarity: "legendary",
      xpReward: 500,
      unlocked: false,
      progress: 8,
      maxProgress: 25
    },
    {
      id: "consistency-king",
      title: "Consistency King",
      description: "Maintain a 30-day learning streak",
      icon: <Target className="w-6 h-6" />,
      category: "streak",
      rarity: "legendary",
      xpReward: 750,
      unlocked: false,
      progress: 7,
      maxProgress: 30
    }
  ];

  const categories = [
    { id: "learning", name: "Learning", color: "primary" },
    { id: "streak", name: "Streaks", color: "success" },
    { id: "skill", name: "Skills", color: "warning" },
    { id: "community", name: "Community", color: "accent" }
  ];

  const rarityColors = {
    common: "bg-gray-500",
    rare: "bg-blue-500", 
    epic: "bg-purple-500",
    legendary: "bg-yellow-500"
  };

  const rarityGlow = {
    common: "",
    rare: "shadow-blue-500/30",
    epic: "achievement-glow",
    legendary: "shadow-yellow-500/40"
  };

  const stats = {
    totalAchievements: achievements.length,
    unlockedAchievements: achievements.filter(a => a.unlocked).length,
    totalXP: achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0),
    rarest: achievements.filter(a => a.unlocked && a.rarity === "legendary").length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Achievements</h1>
        <p className="text-muted-foreground">Track your learning progress and unlock rewards</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="module-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold">{stats.unlockedAchievements}</div>
            <div className="text-sm text-muted-foreground">Unlocked</div>
          </CardContent>
        </Card>

        <Card className="module-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-success-foreground" />
            </div>
            <div className="text-2xl font-bold">{((stats.unlockedAchievements / stats.totalAchievements) * 100).toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">Completion</div>
          </CardContent>
        </Card>

        <Card className="module-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold">{stats.totalXP}</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </CardContent>
        </Card>

        <Card className="module-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-3">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold">{stats.rarest}</div>
            <div className="text-sm text-muted-foreground">Legendary</div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="default" className="bg-gradient-primary">All</Badge>
        {categories.map((category) => (
          <Badge key={category.id} variant="outline">
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`module-card relative ${
              achievement.unlocked ? rarityGlow[achievement.rarity] : "opacity-75"
            }`}
          >
            {/* Rarity Indicator */}
            <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${rarityColors[achievement.rarity]}`}></div>
            
            {/* Lock/Unlock Indicator */}
            <div className="absolute top-3 left-3">
              {achievement.unlocked ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
            </div>

            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  achievement.unlocked 
                    ? "bg-gradient-primary" 
                    : "bg-muted"
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`mt-1 capitalize ${
                      achievement.unlocked ? "border-primary/50" : "border-muted"
                    }`}
                  >
                    {achievement.rarity}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
              
              {/* Progress (for locked achievements) */}
              {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <XPBadge xp={achievement.xpReward} variant="compact" />
                {achievement.unlocked && achievement.unlockedAt && (
                  <div className="text-xs text-muted-foreground">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Achievements;