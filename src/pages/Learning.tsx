import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProgressRing from "@/components/gamification/ProgressRing";
import { 
  Code, 
  Globe, 
  Database, 
  Smartphone,
  Palette,
  Brain,
  Trophy,
  Clock,
  Star,
  PlayCircle,
  Lock,
  CheckCircle
} from "lucide-react";

interface Skill {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  xpReward: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  paths: SkillPath[];
}

interface SkillPath {
  id: string;
  title: string;
  modules: Module[];
  progress: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  isLocked: boolean;
  xpReward: number;
  estimatedTime: string;
}

const Learning = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    {
      id: "web-development",
      title: "Web Development",
      icon: <Globe className="w-6 h-6" />,
      description: "Master HTML, CSS, JavaScript, and modern frameworks",
      progress: 0, // Start from 0%
      totalModules: 12,
      completedModules: 0, // Start with 0 completed
      xpReward: 2500,
      difficulty: "Beginner",
      estimatedTime: "8 weeks",
      paths: [
        {
          id: "html-css",
          title: "HTML & CSS Fundamentals",
          progress: 0, // Start from 0%
          modules: [
            {
              id: "html-foundations",
              title: "HTML Foundations",
              description: "Learn the building blocks of web development",
              progress: 0, // Start from beginning
              isLocked: false,
              xpReward: 100,
              estimatedTime: "2 hours"
            },
            {
              id: "html-structure",
              title: "HTML Structure & Tags",
              description: "Master semantic HTML and document structure",
              progress: 0, // Start from beginning
              isLocked: true, // Locked until previous is complete
              xpReward: 120,
              estimatedTime: "1.5 hours"
            },
            {
              id: "forms-inputs",
              title: "Forms and Input Elements",
              description: "Create interactive forms and handle user input",
              progress: 0, // Start from beginning
              isLocked: true, // Locked until previous is complete
              xpReward: 150,
              estimatedTime: "2.5 hours"
            },
            {
              id: "css-styling",
              title: "CSS Styling Basics",
              description: "Style your HTML with beautiful CSS",
              progress: 0, // Start from beginning
              isLocked: true, // Locked until previous is complete
              xpReward: 180,
              estimatedTime: "3 hours"
            }
          ]
        }
      ]
    },
    {
      id: "python",
      title: "Python Programming",
      icon: <Code className="w-6 h-6" />,
      description: "Learn Python from basics to advanced concepts",
      progress: 0, // Start from 0%
      totalModules: 15,
      completedModules: 0, // Start with 0 completed
      xpReward: 3000,
      difficulty: "Beginner",
      estimatedTime: "10 weeks",
      paths: [
        {
          id: "python-basics",
          title: "Python Basics",
          progress: 0, // Start from 0%
          modules: [
            {
              id: "python-intro",
              title: "Introduction to Python",
              description: "Get started with Python programming",
              progress: 0, // Start from beginning
              isLocked: false,
              xpReward: 80,
              estimatedTime: "1 hour"
            },
            {
              id: "variables-types",
              title: "Variables and Data Types",
              description: "Learn about Python variables and basic data types",
              progress: 0, // Start from beginning
              isLocked: true, // Locked until previous is complete
              xpReward: 100,
              estimatedTime: "1.5 hours"
            },
            {
              id: "control-flow",
              title: "Control Flow",
              description: "Master if statements, loops, and conditional logic",
              progress: 0, // Start from beginning
              isLocked: true, // Locked until previous is complete
              xpReward: 120,
              estimatedTime: "2 hours"
            }
          ]
        }
      ]
    },
    {
      id: "java",
      title: "Java Programming",
      icon: <Database className="w-6 h-6" />,
      description: "Object-oriented programming with Java",
      progress: 0, // Start from 0%
      totalModules: 18,
      completedModules: 0, // Start with 0 completed
      xpReward: 3500,
      difficulty: "Intermediate",
      estimatedTime: "12 weeks",
      paths: [
        {
          id: "java-basics",
          title: "Java Basics",
          progress: 0, // Start from 0%
          modules: [
            {
              id: "java-intro",
              title: "Introduction to Java",
              description: "Learn Java fundamentals and setup",
              progress: 0, // Start from beginning
              isLocked: false,
              xpReward: 90,
              estimatedTime: "1.5 hours"
            },
            {
              id: "java-syntax",
              title: "Java Syntax and Structure",
              description: "Master Java syntax and program structure",
              progress: 0, // Start from beginning
              isLocked: true, // Locked until previous is complete
              xpReward: 110,
              estimatedTime: "2 hours"
            },
            {
              id: "oop-concepts",
              title: "Object-Oriented Programming",
              description: "Learn classes, objects, and OOP principles",
              progress: 0, // Start from beginning
              isLocked: true, // Locked until previous is complete
              xpReward: 150,
              estimatedTime: "3 hours"
            }
          ]
        }
      ]
    }
  ];

  const selectedSkillData = skills.find(skill => skill.id === selectedSkill);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Learning Dashboard</h1>
        <p className="text-muted-foreground">Choose a skill and start your coding journey</p>
      </div>

      {!selectedSkill ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <Card
              key={skill.id}
              className="module-card cursor-pointer"
              onClick={() => setSelectedSkill(skill.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      {skill.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{skill.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {skill.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <ProgressRing progress={skill.progress} size={56}>
                    <span className="text-sm font-bold">{skill.progress}%</span>
                  </ProgressRing>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{skill.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{skill.completedModules}/{skill.totalModules} modules</span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{skill.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{skill.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Back button and skill header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedSkill(null)}
              className="mb-4"
            >
              ← Back to Skills
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center">
              {selectedSkillData?.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{selectedSkillData?.title}</h1>
              <p className="text-muted-foreground">{selectedSkillData?.description}</p>
            </div>
            <div className="ml-auto">
              <ProgressRing progress={selectedSkillData?.progress || 0} size={80}>
                <span className="text-lg font-bold">{selectedSkillData?.progress}%</span>
              </ProgressRing>
            </div>
          </div>

          {/* Skill paths */}
          {selectedSkillData?.paths.map((path) => (
            <Card key={path.id} className="module-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                  <Badge variant="outline">
                    {path.progress}% Complete
                  </Badge>
                </div>
                <Progress value={path.progress} className="h-3 mt-2" />
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4 skill-path">
                  {path.modules.map((module, index) => (
                    <div key={module.id} className="flex items-center space-x-4 p-4 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          module.progress === 100 
                            ? "bg-gradient-success" 
                            : module.progress > 0 
                              ? "bg-gradient-primary" 
                              : module.isLocked 
                                ? "bg-muted" 
                                : "bg-gradient-primary"
                        }`}>
                          {module.progress === 100 ? (
                            <CheckCircle className="w-6 h-6 text-success-foreground" />
                          ) : module.isLocked ? (
                            <Lock className="w-6 h-6 text-muted-foreground" />
                          ) : (
                            <PlayCircle className="w-6 h-6 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{module.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                        
                        {module.progress > 0 && module.progress < 100 && (
                          <Progress value={module.progress} className="h-2 mb-2" />
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{module.estimatedTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{module.xpReward} XP</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Link
                          to={`/skill/${selectedSkill}/${module.id}`}
                          className={module.isLocked ? "pointer-events-none" : ""}
                        >
                          <Button 
                            variant={module.progress === 100 ? "outline" : "default"}
                            size="sm"
                            disabled={module.isLocked}
                          >
                            {module.progress === 100 ? "Review" : module.progress > 0 ? "Continue" : "Start Learning"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Learning;