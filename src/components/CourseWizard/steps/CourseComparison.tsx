
import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const CourseComparison = () => {
  const { selectedCourse, courseModules, suggestions, isLoading } = useWizard();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading course comparison...</div>;
  }

  if (!selectedCourse) {
    return <div className="text-center py-8">Please select a course first</div>;
  }

  // Get selected suggestions
  const selectedSuggestions = suggestions.filter(suggestion => suggestion.selected);

  // Initialize the active module if not set
  if (!activeModule && courseModules.length > 0) {
    setActiveModule(courseModules[0].id);
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Course Structure Comparison</h2>
        <p className="text-slate-500">
          Compare the original course structure with the improved version based on your 
          selected suggestions.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4 space-y-2">
          <p className="font-medium text-sm text-slate-500 mb-2">Course Modules</p>
          {courseModules.map(module => (
            <div 
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`p-3 rounded-md cursor-pointer text-sm ${
                activeModule === module.id 
                  ? "bg-primary text-white" 
                  : "hover:bg-slate-100"
              }`}
            >
              <div className="font-medium">{module.order}. {module.title}</div>
              {suggestions.filter(s => s.moduleId === module.id && s.selected).length > 0 && (
                <Badge 
                  className={`mt-1 ${
                    activeModule === module.id 
                      ? "bg-white text-primary" 
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {suggestions.filter(s => s.moduleId === module.id && s.selected).length} changes
                </Badge>
              )}
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeModule && (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Original Module</h3>
                    <Badge variant="outline">Current Version</Badge>
                  </div>

                  {courseModules.filter(m => m.id === activeModule).map(module => (
                    <div key={module.id} className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-500">Title</p>
                        <p className="font-medium">{module.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Description</p>
                        <p>{module.description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Duration</p>
                        <p>{module.duration} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Components</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Standard lecture materials</li>
                          <li>Basic assignments</li>
                          <li>Text-based resources</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Enhanced Module</h3>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                      Improved Version
                    </Badge>
                  </div>

                  {courseModules.filter(m => m.id === activeModule).map(module => {
                    const moduleSuggestions = suggestions.filter(
                      s => s.moduleId === module.id && s.selected
                    );
                    
                    return (
                      <div key={module.id} className="space-y-4">
                        <div>
                          <p className="text-sm text-slate-500">Title</p>
                          <p className="font-medium">{module.title}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Description</p>
                          <p>{module.description}</p>
                          {moduleSuggestions.length > 0 && (
                            <div className="mt-2 p-2 bg-green-50 text-green-800 text-sm rounded">
                              <span className="font-medium">Enhanced with additional learning objectives</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Duration</p>
                          <div className="flex items-center gap-2">
                            <p>{module.duration} hours</p>
                            {moduleSuggestions.length > 0 && (
                              <>
                                <ArrowRight className="h-4 w-4 text-slate-400" />
                                <p className="font-medium">
                                  {module.duration + (moduleSuggestions.length * 0.25)} hours
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Components</p>
                          <ul className="pl-5 mt-2 space-y-1">
                            <li className="list-disc">Standard lecture materials</li>
                            <li className="list-disc">Basic assignments</li>
                            <li className="list-disc">Text-based resources</li>
                            
                            {moduleSuggestions.map(suggestion => (
                              <li key={suggestion.id} className="list-disc font-medium text-primary">
                                {suggestion.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {selectedSuggestions.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <p className="font-medium">No improvements selected</p>
          <p className="mt-1">
            You haven't selected any improvements for this course. Go back to the previous step 
            to select which improvements you'd like to implement.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseComparison;
