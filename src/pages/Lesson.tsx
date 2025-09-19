import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Lightbulb, Volume2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AiBotAvatar } from "@/components/AiBotAvatar";
import { toast } from "sonner";

interface Question {
  id: string;
  type: "mcq" | "dragdrop" | "simulation";
  question: string;
  options?: string[];
  correct: string | number;
  explanation: string;
  hint: string;
}

const mockLesson = {
  id: "1",
  title: "Net Force Basics",
  skillName: "Forces",
  progress: 75,
  questions: [
    {
      id: "q1",
      type: "mcq" as const,
      question: "What happens when forces are balanced on an object?",
      options: [
        "The object accelerates",
        "The object remains at rest or moves at constant velocity",
        "The object moves in circles",
        "The object falls down"
      ],
      correct: 1,
      explanation: "When forces are balanced (net force = 0), an object will remain at rest if it was at rest, or continue moving at constant velocity if it was moving.",
      hint: "Think about Newton's First Law - what happens when there's no net force?"
    },
    {
      id: "q2",
      type: "mcq" as const,
      question: "If a 10N force pushes right and a 6N force pushes left, what is the net force?",
      options: ["16N right", "4N right", "4N left", "16N left"],
      correct: 1,
      explanation: "Net force = 10N - 6N = 4N in the direction of the larger force (right).",
      hint: "Subtract the smaller force from the larger force."
    },
    {
      id: "q3",
      type: "mcq" as const,
      question: "Which of these is a contact force?",
      options: ["Gravity", "Magnetic force", "Friction", "Electric force"],
      correct: 2,
      explanation: "Friction is a contact force because it occurs when two surfaces are in direct contact.",
      hint: "Contact forces require objects to be touching each other."
    }
  ]
};

export default function Lesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);

  const question = mockLesson.questions[currentQuestion];
  const isLastQuestion = currentQuestion === mockLesson.questions.length - 1;
  const progressPercent = ((currentQuestion + 1) / mockLesson.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setScore(score + 10);
      toast.success("Correct! +10 XP");
    } else {
      setHearts(hearts - 1);
      toast.error("Not quite right. Try again!");
    }
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === question.correct;
    
    if (isLastQuestion) {
      // Lesson complete
      toast.success(`Lesson complete! Final score: ${score + (isCorrect ? 10 : 0)} XP`);
      navigate("/");
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  const handleHint = () => {
    setShowHint(true);
    if (hearts > 1) {
      setHearts(hearts - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 shadow-card">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Exit
          </Button>
          
          <div className="flex-1 mx-4">
            <Progress value={progressPercent} className="h-2" />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart 
                  key={i} 
                  size={16} 
                  className={i < hearts ? "fill-red-500 text-red-500" : "text-muted-foreground"} 
                />
              ))}
            </div>
            <span className="text-sm font-medium ml-2">{score} XP</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{mockLesson.title}</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {mockLesson.questions.length}
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card mb-6">
          <div className="flex items-start gap-4 mb-6">
            <AiBotAvatar size="sm" showMessage={false} />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
              
              {question.type === "mcq" && (
                <div className="space-y-3">
                  {question.options?.map((option, index) => {
                    let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all";
                    
                    if (showFeedback) {
                      if (index === question.correct) {
                        buttonClass += " border-success bg-success/10 text-success";
                      } else if (index === selectedAnswer && selectedAnswer !== question.correct) {
                        buttonClass += " border-destructive bg-destructive/10 text-destructive";
                      } else {
                        buttonClass += " border-muted bg-muted/50";
                      }
                    } else if (selectedAnswer === index) {
                      buttonClass += " border-primary bg-primary/10";
                    } else {
                      buttonClass += " border-muted hover:border-primary/50 hover:bg-primary/5";
                    }

                    return (
                      <button
                        key={index}
                        className={buttonClass}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>
                          {showFeedback && index === question.correct && (
                            <CheckCircle className="ml-auto text-success" size={20} />
                          )}
                          {showFeedback && index === selectedAnswer && selectedAnswer !== question.correct && (
                            <XCircle className="ml-auto text-destructive" size={20} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {showFeedback && (
            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          {showHint && !showFeedback && (
            <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-start gap-2">
                <Lightbulb className="text-accent mt-0.5" size={16} />
                <div>
                  <h3 className="font-semibold text-accent mb-1">Hint:</h3>
                  <p className="text-sm">{question.hint}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {!showHint && !showFeedback && (
              <Button variant="outline" onClick={handleHint} className="flex items-center gap-2">
                <Lightbulb size={16} />
                Hint
              </Button>
            )}
            <Button variant="outline" className="flex items-center gap-2">
              <Volume2 size={16} />
              Listen
            </Button>
          </div>

          <div>
            {!showFeedback ? (
              <Button 
                onClick={handleSubmit} 
                disabled={selectedAnswer === null}
                size="lg"
              >
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} size="lg">
                {isLastQuestion ? "Complete" : "Continue"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}