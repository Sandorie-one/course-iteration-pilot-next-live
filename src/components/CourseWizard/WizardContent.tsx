
import React from "react";
import { useWizard } from "./WizardContext";
import SelectCourse from "./steps/SelectCourse";
import CoursePerformance from "./steps/CoursePerformance";
import AISuggestions from "./steps/AISuggestions";
import CourseComparison from "./steps/CourseComparison";
import CourseFinalization from "./steps/CourseFinalization";
import WizardNavigation from "./WizardNavigation";

const WizardContent = () => {
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

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border rounded-lg p-6">
        {renderStep()}
      </div>
      <WizardNavigation />
    </div>
  );
};

export default WizardContent;
