
import React from "react";
import { useWizard } from "../WizardContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CoursePerformance = () => {
  const { selectedCourse, performanceData, isLoading } = useWizard();

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading course performance data...</div>;
  }

  if (!selectedCourse || !performanceData) {
    return <div className="text-center py-8">Please select a course first</div>;
  }

  const chartConfig = {
    current: {
      label: "Current Semester",
      color: "#3b82f6",
    },
    previous: {
      label: "Previous Semester",
      color: "#94a3b8",
    }
  };

  const chartData = performanceData.modulePerformance.map((module) => ({
    name: module.name,
    current: module.score,
    previous: module.previousScore || 0
  }));

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Course Performance Analysis</h2>
        <p className="text-slate-500">
          Review performance data for {selectedCourse.title} ({selectedCourse.code}) to identify 
          areas for improvement in your new course.
        </p>
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle>Module Performance</CardTitle>
          <CardDescription>
            Compare performance across course modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tickMargin={20}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="current" fill="var(--color-current)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="previous" fill="var(--color-previous)" radius={[4, 4, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default CoursePerformance;
