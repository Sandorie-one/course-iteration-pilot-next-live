
import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, ChevronDown, ChevronUp, Clock, AlertTriangle, Lightbulb, ArrowRight, ArrowUp, Users, GraduationCap, Star } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";

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
    appliedSuggestions,
    performanceData
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
  
  // New function to generate outcome metric badges
  const getMetricsBadges = (suggestion: any) => {
    const metrics = [];
    
    // Extract metrics from expected improvement text
    const expectedImprovement = suggestion.expectedImprovement;
    
    // Parse for grade improvements
    const gradeMatch = expectedImprovement.match(/(\d+)%\s+(?:increase|improvement|higher|better)\s+(?:in|on)\s+(?:grade|score|quiz score|module score)/i);
    if (gradeMatch) {
      metrics.push(
        <Badge key="grade" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
          <ArrowUp className="h-3 w-3" />
          +{gradeMatch[1]}% grades
        </Badge>
      );
    }
    
    // Parse for completion/retention improvements
    const completionMatch = expectedImprovement.match(/(\d+)%\s+(?:increase|improvement|higher)\s+(?:in|on)\s+(?:completion|retention|knowledge retention)/i);
    if (completionMatch) {
      metrics.push(
        <Badge key="completion" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
          <GraduationCap className="h-3 w-3" />
          +{completionMatch[1]}% retention
        </Badge>
      );
    }
    
    // Parse for engagement improvements
    const engagementMatch = expectedImprovement.match(/(\d+)%\s+(?:increase|improvement|higher)\s+(?:in|on)\s+(?:engagement|participation|student participation)/i);
    if (engagementMatch) {
      metrics.push(
        <Badge key="engagement" className="bg-indigo-50 text-indigo-700 border-indigo-200 flex items-center gap-1">
          <Users className="h-3 w-3" />
          +{engagementMatch[1]}% engagement
        </Badge>
      );
    }
    
    // Add comprehension badge for specific suggestions
    if (suggestion.id === "s2" || expectedImprovement.includes("comprehension")) {
      metrics.push(
        <Badge key="comprehension" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
          <Star className="h-3 w-3" />
          Improved comprehension
        </Badge>
      );
    }
    
    // Add quality badge for final project suggestions
    if (suggestion.id === "s5" && expectedImprovement.includes("quality")) {
      metrics.push(
        <Badge key="quality" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
          <Star className="h-3 w-3" />
          Better project quality
        </Badge>
      );
    }
    
    return metrics;
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
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                                <div>
                                  <h4 className="font-medium">{suggestion.title}</h4>
                                  <CollapsibleTrigger 
                                    onClick={() => toggleSuggestionExpand(suggestion.id)}
                                    className="mt-1 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                  >
                                    {isExpanded ? 'Show less' : 'Show details'}
                                    {isExpanded ? 
                                      <ChevronUp className="h-4 w-4 ml-1" /> : 
                                      <ChevronDown className="h-4 w-4 ml-1" />
                                    }
                                  </CollapsibleTrigger>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mt-2">
                                {getImpactBadge(suggestion.impact)}
                                {getMetricsBadges(suggestion)}
                              </div>
                            </div>
                          </div>

                          <CollapsibleContent className="mt-4 space-y-4">
                            <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                              <div className="flex items-center gap-2 text-amber-800 font-medium mb-1">
                                <AlertTriangle className="h-4 w-4" />
                                <h5>Problem Identified</h5>
                              </div>
                              <p className="text-sm text-slate-700">
                                {suggestion.problemDescription}
                              </p>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <h5 className="text-sm font-medium text-slate-700 mb-1">Impact on Learning</h5>
                                <p className="text-sm text-slate-600">{suggestion.impactOnLearning}</p>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-slate-700 mb-1">Expected Improvement</h5>
                                <p className="text-sm text-slate-600">{suggestion.expectedImprovement}</p>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-slate-700 mb-1">Based On</h5>
                                <p className="text-sm text-slate-600">{suggestion.sourceData}</p>
                              </div>
                              
                              <div className="pt-1">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-slate-400" />
                                  <span className="text-sm text-slate-500">
                                    Est. {suggestion.timeToImplement} {suggestion.timeToImplement === 1 ? 'hour' : 'hours'} to implement
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 pt-2">
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
                                    className="gap-1"
                                    onClick={() => applySuggestion(suggestion.id)}
                                  >
                                    <Check className="h-3 w-3" />
                                    Apply
                                  </Button>
                                </>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-green-700 bg-green-50 gap-1"
                                  disabled
                                >
                                  <Check className="h-3 w-3" />
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
