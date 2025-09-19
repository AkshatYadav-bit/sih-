import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Crown, Zap, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/DashboardCard";
import { LevelBadge } from "@/components/ui/level-badge";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  weeklyXp: number;
  isMe?: boolean;
  badges: string[];
  school: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Rajat Kumar",
    avatar: "👨",
    xp: 2890,
    level: 15,
    streak: 12,
    weeklyXp: 340,
    badges: ["Math Wizard", "Physics Expert", "Team Player"],
    school: "Delhi Public School"
  },
  {
    id: "2", 
    name: "Priya Sharma",
    avatar: "👩",
    xp: 2650,
    level: 14,
    streak: 8,
    weeklyXp: 290,
    badges: ["Science Explorer", "Algorithm Master"],
    school: "St. Mary's School"
  },
  {
    id: "3",
    name: "Anaya Patel",
    avatar: "👧",
    xp: 2350,
    level: 12,
    streak: 7,
    weeklyXp: 280,
    isMe: true,
    badges: ["Quick Learner", "Force Master"],
    school: "Modern High School"
  },
  {
    id: "4",
    name: "Arjun Singh",
    avatar: "👦",
    xp: 2100,
    level: 11,
    streak: 5,
    weeklyXp: 245,
    badges: ["Math Genius", "Energy Expert"],
    school: "Delhi Public School"
  },
  {
    id: "5",
    name: "Kavya Reddy",
    avatar: "👧",
    xp: 1980,
    level: 11,
    streak: 9,
    weeklyXp: 220,
    badges: ["Chemistry Star", "Team Leader"],
    school: "International School"
  },
  {
    id: "6",
    name: "Rohit Gupta",
    avatar: "👨",
    xp: 1850,
    level: 10,
    streak: 3,
    weeklyXp: 195,
    badges: ["Algorithm Wizard"],
    school: "Modern High School"
  },
  {
    id: "7",
    name: "Sneha Joshi",
    avatar: "👩",
    xp: 1720,
    level: 10,
    streak: 11,
    weeklyXp: 180,
    badges: ["Streak Master", "Physics Pro"],
    school: "St. Mary's School"
  },
  {
    id: "8",
    name: "Vikram Rao",
    avatar: "👦",
    xp: 1650,
    level: 9,
    streak: 4,
    weeklyXp: 165,
    badges: ["Quick Thinker"],
    school: "International School"
  }
];

