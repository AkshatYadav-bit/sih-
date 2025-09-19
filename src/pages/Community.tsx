import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, Heart, Reply, Award, Users, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardCard } from "@/components/DashboardCard";
import { LevelBadge } from "@/components/ui/level-badge";
import { cn } from "@/lib/utils";

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: number;
  };
  title: string;
  content: string;
  subject: "math" | "physics" | "chemistry" | "computer" | "general";
  timestamp: string;
  likes: number;
  replies: number;
  isLiked: boolean;
  isHelped: boolean;
  xpReward?: number;
  tags: string[];
}

const mockPosts: CommunityPost[] = [
  {
    id: "1",
    author: { name: "Rahul Verma", avatar: "👦", level: 8 },
    title: "Need help with force calculation!",
    content: "I'm working on a problem where a 5kg box is being pushed with 20N force, but there's also 8N of friction. How do I calculate the net force and acceleration?",
    subject: "physics",
    timestamp: "2 hours ago",
    likes: 3,
    replies: 5,
    isLiked: false,
    isHelped: false,
    xpReward: 15,
    tags: ["forces", "acceleration", "friction"]
  },
  {
    id: "2", 
    author: { name: "Meera Shah", avatar: "👧", level: 12 },
    title: "Fraction word problems strategy?",
    content: "I understand basic fractions, but when they appear in word problems I get confused. Any tips for identifying what operation to use?",
    subject: "math",
    timestamp: "4 hours ago", 
    likes: 7,
    replies: 8,
    isLiked: true,
    isHelped: true,
    tags: ["fractions", "word-problems", "strategy"]
  },
  {
    id: "3",
    author: { name: "Aryan Kumar", avatar: "👨", level: 10 },
    title: "Amazing chemistry experiment results!",
    content: "Just finished the virtual acid-base experiment. The color changes were so cool! Has anyone tried the advanced reactions yet?",
    subject: "chemistry",
    timestamp: "1 day ago",
    likes: 12,
    replies: 3,
    isLiked: false,
    isHelped: false,
    tags: ["experiments", "acid-base", "reactions"]
  },
  {
    id: "4",
    author: { name: "Lisa Patel", avatar: "👩", level: 9 },
    title: "Looking for study group for algorithms",
    content: "Starting the algorithm unit next week. Anyone interested in forming a study group? We could solve problems together and help each other out!",
    subject: "computer",
    timestamp: "1 day ago",
    likes: 5,
    replies: 12,
    isLiked: true,
    isHelped: false,
    tags: ["algorithms", "study-group", "collaboration"]
  },
  {
    id: "5",
    author: { name: "Dev Singh", avatar: "👦", level: 7 },
    title: "Energy conservation confusion",
    content: "In the roller coaster simulation, why does the car slow down at the top even though energy is conserved? Is it because of the conversion between kinetic and potential energy?",
    subject: "physics",
    timestamp: "2 days ago",
    likes: 4,
    replies: 6,
    isLiked: false,
    isHelped: true,
    tags: ["energy", "conservation", "simulation"]
  }
];

export default function Community() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "math" | "physics" | "chemistry" | "computer">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getSubjectColor = (subject: CommunityPost["subject"]) => {
    const colors = {
      math: "bg-math text-white",
      physics: "bg-physics text-white",
      chemistry: "bg-science text-white", 
      computer: "bg-computer text-white",
      general: "bg-muted text-muted-foreground"
    };
    return colors[subject];
  };

  const getSubjectIcon = (subject: CommunityPost["subject"]) => {
    const icons = {
      math: "🔢",
      physics: "⚡",
      chemistry: "🧪",
      computer: "💻",
      general: "💬"
    };
    return icons[subject];
  };

  const filteredPosts = mockPosts.filter(post => {
    const matchesFilter = selectedFilter === "all" || post.subject === selectedFilter;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const handleLike = (postId: string) => {
    // In real app, would update backend
    console.log("Liked post:", postId);
  };

  const handleHelp = (postId: string) => {
    // In real app, would navigate to help/reply interface
    console.log("Helping with post:", postId);
  };

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
            <Users className="text-primary" size={24} />
            Community
          </h1>
          
          <Button className="flex items-center gap-2">
            <MessageSquare size={16} />
            Ask Question
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <DashboardCard className="text-center">
            <MessageSquare className="mx-auto mb-2 text-primary" size={24} />
            <div className="text-lg font-bold">{mockPosts.length}</div>
            <div className="text-sm text-muted-foreground">Active Discussions</div>
          </DashboardCard>
          
          <DashboardCard className="text-center">
            <Award className="mx-auto mb-2 text-accent" size={24} />
            <div className="text-lg font-bold">
              {mockPosts.filter(p => p.xpReward).reduce((sum, p) => sum + (p.xpReward || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">XP Available</div>
          </DashboardCard>
          
          <DashboardCard className="text-center">
            <Heart className="mx-auto mb-2 text-red-500" size={24} />
            <div className="text-lg font-bold">
              {mockPosts.reduce((sum, p) => sum + p.likes, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Likes</div>
          </DashboardCard>
          
          <DashboardCard className="text-center">
            <Reply className="mx-auto mb-2 text-success" size={24} />
            <div className="text-lg font-bold">
              {mockPosts.filter(p => p.isHelped).length}
            </div>
            <div className="text-sm text-muted-foreground">Solved Problems</div>
          </DashboardCard>
        </div>

        {/* Search and Filters */}
        <DashboardCard className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search discussions, questions, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
            </Button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {[
              { key: "all", label: "All Topics", icon: "💬" },
              { key: "math", label: "Mathematics", icon: "🔢" },
              { key: "physics", label: "Physics", icon: "⚡" },
              { key: "chemistry", label: "Chemistry", icon: "🧪" },
              { key: "computer", label: "Computer Science", icon: "💻" }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors",
                  selectedFilter === filter.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </DashboardCard>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <DashboardCard key={post.id} clickable className="hover:shadow-button">
              <div className="space-y-4">
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{post.author.avatar}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.author.name}</span>
                        <LevelBadge level={post.author.level} />
                      </div>
                      <div className="text-sm text-muted-foreground">{post.timestamp}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getSubjectColor(post.subject))}>
                      {getSubjectIcon(post.subject)} {post.subject.charAt(0).toUpperCase() + post.subject.slice(1)}
                    </span>
                    {post.xpReward && (
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                        +{post.xpReward} XP
                      </span>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <div>
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{post.content}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-muted rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={cn(
                        "flex items-center gap-1 text-sm transition-colors",
                        post.isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                      )}
                    >
                      <Heart size={16} className={post.isLiked ? "fill-current" : ""} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                      <Reply size={16} />
                      <span>{post.replies} replies</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {post.isHelped && (
                      <span className="flex items-center gap-1 text-success text-sm">
                        <Award size={14} />
                        <span>Solved</span>
                      </span>
                    )}
                    
                    {!post.isHelped && post.xpReward && (
                      <Button 
                        size="sm" 
                        onClick={() => handleHelp(post.id)}
                        className="flex items-center gap-1"
                      >
                        <Award size={14} />
                        Help & earn {post.xpReward} XP
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-6">
            <Button variant="outline" size="lg">
              Load More Discussions
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <DashboardCard className="text-center py-12">
            <MessageSquare className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Be the first to start a discussion!"}
            </p>
            <Button>
              <MessageSquare className="mr-2" size={16} />
              Ask a Question
            </Button>
          </DashboardCard>
        )}
      </div>
    </div>
  );
}