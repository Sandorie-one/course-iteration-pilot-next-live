
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info } from "lucide-react";

type PerformanceSummaryProps = {
  opportunityCount: number;
}

const PerformanceSummary = ({ opportunityCount }: PerformanceSummaryProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium">Improvement Opportunities</h3>
            <span className="text-base font-bold">{opportunityCount}</span>
          </div>
          <div className="flex items-center mt-2 gap-2">
            <Info className="h-4 w-4 text-blue-500" />
            <span className="text-sm">
              We've identified {opportunityCount} opportunities to improve this course.
              Focus on addressing these areas when creating your new course.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceSummary;