export default function Leaderboard() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<"all" | "weekly" | "monthly">("all");
  const [scope, setScope] = useState<"school" | "city" | "global">("school");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-500" size={24} />;
      case 2: return <Medal className="text-gray-400" size={24} />;
      case 3: return <Medal className="text-amber-600" size={24} />;
      default: return (
        <div className="w-6 h-6 rounded-full bg-gradient-primary text-white text-sm flex items-center justify-center font-bold">
          {rank}
        </div>
      );
    }
  };

  const getLeaderboardData = () => {
    let sortedData = [...mockLeaderboard];
    
    if (timeframe === "weekly") {
      sortedData.sort((a, b) => b.weeklyXp - a.weeklyXp);
    } else {
      sortedData.sort((a, b) => b.xp - a.xp);
    }

    if (scope === "school") {
      const mySchool = sortedData.find(entry => entry.isMe)?.school;
      if (mySchool) {
        sortedData = sortedData.filter(entry => entry.school === mySchool);
      }
    }

    return sortedData;
  };

  const leaderboardData = getLeaderboardData();
  const myRank = leaderboardData.findIndex(entry => entry.isMe) + 1;
  const myData = leaderboardData.find(entry => entry.isMe);

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
          
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="text-yellow-500" size={24} />
            Leaderboard
          </h1>
          
          <div className="text-sm text-muted-foreground">
            Rank #{myRank}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* My Rank Card */}
        {myData && (
          <DashboardCard variant="primary" className="mb-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{myData.avatar}</div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-1">Your Rank: #{myRank}</h2>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span>{myData.xp} Total XP</span>
                  <span>{myData.weeklyXp} This Week</span>
                  <span>{myData.streak} Day Streak</span>
                </div>
              </div>
              <LevelBadge level={myData.level} />
            </div>
          </DashboardCard>
        )}

        {/* Filter Controls */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <DashboardCard title="Time Period">
            <div className="flex gap-2">
              {[
                { key: "all", label: "All Time", icon: <Calendar size={14} /> },
                { key: "weekly", label: "This Week", icon: <Target size={14} /> },
                { key: "monthly", label: "This Month", icon: <Zap size={14} /> }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setTimeframe(option.key as any)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    timeframe === option.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Scope">
            <div className="flex gap-2">
              {[
                { key: "school", label: "My School" },
                { key: "city", label: "My City" },
                { key: "global", label: "Global" }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setScope(option.key as any)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    scope === option.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* Top 3 Podium */}
        <DashboardCard className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Top Performers</h2>
          <div className="flex justify-center items-end gap-4 mb-6">
            {leaderboardData.slice(0, 3).map((entry, index) => {
              const rank = index + 1;
              const heights = ["h-24", "h-32", "h-20"];
              
              return (
                <div key={entry.id} className="text-center">
                  <div className="mb-2">
                    <div className="text-3xl mb-1">{entry.avatar}</div>
                    <div className="text-sm font-medium">{entry.name.split(' ')[0]}</div>
                    <div className="text-xs text-muted-foreground">
                      {timeframe === "weekly" ? entry.weeklyXp : entry.xp} XP
                    </div>
                  </div>
                  <div className={cn(
                    "w-20 rounded-t-lg flex flex-col justify-end items-center p-2",
                    heights[index],
                    rank === 1 ? "bg-yellow-100 border-2 border-yellow-400" :
                    rank === 2 ? "bg-gray-100 border-2 border-gray-400" :
                    "bg-amber-100 border-2 border-amber-600"
                  )}>
                    {getRankIcon(rank)}
                    <LevelBadge level={entry.level} />
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>

        {/* Full Leaderboard */}
        <DashboardCard title={`Full Leaderboard (${leaderboardData.length} students)`}>
          <div className="space-y-2">
            {leaderboardData.map((entry, index) => {
              const rank = index + 1;
              
              return (
                <div
                  key={entry.id}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-lg transition-colors",
                    entry.isMe 
                      ? "bg-primary/10 border border-primary/20" 
                      : "bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <div className="w-8 flex justify-center">
                    {getRankIcon(rank)}
                  </div>
                  
                  <div className="text-2xl">{entry.avatar}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{entry.name}</span>
                      {entry.isMe && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{entry.school}</span>
                      <span>{entry.badges.length} badges</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold">
                      {timeframe === "weekly" ? entry.weeklyXp : entry.xp} XP
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Level {entry.level}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-streak">
                    <Zap size={14} className="fill-current" />
                    <span className="text-sm font-medium">{entry.streak}</span>
                  </div>
                  
                  <LevelBadge level={entry.level} />
                </div>
              );
            })}
          </div>
        </DashboardCard>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <DashboardCard className="text-center">
            <Trophy className="mx-auto mb-2 text-yellow-500" size={32} />
            <div className="text-lg font-bold">
              {leaderboardData.filter((_, i) => i < 3).some(e => e.isMe) ? "Top 3!" : `#${myRank}`}
            </div>
            <div className="text-sm text-muted-foreground">Your Rank</div>
          </DashboardCard>
          
          <DashboardCard className="text-center">
            <Zap className="mx-auto mb-2 text-accent" size={32} />
            <div className="text-lg font-bold">{myData?.weeklyXp || 0}</div>
            <div className="text-sm text-muted-foreground">XP This Week</div>
          </DashboardCard>
          
          <DashboardCard className="text-center">
            <Target className="mx-auto mb-2 text-primary" size={32} />
            <div className="text-lg font-bold">{myData?.streak || 0}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}