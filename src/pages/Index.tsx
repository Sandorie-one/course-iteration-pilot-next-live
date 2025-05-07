
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, File, Copy, ArrowRight, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import CourseList from "@/components/CourseList";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PerformanceChart from "@/components/PerformanceChart";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type PreviousCourse = {
  id: string;
  code: string;
  title: string;
  avgGrade: number;
  completionRate: number;
  improvements: number;
  confidence: number;
  semester: string;
  impact: "high" | "medium" | "low";
};

const previousCourses: PreviousCourse[] = [
  {
    id: "1",
    code: "CS101",
    title: "Introduction to Computer Science",
    avgGrade: 78,
    completionRate: 92,
    improvements: 5,
    confidence: 86,
    semester: "Fall 2023",
    impact: "high"
  },
  {
    id: "2",
    code: "BIO220",
    title: "Molecular Biology",
    avgGrade: 82,
    completionRate: 88,
    improvements: 3,
    confidence: 77,
    semester: "Spring 2023",
    impact: "medium"
  },
  {
    id: "3",
    code: "MATH330",
    title: "Advanced Calculus",
    avgGrade: 75,
    completionRate: 85,
    improvements: 4,
    confidence: 82,
    semester: "Fall 2022",
    impact: "medium"
  },
];

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "";
  }
};

const Index = () => {
  const [isNewCourseDialogOpen, setIsNewCourseDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<PreviousCourse | null>(null);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Professor!</h1>
            <p className="text-slate-500">Here's an overview of your courses and potential improvements.</p>
          </div>
          <Button onClick={() => setIsNewCourseDialogOpen(true)}>
            <PlusCircle className="mr-2" />
            Create New Course
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-sm text-muted-foreground mt-1">Across 2 semesters</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Improvement Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-muted-foreground mt-1">Across all courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Est. Time to Implement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.5 hrs</div>
              <p className="text-sm text-muted-foreground mt-1">To address all suggestions</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Courses</CardTitle>
            <CardDescription>
              Recent and current courses that can be optimized
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CourseList />
          </CardContent>
        </Card>

        {/* Create New Course Dialog */}
        <Dialog open={isNewCourseDialogOpen} onOpenChange={(open) => {
          setIsNewCourseDialogOpen(open);
          if (!open) setSelectedCourse(null);
        }}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Choose your starting point to create a new course
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 py-4">
              <Card className="hover:bg-slate-50 transition cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <File className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Start from scratch</h3>
                      <p className="text-sm text-slate-500 mb-3">Create a new course with empty modules and sections</p>
                      <Button size="sm">
                        Start fresh
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:bg-slate-50 transition cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Copy className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-medium mb-1">Leverage existing course</h3>
                        <p className="text-sm text-slate-500 mb-3">Copy structure and content from an existing course with AI-driven improvements</p>
                      </div>
                      
                      {!selectedCourse ? (
                        <Select onValueChange={(value) => {
                          const course = previousCourses.find(c => c.id === value);
                          if (course) setSelectedCourse(course);
                        }}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a previous course" />
                          </SelectTrigger>
                          <SelectContent>
                            {previousCourses.map(course => (
                              <SelectItem key={course.id} value={course.id}>
                                <div className="flex items-center justify-between w-full gap-2">
                                  <span>{course.code}: {course.title}</span>
                                  <Badge variant="outline" className={getImpactColor(course.impact)}>
                                    {course.improvements} improvements
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{selectedCourse.code}: {selectedCourse.title}</h4>
                              <p className="text-sm text-slate-600">{selectedCourse.semester}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => setSelectedCourse(null)}>
                                Change
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-medium mb-2">Performance Metrics</h5>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="bg-slate-50 p-3 rounded-lg">
                                  <div className="text-sm text-slate-500">Average Grade</div>
                                  <div className="text-lg font-bold">{selectedCourse.avgGrade}%</div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg">
                                  <div className="text-sm text-slate-500">Completion Rate</div>
                                  <div className="text-lg font-bold">{selectedCourse.completionRate}%</div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-medium">AI Insights</h5>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <span>{selectedCourse.confidence}%</span>
                                        <HoverCard>
                                          <HoverCardTrigger asChild>
                                            <Badge variant="outline" className="cursor-help">Confidence</Badge>
                                          </HoverCardTrigger>
                                          <HoverCardContent className="w-80" side="right">
                                            <p className="text-sm">This confidence score represents how certain the AI is about these recommendations based on past course data, student feedback, and assessment patterns.</p>
                                          </HoverCardContent>
                                        </HoverCard>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">AI confidence based on available data</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <div className="bg-slate-50 p-3 rounded-lg">
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <div className="text-sm">
                                      <p className="font-medium">Add more interactive components</p>
                                      <p className="text-xs text-slate-500">Based on student engagement data</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <div className="text-sm">
                                      <p className="font-medium">Expand module 4 content</p>
                                      <p className="text-xs text-slate-500">Based on assessment results</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium mb-2">Performance Comparison</h5>
                            <div className="rounded-lg border p-4 bg-white">
                              <div className="text-xs text-slate-500 mb-1">Module Performance</div>
                              <div className="h-48">
                                <PerformanceChart />
                              </div>
                              <div className="text-xs text-center mt-2 text-slate-500">
                                <span className="inline-flex items-center gap-1">
                                  <span className="h-2 w-2 bg-blue-500 rounded-full inline-block"></span> Current semester
                                </span>
                                <span className="inline-flex items-center gap-1 ml-4">
                                  <span className="h-2 w-2 bg-slate-400 rounded-full inline-block"></span> Previous semester
                                </span>
                                <span className="inline-flex items-center gap-1 ml-4">
                                  <span className="h-2 w-2 bg-green-500 rounded-full inline-block"></span> Target threshold
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 justify-end">
                            <Button variant="outline" size="sm">
                              Use as is
                            </Button>
                            <Button variant="secondary" size="sm">
                              Review and customize
                            </Button>
                            <Button size="sm">
                              Apply all improvements
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Index;
