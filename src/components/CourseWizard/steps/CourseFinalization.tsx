import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DialogClose } from "@/components/ui/dialog";

const CourseFinalization = () => {
  const { selectedCourse, suggestions, isLoading } = useWizard();
  const { toast } = useToast();
  
  const [newCourseTitle, setNewCourseTitle] = useState(selectedCourse ? `${selectedCourse.title} - Enhanced` : '');
  const [newCourseCode, setNewCourseCode] = useState(selectedCourse ? `${selectedCourse.code}-E` : '');
  const [semester, setSemester] = useState("Fall 2025");

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading course data...</div>;
  }

  if (!selectedCourse) {
    return <div className="text-center py-8">Please select a course first</div>;
  }

  // Get selected suggestions
  const selectedSuggestions = suggestions.filter(suggestion => suggestion.selected);

  // Calculate estimated implementation time (0.5 hours per suggestion)
  const implementationTime = selectedSuggestions.reduce((total, suggestion) => {
    const effortMultiplier = 
      suggestion.effort === 'high' ? 1.5 : 
      suggestion.effort === 'medium' ? 1.0 : 0.5;
    
    return total + effortMultiplier;
  }, 0);

  const formatTime = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    } else if (hours === 1) {
      return "1 hour";
    } else if (Number.isInteger(hours)) {
      return `${hours} hours`;
    } else {
      const wholeHours = Math.floor(hours);
      const minutes = Math.round((hours - wholeHours) * 60);
      return `${wholeHours} ${wholeHours === 1 ? 'hour' : 'hours'} ${minutes} minutes`;
    }
  };

  const handleCreateCourse = () => {
    toast({
      title: "Course Created",
      description: `${newCourseTitle} has been created with ${selectedSuggestions.length} improvements`,
    });
    // Close dialog would happen here
  };

  return (
    <div className="space-y-6 pb-2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Customize and Finalize Your Course</h2>
        <p className="text-slate-500">
          Review and customize your new course before creating it. 
          You've selected {selectedSuggestions.length} improvements from the original course.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="courseTitle" className="block text-sm font-medium mb-1">Course Title</label>
              <Input 
                id="courseTitle"
                value={newCourseTitle} 
                onChange={(e) => setNewCourseTitle(e.target.value)} 
              />
            </div>
            
            <div>
              <label htmlFor="courseCode" className="block text-sm font-medium mb-1">Course Code</label>
              <Input 
                id="courseCode"
                value={newCourseCode} 
                onChange={(e) => setNewCourseCode(e.target.value)} 
              />
            </div>
            
            <div>
              <label htmlFor="semester" className="block text-sm font-medium mb-1">Semester</label>
              <Input 
                id="semester"
                value={semester} 
                onChange={(e) => setSemester(e.target.value)} 
              />
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Implementation Details</CardTitle>
              <CardDescription>Estimated resources for course enhancements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-sm text-slate-700">Implementation time: </span>
                  <span className="ml-auto font-medium">{formatTime(implementationTime)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-sm text-slate-700">Available for: </span>
                  <span className="ml-auto font-medium">{semester}</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-sm text-slate-700">Improvements selected: </span>
                  <span className="ml-auto font-medium">{selectedSuggestions.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Selected Improvements</CardTitle>
            <CardDescription>Changes that will be made to the course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {selectedSuggestions.length > 0 ? (
                selectedSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-start gap-2 p-3 border border-slate-200 rounded-md hover:bg-slate-50">
                    <div className="min-w-[20px] mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{suggestion.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{suggestion.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <p>No improvements selected</p>
                  <p className="text-sm mt-1">Go back to select some improvements</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4">
        <DialogClose asChild>
          <Button 
            className="w-full md:w-auto" 
            onClick={handleCreateCourse}
            size="lg"
          >
            Create Enhanced Course
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

export default CourseFinalization;
