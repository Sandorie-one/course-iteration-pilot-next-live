
import React from "react";
import { WizardProvider } from "./WizardContext";
import WizardSteps from "./WizardSteps";
import WizardContent from "./WizardContent";
import { cn } from "@/lib/utils";

interface CourseWizardProps {
  isFullscreen?: boolean;
}

const CourseWizard: React.FC<CourseWizardProps> = ({ isFullscreen = false }) => {
  return (
    <WizardProvider>
      <div className={cn(
        "flex flex-col gap-6 w-full mx-auto transition-all duration-300",
        isFullscreen 
          ? "max-w-[1400px] px-4 md:px-6 lg:px-8" 
          : "max-w-4xl"
      )}>
        <WizardSteps isFullscreen={isFullscreen} />
        <WizardContent isFullscreen={isFullscreen} />
      </div>
    </WizardProvider>
  );
};

export default CourseWizard;
