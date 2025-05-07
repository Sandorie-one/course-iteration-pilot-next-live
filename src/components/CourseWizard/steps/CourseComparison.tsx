
import React from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const CourseComparison = () => {
  const { courseModules, suggestions, isLoading, selectedCourse } = useWizard();

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading course comparison...</div>;
  }

  if (!selectedCourse) {
    return <div className="text-center py-8">Please select a course first</div>;
  }

  // Get selected suggestions
  const selectedSuggestions = suggestions.filter(suggestion => suggestion.selected);

  return (
    <div className="space-y-6 pb-2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Course Structure Comparison</h2>
        <p className="text-slate-500">
          Compare the original course structure with the improved version based on your 
          selected suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Course Structure */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Original Course Structure</h3>
              <Badge variant="outline">Current Version</Badge>
            </div>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {courseModules.map(module => {
                  // Find suggestions for this module
                  const moduleSuggestions = suggestions.filter(
                    s => s.moduleId === module.id && s.selected
                  );
                  
                  return (
                    <div key={module.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-semibold text-lg">{module.order}. {module.title}</div>
                        {moduleSuggestions.length > 0 && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-800">
                            Has Changes
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-3">
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
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Enhanced Course Structure */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Enhanced Course Structure</h3>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                Improved Version
              </Badge>
            </div>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {courseModules.map(module => {
                  // Find suggestions for this module
                  const moduleSuggestions = suggestions.filter(
                    s => s.moduleId === module.id && s.selected
                  );
                  
                  return (
                    <div 
                      key={module.id} 
                      className={`border-b pb-4 last:border-0 last:pb-0 ${
                        moduleSuggestions.length > 0 ? 'bg-green-50/50 p-4 rounded-md -mx-4' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-semibold text-lg">{module.order}. {module.title}</div>
                        {moduleSuggestions.length > 0 && (
                          <Badge className="bg-green-100 text-green-800">
                            Enhanced
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-3">
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
                        
                        {moduleSuggestions.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium text-slate-500">Applied improvements:</p>
                            <div className="space-y-2">
                              {moduleSuggestions.map(suggestion => (
                                <div key={suggestion.id} className="text-sm bg-white p-2 rounded border border-green-200">
                                  <span className="font-medium">{suggestion.title}</span>
                                  <p className="text-slate-600 mt-1">{suggestion.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
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
