
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { ArrowLeft, Copy, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import PerformanceChart from "@/components/PerformanceChart";
import ImprovementsList from "@/components/ImprovementsList";

const CourseDetail = () => {
  const { id } = useParams();
  // In a real app, we would fetch the course data based on the ID

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">CS101: Introduction to Computer Science</h1>
            <p className="text-slate-500">Fall 2023 • 32 students • 16 weeks</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex gap-2">
            <Copy size={16} />
            Clone for Next Semester
          </Button>
          <Button className="flex gap-2">
            <Clock size={16} />
            Plan Iterations
          </Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="improvements">Improvements</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Student Average Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78%</div>
                  <p className="text-sm text-muted-foreground mt-1">3% lower than previous semester</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">92%</div>
                  <p className="text-sm text-muted-foreground mt-1">2% higher than previous semester</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Identified Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5</div>
                  <p className="text-sm text-muted-foreground mt-1">Est. 1.5 hrs to implement</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>
                      Student performance across course modules
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PerformanceChart />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Critical Areas</CardTitle>
                    <CardDescription>
                      Sections that need attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Module 4: Algorithms</div>
                        <div className="text-sm text-red-600">High Priority</div>
                      </div>
                      <Progress value={32} className="h-2" />
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <AlertTriangle className="h-3 w-3 mr-1 text-red-500" />
                        <span>32% below target performance</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Module 7: Recursion</div>
                        <div className="text-sm text-amber-600">Medium Priority</div>
                      </div>
                      <Progress value={68} className="h-2" />
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                        <span>22% below target performance</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Module 10: Final Project</div>
                        <div className="text-sm text-amber-600">Medium Priority</div>
                      </div>
                      <Progress value={72} className="h-2" />
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                        <span>18% below target performance</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>Comprehensive view of course performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Detailed analytics content would go here in the full implementation.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="improvements">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recommended Improvements</CardTitle>
                <CardDescription>Based on performance data and student feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <ImprovementsList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Course Content Structure</CardTitle>
                <CardDescription>Manage modules, lessons, and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Course content management interface would go here in the full implementation.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CourseDetail;
