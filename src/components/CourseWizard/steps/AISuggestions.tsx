
import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const AISuggestions = () => {
  const { 
    selectedCourse, 
    courseModules, 
    suggestions, 
    isLoading, 
    courseOutline,
    applySuggestion,
    previewSuggestion,
    clearPreview
  } = useWizard();
  
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading AI suggestions...</div>;
  }

  if (!selectedCourse) {
    return <div className="text-center py-8">Please select a course first</div>;
  }

  const getModuleById = (moduleId: string) => {
    return courseModules.find(module => module.id === moduleId) || null;
  };

  // Toggle suggestion expansion
  const toggleExpandSuggestion = (id: string) => {
    setExpandedSuggestion(expandedSuggestion === id ? null : id);
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
  
  // Get content type icon/class
  const getContentTypeClass = (type: string) => {
    switch (type) {
      case "reading":
        return "text-blue-600";
      case "assignment":
        return "text-green-600";
      case "discussion":
        return "text-amber-600";
      case "quiz":
        return "text-purple-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="flex gap-4">
      {/* Left Panel - AI Suggestions (30% width) */}
      <div className="w-3/10">
        <div className="mb-4">
          <h2 className="text-lg font-bold">AI Recommendations</h2>
          <p className="text-sm text-slate-500">
            Select recommendations to improve your course
          </p>
        </div>

        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <Card 
              key={suggestion.id} 
              className={`transition-all ${suggestion.selected ? "border-green-400 bg-green-50" : ""}`}
            >
              <CardContent className="p-3">
                <Collapsible>
                  <div className="flex justify-between items-start">
                    <CollapsibleTrigger 
                      className="flex items-start text-left"
                      onClick={() => toggleExpandSuggestion(suggestion.id)}
                    >
                      <div className="mt-0.5 mr-2">
                        {expandedSuggestion === suggestion.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{suggestion.title}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {getImpactBadge(suggestion.impact)}
                          {getEffortBadge(suggestion.effort)}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="pt-2">
                    <p className="text-sm text-slate-600 mb-3 pl-6">
                      {suggestion.description}
                    </p>
                    <div className="flex gap-2 pl-6">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => previewSuggestion(suggestion.id)}
                        disabled={suggestion.selected}
                      >
                        Preview
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => applySuggestion(suggestion.id)}
                        disabled={suggestion.selected}
                      >
                        Apply
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel - Course Outline (70% width) */}
      <div className="w-7/10 border rounded-lg bg-white p-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Course Outline</h2>
          <p className="text-sm text-slate-500">
            See how recommendations affect your course structure
          </p>
        </div>

        <Accordion type="multiple" className="w-full" defaultValue={['w1']}>
          {courseOutline.map((week) => (
            <AccordionItem key={week.id} value={week.id} className="border-b">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                {week.title}
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-2">
                <div className="space-y-1">
                  {week.content.map((content) => (
                    <div 
                      key={content.id}
                      className={`flex p-2 rounded-md ${content.isNew ? 'bg-green-50 border border-green-100' : ''}`}
                    >
                      <div className={`min-w-[90px] font-medium ${getContentTypeClass(content.type)}`}>
                        <span className="text-xs uppercase tracking-wide">
                          {content.type}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {content.title}
                          {content.isNew && (
                            <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">New</Badge>
                          )}
                        </p>
                        <p className="text-xs text-slate-500">{content.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {courseOutline.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No course outline available
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;
