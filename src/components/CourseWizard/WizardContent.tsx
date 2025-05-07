
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
    // In fullscreen mode, provide more space but ensure navigation buttons remain visible
    if (isFullscreen) {
      // Reserve more space at the bottom for navigation buttons in fullscreen mode
      return currentStep === 3 ? "h-[calc(100vh-220px)]" : "h-[calc(100vh-280px)]";
    }
    
    // Regular mode heights
    return currentStep === 3 ? "h-[calc(100vh-180px)]" : "h-[calc(100vh-260px)]";
  };

  return (
    <div className={cn(
      "flex flex-col gap-4",
      isFullscreen && "px-4 md:px-6"
    )}>
      <div className={cn(
        "bg-white border rounded-lg",
        isFullscreen ? "p-6" : "p-4"
      )}>
        <ScrollArea className={cn(
          getScrollAreaHeight(),
          "px-1 transition-all duration-300",
          isFullscreen ? "pr-6" : "pr-4"
        )}>
          <div className={isFullscreen ? "px-2" : ""}>
            {renderStep()}
          </div>
        </ScrollArea>
      </div>
      <WizardNavigation isFullscreen={isFullscreen} />
    </div>
  );
};

export default WizardContent;
