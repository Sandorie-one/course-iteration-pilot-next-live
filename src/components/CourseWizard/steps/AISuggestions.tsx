import React from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const AISuggestions = () => {
  const { selectedCourse, courseModules, suggestions, updateSuggestion, isLoading } = useWizard();

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading AI suggestions...</div>;
  }

  if (!selectedCourse) {
    return <div className="text-center py-8">Please select a course first</div>;
  }

  const getModuleById = (moduleId: string) => {
    return courseModules.find(module => module.id === moduleId) || null;
  };

  const getImpactBadge = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">High Impact</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Medium Impact</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">Low Impact</Badge>;
    }
  };

  const getEffortBadge = (effort: "high" | "medium" | "low") => {
    switch (effort) {
      case "high":
        return <Badge variant="outline" className="border-red-300 text-red-800">High Effort</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-amber-300 text-amber-800">Medium Effort</Badge>;
      case "low":
        return <Badge variant="outline" className="border-green-300 text-green-800">Low Effort</Badge>;
    }
  };

  // Group suggestions by module
  const groupedSuggestions: Record<string, typeof suggestions> = {};
  
  suggestions.forEach(suggestion => {
    if (!groupedSuggestions[suggestion.moduleId]) {
      groupedSuggestions[suggestion.moduleId] = [];
    }
    groupedSuggestions[suggestion.moduleId].push(suggestion);
  });

  return (
    <div className="space-y-6 pb-2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">AI-Generated Improvement Suggestions</h2>
        <p className="text-slate-500">
          Based on performance data from {selectedCourse.title}, our AI has generated the following 
          suggestions to improve your new course. Select the ones you'd like to implement.
        </p>
      </div>

      {Object.entries(groupedSuggestions).map(([moduleId, moduleSuggestions]) => {
        const module = getModuleById(moduleId);
        if (!module) return null;

        return (
          <Card key={moduleId} className="mb-4">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                {module.order}. {module.title}
              </h3>

              <div className="space-y-4">
                {moduleSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border rounded-lg p-4 hover:bg-slate-50">
                    <div className="flex items-start">
                      <Checkbox
                        id={suggestion.id}
                        checked={suggestion.selected}
                        onCheckedChange={(checked) => 
                          updateSuggestion(suggestion.id, checked === true)
                        }
                        className="mt-1"
                      />
                      <div className="ml-3 flex-1">
                        <label htmlFor={suggestion.id} className="font-medium cursor-pointer block mb-1">
                          {suggestion.title}
                        </label>
                        <p className="text-sm text-slate-600 mb-3">
                          {suggestion.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {getImpactBadge(suggestion.impact)}
                          {getEffortBadge(suggestion.effort)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium">AI Recommendation Summary</p>
        <p className="mt-1">
          We recommend implementing the high-impact, low-effort suggestions first 
          for maximum improvement with minimal resource investment.
        </p>
      </div>
    </div>
  );
};

export default AISuggestions;
