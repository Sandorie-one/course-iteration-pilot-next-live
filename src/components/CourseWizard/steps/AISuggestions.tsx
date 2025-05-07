
import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, ChevronDown, ChevronUp } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const AISuggestions = () => {
  const { 
    selectedCourse, 
    courseModules, 
    suggestions, 
    updateSuggestion, 
    isLoading, 
    courseStructure,
    previewSuggestion,
    applySuggestion,
    activePreviewId,
    appliedSuggestions
  } = useWizard();

  const [expandedSuggestions, setExpandedSuggestions] = useState<Record<string, boolean>>({});

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

  const toggleSuggestionExpand = (id: string) => {
    setExpandedSuggestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isSuggestionApplied = (id: string) => {
    return appliedSuggestions.includes(id);
  };

  const isSuggestionPreviewing = (id: string) => {
    return activePreviewId === id;
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
    <div className="flex flex-col md:flex-row gap-4 pb-2 h-full">
      {/* Left Panel: AI Suggestions */}
      <div className="md:w-2/5 space-y-4">
        <h2 className="text-xl font-bold">AI-Generated Suggestions</h2>
        <p className="text-sm text-slate-500 mb-4">
          Based on performance data from {selectedCourse.title}, our AI has generated
          suggestions to improve your course. Preview or apply them to see changes in real-time.
        </p>

        <div className="space-y-3">
          {Object.entries(groupedSuggestions).map(([moduleId, moduleSuggestions]) => {
            const module = getModuleById(moduleId);
            if (!module) return null;

            return (
              <Card key={moduleId} className="shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">
                    Module {module.order}: {module.title}
                  </h3>

                  <div className="space-y-3">
                    {moduleSuggestions.map((suggestion) => {
                      const isExpanded = expandedSuggestions[suggestion.id] || false;
                      const isApplied = isSuggestionApplied(suggestion.id);
                      const isPreviewing = isSuggestionPreviewing(suggestion.id);
                      
                      return (
                        <Collapsible 
                          key={suggestion.id} 
                          open={isExpanded} 
                          className={`border rounded-lg p-3 transition-all
                            ${isApplied ? 'bg-green-50 border-green-200' : 
                              isPreviewing ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex gap-2 items-center">
                                <h4 className="font-medium text-sm">{suggestion.title}</h4>
                                <CollapsibleTrigger 
                                  onClick={() => toggleSuggestionExpand(suggestion.id)}
                                  className="ml-auto text-slate-500 hover:text-slate-900 p-1 rounded-full hover:bg-slate-100"
                                >
                                  {isExpanded ? 
                                    <ChevronUp className="h-4 w-4" /> : 
                                    <ChevronDown className="h-4 w-4" />
                                  }
                                </CollapsibleTrigger>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mt-2">
                                {getImpactBadge(suggestion.impact)}
                                {getEffortBadge(suggestion.effort)}
                              </div>
                            </div>
                          </div>

                          <CollapsibleContent className="mt-3">
                            <p className="text-sm text-slate-600 mb-3">
                              {suggestion.description}
                            </p>
                            
                            <div className="flex gap-2">
                              {!isApplied ? (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className={`gap-1 ${isPreviewing ? 'bg-blue-100 text-blue-800' : ''}`}
                                    onClick={() => previewSuggestion(isPreviewing ? null : suggestion.id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                    {isPreviewing ? 'Exit Preview' : 'Preview'}
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    onClick={() => applySuggestion(suggestion.id)}
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    Apply
                                  </Button>
                                </>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-green-700 bg-green-50"
                                  disabled
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Applied
                                </Button>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Course Structure */}
      <div className="md:w-3/5 border rounded-lg p-4 bg-white">
        <h2 className="text-xl font-bold mb-4">Course Structure Preview</h2>
        
        <Accordion type="multiple" defaultValue={["week-1"]} className="w-full">
          {courseStructure.map((week) => (
            <AccordionItem key={week.id} value={`week-${week.id}`}>
              <AccordionTrigger 
                className={`${week.isHighlighted ? 'text-blue-700 font-medium' : ''} hover:no-underline`}
              >
                Week {week.order}: {week.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-4">
                  {week.contentTypes.map((contentType) => (
                    <div key={contentType.id} className="space-y-2">
                      <h4 className="font-medium text-sm text-slate-700">{contentType.name}</h4>
                      <ul className="space-y-2 pl-4">
                        {contentType.items.map((item) => (
                          <li 
                            key={item.id} 
                            className={`text-sm p-2 rounded-md ${
                              item.isHighlighted ? 'bg-blue-100 text-blue-800' : 
                              item.isModified ? 'bg-green-100 text-green-800' : ''
                            }`}
                          >
                            {item.title}
                            {item.isNew && (
                              <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                                New
                              </Badge>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AISuggestions;
