
import React from "react";
import { useWizard } from "./WizardContext";
import SelectCourse from "./steps/SelectCourse";
import CoursePerformance from "./steps/CoursePerformance";
import AISuggestions from "./steps/AISuggestions";
import CourseComparison from "./steps/CourseComparison";
import CourseFinalization from "./steps/CourseFinalization";
import WizardNavigation from "./WizardNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface WizardContentProps {
  isFullscreen?: boolean;
}

const WizardContent: React.FC<WizardContentProps> = ({ isFullscreen = false }) => {
  const { currentStep, selectedCourse } = useWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectCourse />;
      case 2:
        return <CoursePerformance />;
      case 3:
        return <AISuggestions />;
      case 4:
        return <CourseComparison />;
      case 5:
        return <CourseFinalization />;
      default:
        return <SelectCourse />;
    }
  };

  // Adjust height for different steps and fullscreen mode
  const getScrollAreaHeight = () => {
    // In fullscreen mode, provide more space
    if (isFullscreen) {
      return currentStep === 3 ? "h-[calc(100vh-140px)]" : "h-[calc(100vh-220px)]";
    }
    
    // Regular mode heights
    return currentStep === 3 ? "h-[calc(100vh-180px)]" : "h-[calc(100vh-260px)]";
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={cn(
        "bg-white border rounded-lg",
        isFullscreen ? "p-5" : "p-4"
      )}>
        <ScrollArea className={`${getScrollAreaHeight()} pr-4 transition-all duration-300`}>
          {renderStep()}
        </ScrollArea>
      </div>
      <WizardNavigation />
    </div>
  );
};

export default WizardContent;
