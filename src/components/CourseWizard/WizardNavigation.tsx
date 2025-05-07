
import React from "react";
import { useWizard } from "./WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface WizardNavigationProps {
  isFullscreen?: boolean;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({ isFullscreen = false }) => {
  const { 
    currentStep, 
    totalSteps, 
    nextStep, 
    prevStep,
    selectedCourse
  } = useWizard();

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const hasSelectedCourse = !!selectedCourse;

  return (
    <div className={cn(
      "flex justify-between",
      isFullscreen ? "mt-6" : "mt-4"
    )}>
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={isFirstStep}
        className={isFirstStep ? "invisible" : ""}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Button
        onClick={nextStep}
        disabled={currentStep === 1 && !hasSelectedCourse}
      >
        {isLastStep ? "Complete" : "Next"}
        {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};

export default WizardNavigation;
