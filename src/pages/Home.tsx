import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-learning.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import XPBadge from "@/components/gamification/XPBadge";
import ProgressRing from "@/components/gamification/ProgressRing";
import { 
  Play, 
  Trophy, 
  Target, 
  Users, 
  Zap,
  BookOpen,
  Code,
  Globe,
  Database,
  ArrowRight,
  Star,
  TrendingUp
} from "lucide-react";

const Home = () => {
  // Mock user data - in real app, this would come from state/API
  const userStats = {
    level: 1, // Start at level 1
    xp: 0, // Start with 0 XP
    maxXp: 100, // Lower XP requirement for first level
    streak: 0, // Start with 0 streak
    coursesCompleted: 0, // Start with 0 completed
    totalCourses: 12,
    rank: 0 // No rank until they start learning
  };

  const recentCourses = [
    {
      id: "web-development",
      title: "Web Development",
      progress: 0, // Start from 0%
      icon: <Globe className="w-5 h-5" />,
      nextModule: "HTML Foundations"
    },
    {
      id: "python",
      title: "Python Programming", 
      progress: 0, // Start from 0%
      icon: <Code className="w-5 h-5" />,
      nextModule: "Introduction to Python"
    },
    {
      id: "java",
      title: "Java Programming",
      progress: 0, // Start from 0%
      icon: <Database className="w-5 h-5" />,
      nextModule: "Introduction to Java"
    }
  ];

  const achievements = [
    { title: "First Steps", description: "Complete your first module", unlocked: false },
    { title: "Week Warrior", description: "7-day learning streak", unlocked: false },
    { title: "Code Master", description: "Complete 5 modules", unlocked: false },
    { title: "Python Pro", description: "Master Python basics", unlocked: false }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 text-center py-20 px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Welcome to Your Coding Journey!
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your programming adventure with gamified learning experiences that make coding fun and engaging. Earn XP, unlock achievements, and level up your skills!
          </p>
          <Link to="/learning">
            <Button size="lg" className="text-lg px-8 py-6">
              <Play className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="module-card">
          <CardContent className="p-6 text-center">
            <ProgressRing progress={(userStats.xp / userStats.maxXp) * 100} size={64}>
              <div className="text-center">
                <div className="text-lg font-bold">{userStats.level}</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </div>
            </ProgressRing>
            <div className="mt-3">
              <div className="text-sm font-medium">{userStats.xp}/{userStats.maxXp} XP</div>
              <div className="text-xs text-muted-foreground">Until next level</div>
            </div>
          </CardContent>
        </Card>

        <Card className="module-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-success-foreground" />
            </div>
            <div className="text-2xl font-bold">{userStats.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="module-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold">{userStats.coursesCompleted}</div>
            <div className="text-sm text-muted-foreground">Courses Completed</div>
          </CardContent>
        </Card>

        <Card className="module-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold">#{userStats.rank}</div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="module-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Start Learning</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                    {course.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">Next: {course.nextModule}</p>
                    <Progress value={course.progress} className="h-2 mt-2" />
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">{course.progress}%</div>
                    <Link to={`/learning`}>
                      <Button size="sm" variant="outline">
                        Start
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="module-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/learning">
                  <Button variant="outline" className="w-full h-20 flex-col">
                    <BookOpen className="w-6 h-6 mb-2" />
                    <span>Browse Courses</span>
                  </Button>
                </Link>
                
                <Link to="/achievements">
                  <Button variant="outline" className="w-full h-20 flex-col">
                    <Trophy className="w-6 h-6 mb-2" />
                    <span>View Achievements</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <Card className="module-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg ${
                  achievement.unlocked ? "bg-success/10" : "opacity-50"
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? "bg-gradient-success" : "bg-muted"
                  }`}>
                    {achievement.unlocked ? (
                      <Star className="w-4 h-4 text-success-foreground" />
                    ) : (
                      <Target className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Daily Goal */}
          <Card className="module-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Daily Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <ProgressRing progress={0} size={80}>
                  <div className="text-center">
                    <div className="text-lg font-bold">0/4</div>
                    <div className="text-xs text-muted-foreground">Modules</div>
                  </div>
                </ProgressRing>
                <p className="text-sm text-muted-foreground mt-3">
                  Complete your first module to start earning XP!
                </p>
                <XPBadge xp={50} variant="compact" className="mt-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;