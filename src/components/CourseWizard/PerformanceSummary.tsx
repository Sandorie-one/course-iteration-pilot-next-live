
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
    if (healthScore >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (healthScore >= 60) return <Info className="h-5 w-5 text-amber-600" />;
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Course Health</h3>
              <span className={`text-lg font-bold ${getHealthColor()}`}>{healthScore}/100</span>
            </div>
            <Progress value={healthScore} className="h-2" />
            <div className="flex items-center mt-2 text-sm">
              {getHealthIcon()}
              <span className="ml-2">
                {healthScore >= 80 
                  ? "Course is performing well" 
                  : healthScore >= 60 
                    ? "Some areas need attention" 
                    : "Critical issues detected"}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Improvement Opportunities</h3>
              <span className="text-lg font-bold">{opportunityCount}</span>
            </div>
            <div className="flex items-center mt-2 text-sm">
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
