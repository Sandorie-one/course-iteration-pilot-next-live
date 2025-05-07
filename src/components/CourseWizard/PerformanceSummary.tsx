
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type PerformanceSummaryProps = {
  opportunityCount: number;
}

const PerformanceSummary = ({ opportunityCount }: PerformanceSummaryProps) => {
  return (
    <Card className="border-l-4 border-amber-500 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-5">
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Improvement Opportunities</h3>
              <span className="text-xl font-bold">{opportunityCount}</span>
            </div>
            
            <Progress value={(opportunityCount / 5) * 100} className="h-2 mb-3" />
            
            <div className="flex items-start mt-2 gap-3">
              <div className="bg-amber-100 p-1.5 rounded-full mt-0.5">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-sm">
                We've identified <strong>{opportunityCount} critical opportunities</strong> to improve this course.
                Addressing these areas will significantly enhance student engagement and learning outcomes.
              </span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PerformanceSummary;
