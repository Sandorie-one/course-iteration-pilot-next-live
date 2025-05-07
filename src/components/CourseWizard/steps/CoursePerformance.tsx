
import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BloomsTaxonomyChart from "../BloomsTaxonomyChart";
import PerformanceChart from "@/components/PerformanceChart";
import PerformanceSummary from "../PerformanceSummary";

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

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bloomstaxonomy">Bloom's Taxonomy</TabsTrigger>
          <TabsTrigger value="feedback">Student Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Performance</CardTitle>
                <CardDescription>Student performance across course modules</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
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
              
              <Card>
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
            
            <Card>
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
        
        <TabsContent value="feedback">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
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
            
            <Card>
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
