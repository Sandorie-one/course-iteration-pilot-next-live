
import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, X, Clock, Activity, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import BloomsTaxonomyChart from "../BloomsTaxonomyChart";
import PerformanceSummary from "../PerformanceSummary";
import { Progress } from "@/components/ui/progress";

// Helper function to get color based on performance
const getPerformanceColor = (value: number): string => {
  if (value >= 80) return "bg-green-100 text-green-700 border-green-200";
  if (value >= 60) return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-red-100 text-red-700 border-red-200";
};

// Helper function to get icon based on performance
const getPerformanceIcon = (value: number) => {
  if (value >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
  if (value >= 60) return <AlertTriangle className="h-4 w-4 text-amber-600" />;
  return <X className="h-4 w-4 text-red-600" />;
};

// Helper function to get trend icon
const getTrendIcon = (trend: "up" | "down" | "neutral") => {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-green-600" />;
  if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-red-600" />;
  return null;
};

const CoursePerformance = () => {
  const { selectedCourse, performanceData, isLoading } = useWizard();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return <div className="flex justify-center py-6">Loading course performance data...</div>;
  }

  if (!selectedCourse || !performanceData) {
    return <div className="text-center py-6">Please select a course first</div>;
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">Course Performance Analysis</h2>
        <p className="text-slate-500 text-sm">
          Review performance data for {selectedCourse.title} ({selectedCourse.code}) to identify 
          areas for improvement in your new course.
        </p>
      </div>

      <PerformanceSummary 
        healthScore={performanceData.courseHealthScore}
        opportunityCount={performanceData.opportunityCount}
      />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bloomstaxonomy">Bloom's Taxonomy</TabsTrigger>
          <TabsTrigger value="engagement">Student Engagement</TabsTrigger>
          <TabsTrigger value="challenges">Learning Challenges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-4">
            {/* Stacked Strengths & Improvement Areas instead of side-by-side */}
            <div className="space-y-4">
              {/* Strengths Card - Modified */}
              <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden border-green-200">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 border-b border-green-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 p-1 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <CardTitle className="text-base">Course Strengths</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs">
                      {performanceData.strengths.length} identified
                    </Badge>
                  </div>
                  <CardDescription className="text-xs mt-0.5">
                    Key areas where your course performs well
                  </CardDescription>
                </div>
                
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {performanceData.strengths.map((strength, index) => {
                      return (
                        <li 
                          key={index} 
                          className="p-2 hover:bg-slate-50 transition-colors"
                        >
                          <div className="font-medium text-sm">{strength}</div>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Improvement Areas Card - Modified */}
              <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden border-amber-200">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 border-b border-amber-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-100 p-1 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                      <CardTitle className="text-base">Improvement Areas</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                      {performanceData.weaknesses.length} opportunities
                    </Badge>
                  </div>
                  <CardDescription className="text-xs mt-0.5">
                    Focused opportunities to enhance your course
                  </CardDescription>
                </div>
                
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {performanceData.weaknesses.map((weakness, index) => {
                      // Example priority data - would come from API in real implementation
                      const priority = ["High", "Medium", "Low"][index % 3];
                      const priorityColor = 
                        priority === "High" ? "bg-red-50 text-red-700 border-red-100" :
                        priority === "Medium" ? "bg-amber-50 text-amber-700 border-amber-100" :
                        "bg-blue-50 text-blue-700 border-blue-100";
                      
                      return (
                        <li 
                          key={index} 
                          className="p-2 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div className="font-medium text-sm">{weakness}</div>
                            <Badge className={`${priorityColor} text-xs`}>
                              {priority} Priority
                            </Badge>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Student Feedback cards - Modified to stack vertically */}
            <div className="space-y-4">
              <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden border-blue-200">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 border-b border-blue-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Positive Feedback</CardTitle>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
                      Student insights
                    </Badge>
                  </div>
                  <CardDescription className="text-xs mt-0.5">What students appreciated most</CardDescription>
                </div>
                
                <CardContent className="pt-2 px-3 pb-3">
                  <ul className="space-y-2">
                    {performanceData.studentFeedback.positive.map((feedback, index) => (
                      <li key={index} className="bg-blue-50 border border-blue-100 rounded-lg p-2">
                        <div className="flex items-start gap-2">
                          <div className="bg-blue-100 p-0.5 rounded-full mt-0.5">
                            <CheckCircle className="h-3 w-3 text-blue-700" />
                          </div>
                          <div>
                            <p className="text-xs">{feedback}</p>
                            <div className="mt-1 flex items-center text-xs text-blue-700">
                              <span className="font-medium text-xs">Mentioned by 32% of students</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden border-purple-200">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 border-b border-purple-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Critical Feedback</CardTitle>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100 text-xs">
                      Areas for improvement
                    </Badge>
                  </div>
                  <CardDescription className="text-xs mt-0.5">Areas students identified for improvement</CardDescription>
                </div>
                
                <CardContent className="pt-2 px-3 pb-3">
                  <ul className="space-y-2">
                    {performanceData.studentFeedback.negative.map((feedback, index) => (
                      <li key={index} className="bg-purple-50 border border-purple-100 rounded-lg p-2">
                        <div className="flex items-start gap-2">
                          <div className="bg-purple-100 p-0.5 rounded-full mt-0.5">
                            <AlertTriangle className="h-3 w-3 text-purple-700" />
                          </div>
                          <div>
                            <p className="text-xs">{feedback}</p>
                            <div className="mt-1 flex items-center text-xs text-purple-700">
                              <span className="font-medium text-xs">Mentioned by 18% of students</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="bloomstaxonomy">
          <div className="space-y-4">
            <BloomsTaxonomyChart data={performanceData.bloomsTaxonomy} />
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Taxonomy Analysis</CardTitle>
                <CardDescription className="text-xs">Insights about cognitive skill distribution</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="mb-3 text-xs">
                  Your course currently emphasizes lower-order thinking skills (Remember, Understand) 
                  over higher-order thinking skills (Analyze, Evaluate, Create). This distribution is
                  common in introductory courses, but could be improved for better learning outcomes.
                </p>
                
                <h4 className="font-medium mb-1 text-sm">Recommendations</h4>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li>
                    Increase analysis activities by having students compare and contrast key concepts
                  </li>
                  <li>
                    Add evaluation components where students judge the validity of different approaches
                  </li>
                  <li>
                    Incorporate more creative tasks that allow students to design or produce original work
                  </li>
                  <li>
                    Balance lower-order activities with higher-order challenges to develop complete understanding
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Student Engagement Tab */}
        <TabsContent value="engagement">
          <div className="space-y-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <div>
                  <CardTitle className="text-base">Student Engagement Overview</CardTitle>
                  <CardDescription className="text-xs">Participation rates and time metrics across modules</CardDescription>
                </div>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {performanceData.studentEngagement && performanceData.studentEngagement.map((module) => (
                    <div key={module.moduleId} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm">{module.moduleName}</h4>
                        <div className="flex items-center gap-1.5">
                          {getPerformanceIcon(module.participationRate)}
                          <Badge 
                            variant="outline" 
                            className={`${getPerformanceColor(module.participationRate)} text-xs`}
                          >
                            {module.participationRate}% Participation
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            Avg. Time: {module.timeSpent} min / {module.expectedTime} min expected
                          </span>
                        </div>
                        <div>
                          <Badge 
                            variant="outline"
                            className={`${getPerformanceColor(module.completionRate)} text-xs`}
                          >
                            {module.completionRate}% Completion
                          </Badge>
                        </div>
                      </div>

                      {/* Progress indicator for time spent vs expected */}
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${Math.min(100, (module.timeSpent / module.expectedTime) * 100)}%` }}
                        />
                      </div>
                      
                      <div className="border-b border-gray-100 pt-1" />
                    </div>
                  ))}
                </div>

                <Alert className="mt-4 py-2">
                  <Activity className="h-3.5 w-3.5" />
                  <AlertTitle className="text-sm">Engagement Insights</AlertTitle>
                  <AlertDescription>
                    <p className="text-xs mt-1">
                      Student engagement tends to drop significantly in advanced modules. 
                      Consider adding more interactive elements and clearer instructions for complex topics.
                    </p>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Challenges Tab */}
        <TabsContent value="challenges">
          <div className="space-y-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Critical Learning Challenges</CardTitle>
                <CardDescription className="text-xs">Areas where students struggled the most</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {performanceData.learningChallenges && performanceData.learningChallenges.map((challenge) => {
                    const difficultyColor = 
                      challenge.difficulty === "high" ? "bg-red-100 text-red-700" : 
                      challenge.difficulty === "medium" ? "bg-amber-100 text-amber-700" : 
                      "bg-blue-100 text-blue-700";
                    
                    return (
                      <div key={challenge.id} className="border rounded-md p-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-sm">{challenge.topic}</h3>
                            <p className="text-xs text-muted-foreground">{challenge.moduleName}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {getPerformanceIcon(challenge.successRate)}
                            <Badge 
                              variant="outline"
                              className={`${getPerformanceColor(challenge.successRate)} text-xs`}
                            >
                              {challenge.successRate}% Success
                            </Badge>
                            <Badge className={`${difficultyColor} text-xs`}>
                              {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)} Difficulty
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 p-2 rounded-md">
                          <h4 className="text-[10px] font-medium text-slate-500 mb-0.5">Common Misconception:</h4>
                          <p className="text-xs">{challenge.commonMisconception}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Alert className="mt-4 py-2 bg-blue-50 border-blue-200">
                  <AlertTriangle className="h-3.5 w-3.5 text-blue-500" />
                  <AlertTitle className="text-sm">Recommendation</AlertTitle>
                  <AlertDescription>
                    <p className="text-xs mt-1">
                      These topics consistently challenge students across semesters. Consider creating 
                      additional learning resources, practice exercises, or video explanations specifically 
                      targeting these challenging concepts.
                    </p>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursePerformance;
