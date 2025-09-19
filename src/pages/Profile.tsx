import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Award, Calendar, Zap, Target, BookOpen, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardCard } from "@/components/DashboardCard";
import { LevelBadge } from "@/components/ui/level-badge";
import { AiBotAvatar } from "@/components/AiBotAvatar";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "learning" | "social" | "achievement" | "streak";
  earnedAt: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
}

const mockProfile = {
  name: "Anaya Patel",
  avatar: "👧",
  level: 12,
  xp: 2350,
  xpToNext: 400,
  totalXp: 2750,
  joinedDate: "2024-01-15",
  streak: 7,
  longestStreak: 15,
  school: "Modern High School",
  grade: "8th Grade",
  subjects: ["Mathematics", "Physics", "Computer Science"],
  studyTime: 145, // hours
  lessonsCompleted: 67,
  questsCompleted: 8,
  friendsHelped: 23
};

const mockBadges: Badge[] = [
  {
    id: "1",
    name: "Force Master",
    description: "Completed all lessons in Forces unit with 90%+ score",
    icon: "⚡",
    category: "learning",
    earnedAt: "2024-03-10",
    rarity: "rare"
  },
  {
    id: "2", 
    name: "Quick Learner",
    description: "Completed 5 lessons in a single day",
    icon: "🚀",
    category: "learning",
    earnedAt: "2024-02-28",
    rarity: "common"
  },
  {
    id: "3",
    name: "Helper",
    description: "Helped 10 classmates with their questions",
    icon: "🤝",
    category: "social",
    earnedAt: "2024-03-05",
    rarity: "rare"
  },
  {
    id: "4",
    name: "Streak Champion",
    description: "Maintained a 7-day learning streak",
    icon: "🔥",
    category: "streak",
    earnedAt: "2024-03-12",
    rarity: "epic"
  },
  {
    id: "5",
    name: "Quest Explorer",
    description: "Completed first quest adventure",
    icon: "🏆",
    category: "achievement",
    earnedAt: "2024-02-15",
    rarity: "common"
  }
];

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Math Wizard",
    description: "Complete all mathematics units",
    progress: 3,
    total: 5,
    reward: "Special Math Crown + 200 XP"
  },
  {
    id: "2",
    title: "Physics Expert", 
    description: "Master all physics concepts",
    progress: 2,
    total: 4,
    reward: "Physics Lab Badge + 300 XP"
  },
  {
    id: "3",
    title: "Community Leader",
    description: "Help 50 students with their questions",
    progress: 23,
    total: 50,
    reward: "Leadership Badge + Mentor Status"
  }
];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "badges" | "achievements" | "stats">("overview");

  const getRarityColor = (rarity: Badge["rarity"]) => {
    switch (rarity) {
      case "common": return "border-gray-400 bg-gray-50";
      case "rare": return "border-blue-400 bg-blue-50";
      case "epic": return "border-purple-400 bg-purple-50";
      case "legendary": return "border-yellow-400 bg-yellow-50";
    }
  };

  const nextLevelProgress = (mockProfile.xp / (mockProfile.xp + mockProfile.xpToNext)) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 shadow-card">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          
          <h1 className="text-xl font-bold">My Profile</h1>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Edit size={16} />
            Edit
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Header */}
        <DashboardCard className="mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar and Basic Info */}
            <div className="text-center">
              <div className="text-8xl mb-2">{mockProfile.avatar}</div>
              <LevelBadge level={mockProfile.level} />
            </div>
            
            {/* Profile Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{mockProfile.name}</h2>
                  <p className="text-muted-foreground">{mockProfile.school} • {mockProfile.grade}</p>
                </div>
                
                <AiBotAvatar 
                  size="sm" 
                  greeting={`Great progress, ${mockProfile.name.split(' ')[0]}! You're doing amazing!`}
                  showMessage={false}
                />
              </div>
              
              {/* XP Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Level {mockProfile.level} Progress</span>
                  <span>{mockProfile.xp} / {mockProfile.xp + mockProfile.xpToNext} XP</span>
                </div>
                <Progress value={nextLevelProgress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-1">
                  {mockProfile.xpToNext} XP to reach Level {mockProfile.level + 1}
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{mockProfile.streak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-accent">{mockProfile.lessonsCompleted}</div>
                  <div className="text-xs text-muted-foreground">Lessons Done</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-success">{mockBadges.length}</div>
                  <div className="text-xs text-muted-foreground">Badges Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-level">{mockProfile.friendsHelped}</div>
                  <div className="text-xs text-muted-foreground">Friends Helped</div>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { key: "overview", label: "Overview", icon: <BookOpen size={16} /> },
            { key: "badges", label: "Badges", icon: <Award size={16} /> },
            { key: "achievements", label: "Achievements", icon: <Star size={16} /> },
            { key: "stats", label: "Statistics", icon: <Target size={16} /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learning Progress */}
            <DashboardCard title="Learning Progress">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Mathematics</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
                
                <div className="flex justify-between text-sm">
                  <span>Physics</span>
                  <span>70%</span>
                </div>
                <Progress value={70} />
                
                <div className="flex justify-between text-sm">
                  <span>Computer Science</span>
                  <span>45%</span>
                </div>
                <Progress value={45} />
              </div>
            </DashboardCard>

            {/* Recent Activity */}
            <DashboardCard title="Recent Activity">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Award className="text-accent" size={16} />
                  <span>Earned "Force Master" badge</span>
                  <span className="text-muted-foreground ml-auto">2 days ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BookOpen className="text-primary" size={16} />
                  <span>Completed "Net Force Basics"</span>
                  <span className="text-muted-foreground ml-auto">3 days ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="text-success" size={16} />
                  <span>Helped Rahul with force problem</span>
                  <span className="text-muted-foreground ml-auto">4 days ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Zap className="text-streak" size={16} />
                  <span>Reached 7-day streak!</span>
                  <span className="text-muted-foreground ml-auto">1 week ago</span>
                </div>
              </div>
            </DashboardCard>

            {/* Join Date & School Info */}
            <DashboardCard title="Profile Information" className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar size={16} />
                    Member Since
                  </h4>
                  <p className="text-muted-foreground">January 15, 2024</p>
                  <p className="text-sm text-muted-foreground">{Math.ceil((Date.now() - new Date(mockProfile.joinedDate).getTime()) / (1000 * 60 * 60 * 24))} days ago</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Study Time</h4>
                  <p className="text-muted-foreground">{mockProfile.studyTime} hours total</p>
                  <p className="text-sm text-muted-foreground">~{(mockProfile.studyTime / Math.ceil((Date.now() - new Date(mockProfile.joinedDate).getTime()) / (1000 * 60 * 60 * 24))).toFixed(1)} hours/day</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Favorite Subjects</h4>
                  <div className="flex flex-wrap gap-1">
                    {mockProfile.subjects.map((subject) => (
                      <span key={subject} className="px-2 py-1 bg-muted rounded-full text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockBadges.map((badge) => (
              <DashboardCard 
                key={badge.id} 
                className={`text-center border-2 ${getRarityColor(badge.rarity)}`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold mb-1">{badge.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="capitalize">{badge.rarity}</span>
                  <span className="text-muted-foreground">
                    {new Date(badge.earnedAt).toLocaleDateString()}
                  </span>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-4">
            {mockAchievements.map((achievement) => (
              <DashboardCard key={achievement.id}>
                <div className="flex items-center gap-4">
                  <Star className="text-accent" size={32} />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.total}</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                    <p className="text-xs text-accent mt-1">Reward: {achievement.reward}</p>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard className="text-center">
              <Zap className="mx-auto mb-2 text-primary" size={32} />
              <div className="text-2xl font-bold">{mockProfile.totalXp}</div>
              <div className="text-sm text-muted-foreground">Total XP Earned</div>
            </DashboardCard>
            
            <DashboardCard className="text-center">
              <Target className="mx-auto mb-2 text-accent" size={32} />
              <div className="text-2xl font-bold">{mockProfile.longestStreak}</div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
            </DashboardCard>
            
            <DashboardCard className="text-center">
              <BookOpen className="mx-auto mb-2 text-success" size={32} />
              <div className="text-2xl font-bold">{mockProfile.lessonsCompleted}</div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </DashboardCard>
            
            <DashboardCard className="text-center">
              <Award className="mx-auto mb-2 text-level" size={32} />
              <div className="text-2xl font-bold">{mockProfile.questsCompleted}</div>
              <div className="text-sm text-muted-foreground">Quests Completed</div>
            </DashboardCard>
            
            <DashboardCard className="text-center">
              <Users className="mx-auto mb-2 text-pink-500" size={32} />
              <div className="text-2xl font-bold">{mockProfile.friendsHelped}</div>
              <div className="text-sm text-muted-foreground">Students Helped</div>
            </DashboardCard>
            
            <DashboardCard className="text-center">
              <Calendar className="mx-auto mb-2 text-blue-500" size={32} />
              <div className="text-2xl font-bold">{mockProfile.studyTime}h</div>
              <div className="text-sm text-muted-foreground">Total Study Time</div>
            </DashboardCard>
          </div>
        )}
      </div>
    </div>
  );
}