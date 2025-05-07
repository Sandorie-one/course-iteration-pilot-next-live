
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, Clipboard, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import CourseList from "@/components/CourseList";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Professor!</h1>
            <p className="text-slate-500">Here's an overview of your courses and potential improvements.</p>
          </div>
          <Button>
            <Clipboard className="mr-2" />
            Import Course Data
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
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
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
                <CardDescription>
                  Top opportunities for improvement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4 py-1">
                  <div className="font-medium">Assessment Duration</div>
                  <p className="text-sm text-muted-foreground">Students take 35% longer than allocated time for Quiz 3</p>
                  <div className="flex items-center mt-1 text-sm text-blue-600 hover:underline cursor-pointer">
                    <span>View details</span>
                    <ArrowRight className="ml-1" size={14} />
                  </div>
                </div>
                
                <Separator />
                
                <div className="border-l-4 border-red-500 pl-4 py-1">
                  <div className="font-medium">Discussion Participation</div>
                  <p className="text-sm text-muted-foreground">Week 5 forum saw 67% lower engagement than average</p>
                  <div className="flex items-center mt-1 text-sm text-blue-600 hover:underline cursor-pointer">
                    <span>View details</span>
                    <ArrowRight className="ml-1" size={14} />
                  </div>
                </div>
                
                <Separator />
                
                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <div className="font-medium">Resource Utilization</div>
                  <p className="text-sm text-muted-foreground">Interactive simulations have 3x engagement vs. PDFs</p>
                  <div className="flex items-center mt-1 text-sm text-blue-600 hover:underline cursor-pointer">
                    <span>View details</span>
                    <ArrowRight className="ml-1" size={14} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
