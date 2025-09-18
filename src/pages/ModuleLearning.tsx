import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import XPBadge from "@/components/gamification/XPBadge";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Lightbulb,
  Target,
  Zap,
  Trophy,
  Code,
  Play,
  AlertCircle,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface TheorySection {
  id: string;
  title: string;
  content: string;
  type: "explanation" | "example" | "practice" | "quiz";
  xpReward: number;
  questions?: QuizQuestion[];
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  totalSections: number;
  xpReward: number;
  sections: TheorySection[];
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  answers: Record<string, number>;
  onAnswerChange: (answers: Record<string, number>) => void;
  submitted: boolean;
  showAnswers: boolean;
  onSubmit: () => void;
  onViewAnswers: () => void;
}

const QuizComponent = ({ questions, answers, onAnswerChange, submitted, showAnswers, onSubmit, onViewAnswers }: QuizComponentProps) => {
  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    if (!submitted) {
      onAnswerChange({ ...answers, [questionId]: answerIndex });
    }
  };

  const getOptionStyle = (questionId: string, optionIndex: number) => {
    if (!submitted && !showAnswers) {
      return `cursor-pointer p-4 rounded-lg border-2 transition-all ${
        answers[questionId] === optionIndex 
          ? "border-primary bg-primary/10" 
          : "border-border hover:border-primary/50"
      }`;
    }
    
    if (showAnswers) {
      const question = questions.find(q => q.id === questionId);
      const isCorrect = question?.correctAnswer === optionIndex;
      const isSelected = answers[questionId] === optionIndex;
      
      if (isCorrect) {
        return "p-4 rounded-lg border-2 border-success bg-success/10";
      } else if (isSelected && !isCorrect) {
        return "p-4 rounded-lg border-2 border-destructive bg-destructive/10";
      } else {
        return "p-4 rounded-lg border-2 border-border/30 opacity-60";
      }
    }
    
    return `p-4 rounded-lg border-2 ${
      answers[questionId] === optionIndex 
        ? "border-primary bg-primary/10" 
        : "border-border/30 opacity-60"
    }`;
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined);
  const getScore = () => {
    return questions.reduce((score, question) => {
      return score + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">Complete this interactive quiz to test your understanding of HTML fundamentals.</p>
      </div>
      
      {questions.map((question, index) => (
        <div key={question.id} className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={getOptionStyle(question.id, optionIndex)}
                    onClick={() => handleAnswerSelect(question.id, optionIndex)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                        answers[question.id] === optionIndex 
                          ? "border-primary bg-primary text-primary-foreground" 
                          : "border-muted-foreground"
                      }`}>
                        {answers[question.id] === optionIndex && "✓"}
                      </div>
                      <span className="font-medium">{option}</span>
                      {showAnswers && question.correctAnswer === optionIndex && (
                        <CheckCircle className="w-5 h-5 text-success ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {showAnswers && question.explanation && (
                <div className="mt-4 p-4 rounded-lg bg-muted/30 border-l-4 border-primary">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-primary">Explanation</p>
                      <p className="text-sm text-muted-foreground mt-1">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {/* Quiz Actions */}
      <div className="flex items-center justify-center space-x-4 pt-6 border-t border-border/50">
        {!submitted ? (
          <Button 
            onClick={onSubmit}
            disabled={!allAnswered}
            className="px-8"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Submit Quiz
          </Button>
        ) : (
          <div className="flex items-center space-x-4">
            {showAnswers ? (
              <div className="text-center">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Quiz Complete!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Score: {getScore()}/{questions.length} ({Math.round((getScore() / questions.length) * 100)}%)
                </p>
              </div>
            ) : (
              <Button onClick={onViewAnswers} variant="outline">
                <Lightbulb className="w-4 h-4 mr-2" />
                View Answers
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ModuleLearning = () => {
  const { skillId, moduleId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [isModuleComplete, setIsModuleComplete] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  // Mock module data - in real app, this would come from API
  const moduleData: ModuleData = {
    id: moduleId || "",
    title: getModuleTitle(moduleId),
    description: getModuleDescription(moduleId),
    totalSections: 4,
    xpReward: getModuleXP(moduleId),
    sections: getModuleSections(moduleId)
  };

  function getModuleTitle(moduleId?: string): string {
    const titles: Record<string, string> = {
      "html-foundations": "HTML Foundations",
      "html-structure": "HTML Structure & Tags",
      "forms-inputs": "Forms and Input Elements",
      "python-intro": "Introduction to Python",
      "variables-types": "Variables and Data Types",
      "java-intro": "Introduction to Java",
      "java-syntax": "Java Syntax and Structure"
    };
    return titles[moduleId || ""] || "Module";
  }

  function getModuleDescription(moduleId?: string): string {
    const descriptions: Record<string, string> = {
      "html-foundations": "Master the fundamental building blocks of web development with HTML",
      "html-structure": "Learn how to structure web pages with semantic HTML elements",
      "forms-inputs": "Create interactive forms and handle user input effectively",
      "python-intro": "Get started with Python programming language basics",
      "variables-types": "Understand Python variables and fundamental data types",
      "java-intro": "Learn Java fundamentals and development environment setup",
      "java-syntax": "Master Java syntax, structure, and basic programming concepts"
    };
    return descriptions[moduleId || ""] || "Learn new programming concepts";
  }

  function getModuleXP(moduleId?: string): number {
    const xpValues: Record<string, number> = {
      "html-foundations": 100,
      "html-structure": 120,
      "forms-inputs": 150,
      "python-intro": 80,
      "variables-types": 100,
      "java-intro": 90,
      "java-syntax": 110
    };
    return xpValues[moduleId || ""] || 100;
  }

  function getModuleSections(moduleId?: string): TheorySection[] {
    const sections: Record<string, TheorySection[]> = {
      "html-foundations": [
        {
          id: "what-is-html",
          title: "What is HTML?",
          type: "explanation",
          xpReward: 25,
          content: `🌟 Welcome to the World of HTML!

HTML (HyperText Markup Language) is the backbone of every website you've ever visited. Think of it as the skeleton that gives structure to web pages.

🏗️ Key Concepts:
• HTML uses tags to mark up content
• Tags are enclosed in angle brackets: <tag>
• Most tags come in pairs: opening <tag> and closing </tag>
• Tags can have attributes that provide extra information

🎯 Real-World Analogy:
Imagine building a house:
- HTML is like the frame and walls
- CSS is the paint and decoration
- JavaScript is the electricity and plumbing

✨ Fun Fact: The first website ever created (1991) was just plain HTML - and it's still online today!`
        },
        {
          id: "basic-structure",
          title: "HTML Document Structure",
          type: "example",
          xpReward: 25,
          content: `🎪 Every HTML Document Has a Pattern!

Just like a story has a beginning, middle, and end, every HTML document follows a specific structure:

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first paragraph!</p>
  </body>
</html>

🧩 Breaking It Down:
1. <!DOCTYPE html> - Tells the browser this is HTML5
2. <html> - The root element that wraps everything
3. <head> - Contains metadata (not visible on page)
4. <body> - Contains the visible content
5. <title> - Shows up in the browser tab

🎮 Gamification Tip: Think of <head> as your character's inventory (hidden info) and <body> as what other players see!`
        },
        {
          id: "common-tags",
          title: "Essential HTML Tags",
          type: "practice",
          xpReward: 30,
          content: `🛠️ Master These Power-Up Tags!

Here are the most important HTML tags every web developer should know:

📝 Text Tags:
• <h1> to <h6> - Headings (h1 is biggest, h6 is smallest)
• <p> - Paragraphs
• <strong> - Important text (bold)
• <em> - Emphasized text (italic)

🔗 Link Tags:
• <a href="URL"> - Links to other pages
• <img src="image.jpg" alt="description"> - Images

📋 List Tags:
• <ul> - Unordered list (bullets)
• <ol> - Ordered list (numbers)
• <li> - List items

🎯 Practice Challenge:
Try to create a simple webpage with:
- A main heading
- A paragraph about yourself
- A list of your hobbies
- A link to your favorite website

💡 Pro Tip: Always include the alt attribute for images - it helps screen readers and shows if the image fails to load!`
        },
        {
          id: "knowledge-check",
          title: "Knowledge Check",
          type: "quiz",
          xpReward: 20,
          content: `🧠 Test Your HTML Knowledge!`,
          questions: [
            {
              id: "q1",
              question: "What does HTML stand for?",
              options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language", 
                "Home Tool Markup Language",
                "Hyperlink Text Management Language"
              ],
              correctAnswer: 0,
              explanation: "HTML stands for HyperText Markup Language. It's the standard markup language for creating web pages."
            },
            {
              id: "q2", 
              question: "Which tag is used for the largest heading?",
              options: [
                "<heading>",
                "<h1>",
                "<h6>",
                "<title>"
              ],
              correctAnswer: 1,
              explanation: "The <h1> tag creates the largest heading. HTML has six heading levels from <h1> (largest) to <h6> (smallest)."
            },
            {
              id: "q3",
              question: "What goes inside the <head> section?",
              options: [
                "Visible content that appears on the webpage",
                "Metadata and page information",
                "Only the page title",
                "Images and videos"
              ],
              correctAnswer: 1,
              explanation: "The <head> section contains metadata about the document, including the title, character encoding, CSS links, and other information not directly displayed on the page."
            },
            {
              id: "q4",
              question: "Which attribute is essential for images to improve accessibility?",
              options: [
                "src",
                "width", 
                "alt",
                "height"
              ],
              correctAnswer: 2,
              explanation: "The 'alt' attribute provides alternative text for images, which is crucial for screen readers and accessibility. It also displays if the image fails to load."
            }
          ]
        }
      ]
    };
    return sections[moduleId || ""] || [];
  }

  const progress = ((currentSection + 1) / moduleData.totalSections) * 100;
  const currentSectionData = moduleData.sections[currentSection];

  const handleNextSection = () => {
    if (currentSectionData?.type === "quiz" && !quizSubmitted) {
      toast({
        title: "Complete the Quiz",
        description: "Please submit the quiz before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (currentSection < moduleData.totalSections - 1) {
      setCompletedSections(prev => new Set(prev.add(currentSection)));
      setCurrentSection(prev => prev + 1);
      
      // Reset quiz state for next section
      setQuizAnswers({});
      setQuizSubmitted(false);
      setShowAnswers(false);
      
      // Award XP for completing section
      toast({
        title: "Section Complete! 🎉",
        description: `+${currentSectionData.xpReward} XP earned`,
      });
    } else {
      // Module complete
      setCompletedSections(prev => new Set(prev.add(currentSection)));
      setIsModuleComplete(true);
      
      toast({
        title: "Module Complete! 🏆",
        description: `+${moduleData.xpReward} XP earned. Achievement unlocked!`,
      });
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      // Reset quiz state when going back
      setQuizAnswers({});
      setQuizSubmitted(false);
      setShowAnswers(false);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    toast({
      title: "Quiz Submitted! 📝",
      description: "Great job! Click 'View Answers' to see the correct answers.",
    });
  };

  const handleViewAnswers = () => {
    setShowAnswers(true);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "explanation": return <BookOpen className="w-5 h-5" />;
      case "example": return <Code className="w-5 h-5" />;
      case "practice": return <Target className="w-5 h-5" />;
      case "quiz": return <Trophy className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/learning`)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learning
        </Button>
        
        <XPBadge xp={moduleData.xpReward} variant="compact" />
      </div>

      {/* Module Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">{moduleData.title}</h1>
        <p className="text-muted-foreground mb-4">{moduleData.description}</p>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{currentSection + 1}/{moduleData.totalSections} sections</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>
      </div>

      {!isModuleComplete ? (
        <>
          {/* Current Section */}
          <Card className="module-card mb-6">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  {getSectionIcon(currentSectionData?.type || "")}
                </div>
                <div>
                  <CardTitle className="text-xl">{currentSectionData?.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="capitalize">
                      {currentSectionData?.type}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Zap className="w-3 h-3" />
                      <span>{currentSectionData?.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {currentSectionData?.type === "quiz" ? (
                <QuizComponent 
                  questions={currentSectionData.questions || []}
                  answers={quizAnswers}
                  onAnswerChange={setQuizAnswers}
                  submitted={quizSubmitted}
                  showAnswers={showAnswers}
                  onSubmit={handleQuizSubmit}
                  onViewAnswers={handleViewAnswers}
                />
              ) : (
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                    {currentSectionData?.content}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousSection}
              disabled={currentSection === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              Section {currentSection + 1} of {moduleData.totalSections}
            </div>

            <Button 
              onClick={handleNextSection}
              disabled={currentSectionData?.type === "quiz" && !quizSubmitted}
            >
              {currentSection === moduleData.totalSections - 1 ? "Complete Module" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </>
      ) : (
        /* Module Complete */
        <Card className="module-card achievement-glow">
          <CardContent className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gradient-success flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-success-foreground" />
            </div>
            
            <h2 className="text-2xl font-bold text-gradient mb-2">Module Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Congratulations! You've successfully completed {moduleData.title}
            </p>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <XPBadge xp={moduleData.xpReward} variant="detailed" />
              <Badge className="bg-gradient-success">Achievement Unlocked</Badge>
            </div>
            
            <div className="space-x-4">
              <Button onClick={() => navigate("/learning")}>
                Continue Learning
              </Button>
              <Button variant="outline" onClick={() => {
                setCurrentSection(0);
                setCompletedSections(new Set());
                setIsModuleComplete(false);
                setQuizAnswers({});
                setQuizSubmitted(false);
                setShowAnswers(false);
              }}>
                Review Module
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModuleLearning;