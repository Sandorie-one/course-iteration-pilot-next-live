
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

type PerformanceSummaryProps = {
  opportunityCount: number;
}

const PerformanceSummary = ({ opportunityCount }: PerformanceSummaryProps) => {
  return (
    <Card className="border-2 border-amber-400 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
      <CardContent className="p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 border-b border-amber-200">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-amber-800">Improvement Opportunities</h3>
                <div className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-base">
                  {opportunityCount}
                </div>
              </div>
              <p className="mt-2 text-amber-700">
                <span className="font-medium">Critical action needed:</span> We've identified {opportunityCount} significant 
                opportunities to enhance your course effectiveness. Addressing these areas will 
                directly impact student outcomes and engagement levels.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white">
          <div className="flex items-center gap-2">
            <div className="h-2 bg-red-400 rounded-full w-2/5"></div>
            <div className="h-2 bg-amber-300 rounded-full w-1/5"></div>
            <div className="h-2 bg-green-300 rounded-full w-2/5"></div>
          </div>
          <div className="flex justify-between text-xs mt-1.5">
            <span className="text-red-600 font-medium">High priority</span>
            <span className="text-amber-600 font-medium">Medium priority</span>
            <span className="text-green-600 font-medium">Lower priority</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceSummary;
