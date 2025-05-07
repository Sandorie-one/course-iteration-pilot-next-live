
import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, X, Clock, Activity } from "lucide-react";
import BloomsTaxonomyChart from "../BloomsTaxonomyChart";
import PerformanceChart from "@/components/PerformanceChart";
import PerformanceSummary from "../PerformanceSummary";

// Helper function to get color based on performance
const getPerformanceColor = (value: number): string => {
  if (value >= 80) return "bg-green-100 text-green-700 border-green-200";
  if (value >= 60) return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-red-100 text-red-700 border-red-200";
};

// Helper function to get icon based on performance
const getPerformanceIcon = (value: number) => {
  if (value >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
  if (value >= 60) return <AlertTriangle className="h-5 w-5 text-amber-600" />;
  return <X className="h-5 w-5 text-red-600" />;
};

const CoursePerformance = () => {
  const { selectedCourse, performanceData, isLoading } = useWizard();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading course performance data...</div>;
  }

  if (!selectedCourse || !performanceData) {
    return <div className="text-center py-8">Please select a course first</div>;
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Course Performance Analysis</h2>
        <p className="text-slate-500">
          Review performance data for {selectedCourse.title} ({selectedCourse.code}) to identify 
          areas for improvement in your new course.
        </p>
      </div>

      <PerformanceSummary 
        healthScore={performanceData.courseHealthScore}
        opportunityCount={performanceData.opportunityCount}
      />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bloomstaxonomy">Bloom's Taxonomy</TabsTrigger>
          <TabsTrigger value="engagement">Student Engagement</TabsTrigger>
          <TabsTrigger value="challenges">Learning Challenges</TabsTrigger>
          <TabsTrigger value="feedback">Student Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Module Performance</CardTitle>
                <CardDescription>Student performance across course modules</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Strengths</CardTitle>
                  <CardDescription>Areas where the course performed well</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="list-disc pl-5 space-y-2">
                    {performanceData.strengths.map((strength, index) => (
                      <li key={index} className="text-sm">{strength}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Improvement Areas</CardTitle>
                  <CardDescription>Opportunities to enhance the course</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="list-disc pl-5 space-y-2">
                    {performanceData.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-sm">{weakness}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="bloomstaxonomy">
          <div className="space-y-6">
            <BloomsTaxonomyChart data={performanceData.bloomsTaxonomy} />
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Taxonomy Analysis</CardTitle>
                <CardDescription>Insights about cognitive skill distribution</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="mb-4 text-sm">
                  Your course currently emphasizes lower-order thinking skills (Remember, Understand) 
                  over higher-order thinking skills (Analyze, Evaluate, Create). This distribution is
                  common in introductory courses, but could be improved for better learning outcomes.
                </p>
                
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-sm">
                    Increase analysis activities by having students compare and contrast key concepts
                  </li>
                  <li className="text-sm">
                    Add evaluation components where students judge the validity of different approaches
                  </li>
                  <li className="text-sm">
                    Incorporate more creative tasks that allow students to design or produce original work
                  </li>
                  <li className="text-sm">
                    Balance lower-order activities with higher-order challenges to develop complete understanding
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* New Student Engagement Tab */}
        <TabsContent value="engagement">
          <div className="space-y-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Student Engagement Overview</CardTitle>
                  <CardDescription>Participation rates and time metrics across modules</CardDescription>
                </div>
                <Activity className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-2">
                  {performanceData.studentEngagement && performanceData.studentEngagement.map((module) => (
                    <div key={module.moduleId} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{module.moduleName}</h4>
                        <div className="flex items-center gap-2">
                          {getPerformanceIcon(module.participationRate)}
                          <Badge 
                            variant="outline" 
                            className={getPerformanceColor(module.participationRate)}
                          >
                            {module.participationRate}% Participation
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            Avg. Time: {module.timeSpent} min / {module.expectedTime} min expected
                          </span>
                        </div>
                        <div>
                          <Badge 
                            variant="outline"
                            className={getPerformanceColor(module.completionRate)}
                          >
                            {module.completionRate}% Completion
                          </Badge>
                        </div>
                      </div>

                      {/* Progress indicator for time spent vs expected */}
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${Math.min(100, (module.timeSpent / module.expectedTime) * 100)}%` }}
                        />
                      </div>
                      
                      <div className="border-b border-gray-100 pt-2" />
                    </div>
                  ))}
                </div>

                <Alert className="mt-6">
                  <Activity className="h-4 w-4" />
                  <AlertTitle>Engagement Insights</AlertTitle>
                  <AlertDescription>
                    <p className="text-sm mt-2">
                      Student engagement tends to drop significantly in advanced modules. 
                      Consider adding more interactive elements and clearer instructions for complex topics.
                    </p>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* New Learning Challenges Tab */}
        <TabsContent value="challenges">
          <div className="space-y-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Critical Learning Challenges</CardTitle>
                <CardDescription>Areas where students struggled the most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {performanceData.learningChallenges && performanceData.learningChallenges.map((challenge) => {
                    const difficultyColor = 
                      challenge.difficulty === "high" ? "bg-red-100 text-red-700" : 
                      challenge.difficulty === "medium" ? "bg-amber-100 text-amber-700" : 
                      "bg-blue-100 text-blue-700";
                    
                    return (
                      <div key={challenge.id} className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium">{challenge.topic}</h3>
                            <p className="text-sm text-muted-foreground">{challenge.moduleName}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPerformanceIcon(challenge.successRate)}
                            <Badge 
                              variant="outline"
                              className={getPerformanceColor(challenge.successRate)}
                            >
                              {challenge.successRate}% Success
                            </Badge>
                            <Badge className={difficultyColor}>
                              {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)} Difficulty
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 p-3 rounded-md">
                          <h4 className="text-xs font-medium text-slate-500 mb-1">Common Misconception:</h4>
                          <p className="text-sm">{challenge.commonMisconception}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Alert className="mt-6 bg-blue-50 border-blue-200">
                  <AlertTriangle className="h-4 w-4 text-blue-500" />
                  <AlertTitle>Recommendation</AlertTitle>
                  <AlertDescription>
                    <p className="text-sm mt-2">
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
        
        <TabsContent value="feedback">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Positive Feedback</CardTitle>
                <CardDescription>Common themes from student feedback</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="list-disc pl-5 space-y-2">
                  {performanceData.studentFeedback.positive.map((feedback, index) => (
                    <li key={index} className="text-sm">{feedback}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Critical Feedback</CardTitle>
                <CardDescription>Areas students identified for improvement</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="list-disc pl-5 space-y-2">
                  {performanceData.studentFeedback.negative.map((feedback, index) => (
                    <li key={index} className="text-sm">{feedback}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursePerformance;
