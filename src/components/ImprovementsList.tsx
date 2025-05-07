
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

type Improvement = {
  id: string;
  title: string;
  description: string;
  module: string;
  priority: "high" | "medium" | "low";
  timeEstimate: number;
  sourceData: string;
  confidence: number;
};

const ImprovementsList = () => {
  const [improvements] = useState<Improvement[]>([
    {
      id: "1",
      title: "Add interactive visualization for algorithm complexity",
      description: "Student performance data shows confusion around Big O notation and algorithm complexity comparisons. Adding an interactive visualization could improve understanding.",
      module: "Module 4: Algorithms",
      priority: "high",
      timeEstimate: 0.75,
      sourceData: "Quiz scores and forum questions",
      confidence: 87
    },
    {
      id: "2",
      title: "Restructure recursion examples with step-by-step breakdowns",
      description: "High failure rate on recursion problems indicates students struggle to visualize the execution steps. Add step-by-step breakdowns for each recursive example.",
      module: "Module 7: Recursion",
      priority: "high",
      timeEstimate: 0.5,
      sourceData: "Assignment submissions and office hour questions",
      confidence: 92
    },
    {
      id: "3",
      title: "Create checkpoint assignments for final project",
      description: "Students tend to leave most of the final project work until the last week. Adding checkpoint deliverables could improve progress tracking and final quality.",
      module: "Module 10: Final Project",
      priority: "medium",
      timeEstimate: 0.25,
      sourceData: "Project submission times and quality metrics",
      confidence: 78
    },
    {
      id: "4",
      title: "Add more practical examples to Functions section",
      description: "Student feedback indicates a desire for more real-world applications of functions concepts.",
      module: "Module 5: Functions",
      priority: "low",
      timeEstimate: 0.5,
      sourceData: "End of course survey",
      confidence: 65
    },
    {
      id: "5",
      title: "Update outdated library references in Objects module",
      description: "Some code examples use deprecated library methods. These should be updated to current standards.",
      module: "Module 6: Objects",
      priority: "medium",
      timeEstimate: 0.25,
      sourceData: "Student error reports and forum discussions",
      confidence: 83
    }
  ]);

  const getPriorityBadge = (priority: Improvement["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Low Priority</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {improvements.map((improvement) => (
        <div key={improvement.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg">{improvement.title}</h3>
            {getPriorityBadge(improvement.priority)}
          </div>
          
          <p className="text-slate-600 mb-3">{improvement.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <div className="text-slate-500">Module</div>
              <div>{improvement.module}</div>
            </div>
            <div>
              <div className="text-slate-500">Source Data</div>
              <div>{improvement.sourceData}</div>
            </div>
            <div>
              <div className="text-slate-500">Confidence</div>
              <div>{improvement.confidence}% match with known issues</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-slate-400" />
              <span className="text-sm text-slate-500">Est. {improvement.timeEstimate} hrs to implement</span>
            </div>
            <Button size="sm" className="flex items-center gap-2">
              Plan Implementation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImprovementsList;
