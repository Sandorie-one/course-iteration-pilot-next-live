
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, File, Copy, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import CourseList from "@/components/CourseList";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import CourseWizard from "@/components/CourseWizard/CourseWizard";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isNewCourseDialogOpen, setIsNewCourseDialogOpen] = useState(false);
  const [isWizardDialogOpen, setIsWizardDialogOpen] = useState(false);
  const [isWizardFullscreen, setIsWizardFullscreen] = useState(false);

  const toggleWizardFullscreen = () => {
    setIsWizardFullscreen(prev => !prev);
  };

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
        <Dialog open={isNewCourseDialogOpen} onOpenChange={setIsNewCourseDialogOpen}>
          <DialogContent className="sm:max-w-md">
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

              <Card className="hover:bg-slate-50 transition cursor-pointer" onClick={() => {
                setIsNewCourseDialogOpen(false);
                setIsWizardDialogOpen(true);
              }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Copy className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Leverage existing course</h3>
                      <p className="text-sm text-slate-500 mb-3">Copy structure and content from an existing course</p>
                      <Button size="sm" variant="outline">
                        Select course
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        {/* Course Creation Wizard Dialog */}
        <Dialog 
          open={isWizardDialogOpen} 
          onOpenChange={setIsWizardDialogOpen} 
          modal={true}
        >
          <DialogContent 
            className={cn("sm:max-w-5xl transition-all duration-300", 
              isWizardFullscreen ? "p-4" : "p-6"
            )}
            isFullscreen={isWizardFullscreen}
            onToggleFullscreen={toggleWizardFullscreen}
          >
            <CourseWizard isFullscreen={isWizardFullscreen} />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Index;
