
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

type PerformanceSummaryProps = {
  healthScore: number;
  opportunityCount: number;
}

const PerformanceSummary = ({ healthScore, opportunityCount }: PerformanceSummaryProps) => {
  const getHealthColor = () => {
    if (healthScore >= 80) return "text-green-600";
    if (healthScore >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getHealthIcon = () => {
    if (healthScore >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (healthScore >= 60) return <Info className="h-4 w-4 text-amber-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium">Course Health</h3>
              <span className={`text-base font-bold ${getHealthColor()}`}>{healthScore}/100</span>
            </div>
            <Progress value={healthScore} className="h-1.5" />
            <div className="flex items-center mt-1 text-xs">
              {getHealthIcon()}
              <span className="ml-1.5">
                {healthScore >= 80 
                  ? "Course is performing well" 
                  : healthScore >= 60 
                    ? "Some areas need attention" 
                    : "Critical issues detected"}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium">Improvement Opportunities</h3>
              <span className="text-base font-bold">{opportunityCount}</span>
            </div>
            <div className="flex items-center mt-1 text-xs">
              <span>
                We've identified {opportunityCount} opportunities to improve this course.
                Focus on addressing these areas when creating your new course.
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceSummary;
