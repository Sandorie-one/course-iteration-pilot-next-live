import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, Check, ChevronDown, ChevronUp, Clock, AlertTriangle, Lightbulb, 
  ArrowRight, ArrowUp, Users, GraduationCap, Star, FileCheck, FileText, Book, 
  X, Trash2
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const Opportunities = () => {
  const { 
    selectedCourse, 
    courseModules, 
    suggestions, 
    updateSuggestion, 
    isLoading, 
    courseStructure,
    previewSuggestion,
    applySuggestion,
    removeSuggestion,
    activePreviewId,
    appliedSuggestions,
    performanceData
  } = useWizard();

  const [expandedSuggestions, setExpandedSuggestions] = useState<Record<string, boolean>>({});
  const [showMilestonesDialog, setShowMilestonesDialog] = useState(false);

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading improvement opportunities...</div>;
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

  // Handle removing a suggestion
  const handleRemoveSuggestion = (id: string) => {
    removeSuggestion(id);
    toast.success("Suggestion removed successfully");
  };
  
  // Handle previewing a suggestion, show dialog for milestones if it's the final project suggestion
  const handlePreviewSuggestion = (id: string | null) => {
    if (id === "s5") {
      setShowMilestonesDialog(true);
    }
    previewSuggestion(id);
  };

  // Group suggestions by module
  const groupedSuggestions: Record<string, typeof suggestions> = {};
  
  suggestions.forEach(suggestion => {
    if (!groupedSuggestions[suggestion.moduleId]) {
      groupedSuggestions[suggestion.moduleId] = [];
    }
    groupedSuggestions[suggestion.moduleId].push(suggestion);
  });

  // Function to get the appropriate icon for content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'summative':
      case 'quiz':
      case 'exam':
        return <FileCheck className="h-4 w-4 mr-2 text-red-600" />;
      case 'formative': 
      case 'assignment':
      case 'worksheet':
        return <FileText className="h-4 w-4 mr-2 text-blue-600" />;
      case 'resource':
      case 'reading':
      case 'lecture':
        return <Book className="h-4 w-4 mr-2 text-green-600" />;
      default:
        return null;
    }
  };

  // Function to get the assessment type label
  const getAssessmentTypeLabel = (type: string) => {
    if (['quiz', 'exam', 'summative'].includes(type)) {
      return 'Summative';
    } else if (['assignment', 'worksheet', 'formative'].includes(type)) {
      return 'Formative';
    } else {
      return 'Resource';
    }
  };

  // Mock data for project milestones
  const projectMilestones = [
    {
      title: "Project Proposal",
      description: "Students submit a 1-2 page proposal outlining their project goals, methodology, and expected outcomes.",
      deadline: "Week 2",
      weight: "10%"
    },
    {
      title: "Initial Requirements Document",
      description: "A detailed specification of what the project will accomplish, including functional requirements, constraints, and success criteria.",
      deadline: "Week 4",
      weight: "15%"
    },
    {
      title: "Design Review",
      description: "Presentation of initial design documents for peer and instructor review and feedback.",
      deadline: "Week 6",
      weight: "20%"
    },
    {
      title: "Implementation Progress Report",
      description: "Mid-point progress update showing working portions of the project and addressing any challenges encountered.",
      deadline: "Week 8",
      weight: "25%"
    },
    {
      title: "Final Project Submission",
      description: "Complete project deliverable with all required documentation, source code, and user guides.",
      deadline: "Week 10",
      weight: "30%"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 pb-2 h-full">
      {/* Left Panel: Improvement Opportunities */}
      <div className="md:w-2/5 space-y-4">
        <h2 className="text-xl font-bold">Improvement Opportunities</h2>
        <p className="text-sm text-slate-500 mb-4">
          Based on performance data from {selectedCourse.title}, we've identified
          opportunities to improve your course. Preview or apply them to see changes in real-time.
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
                            </div>
                            
                            <div className="flex gap-2 pt-2">
                              {!isApplied ? (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className={`gap-1 ${isPreviewing ? 'bg-blue-100 text-blue-800' : ''}`}
                                    onClick={() => handlePreviewSuggestion(isPreviewing ? null : suggestion.id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                    {isPreviewing ? 'Exit Preview' : 'Preview'}
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="gap-1"
                                    onClick={() => {
                                      applySuggestion(suggestion.id);
                                      toast.success("Suggestion applied to course structure");
                                    }}
                                  >
                                    <Check className="h-3 w-3" />
                                    Apply
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    className="text-green-700 bg-green-50 gap-1"
                                  >
                                    <Check className="h-3 w-3" />
                                    Applied
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="gap-1 text-red-600 hover:bg-red-50"
                                    onClick={() => handleRemoveSuggestion(suggestion.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                    Remove
                                  </Button>
                                </>
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
        
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FileCheck className="h-4 w-4 text-red-600" />
            <span className="text-xs font-medium">Summative Assessment</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium">Formative Assessment</span>
          </div>
          <div className="flex items-center gap-1">
            <Book className="h-4 w-4 text-green-600" />
            <span className="text-xs font-medium">Learning Resource</span>
          </div>
        </div>
        
        <Accordion 
          type="multiple" 
          defaultValue={["week-1", "week-2", "week-3", "week-4", "week-5"]} 
          className="w-full"
        >
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
                            className={`text-sm p-2 rounded-md flex items-center ${
                              item.isHighlighted ? 'bg-blue-100 text-blue-800' : 
                              item.isModified ? 'bg-green-100 text-green-800' : ''
                            } ${item.isNew ? 'animate-pulse' : ''}`}
                          >
                            {getContentTypeIcon(item.type)}
                            <span className="flex-1">{item.title}</span>
                            {item.isNew && (
                              <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                                New
                              </Badge>
                            )}
                            {item.isModified && !item.isNew && (
                              <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                                Modified
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

      {/* Project Milestones Dialog */}
      <Dialog open={showMilestonesDialog} onOpenChange={setShowMilestonesDialog}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="pb-2">
            <DialogTitle>Project Milestone Structure Preview</DialogTitle>
            <DialogDescription>
              A structured approach to the final project with clear milestones helps students manage their time and delivers better project outcomes.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-1">
            <div className="space-y-4 my-3 px-1">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800">
                <p className="text-sm">
                  <strong>Why milestones matter:</strong> Research shows that projects with structured checkpoints result in 35% higher completion rates and 28% better quality outcomes compared to single-deadline projects.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Proposed Milestone Structure</h3>
                <div className="space-y-3">
                  {projectMilestones.map((milestone, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{milestone.description}</p>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <Badge className="mb-1">{milestone.deadline}</Badge>
                          <span className="text-sm font-medium text-slate-700">{milestone.weight}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-green-800 mb-1">Expected Benefits</h4>
                <ul className="text-sm space-y-1 text-slate-700">
                  <li>• Better time management for students</li>
                  <li>• Earlier identification of project issues</li>
                  <li>• More opportunities for meaningful feedback</li>
                  <li>• Higher quality final deliverables</li>
                  <li>• More equitable distribution of work in team projects</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
          
          <div className="flex justify-end pt-4 border-t mt-2">
            <Button 
              onClick={() => setShowMilestonesDialog(false)}
            >
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Opportunities;
