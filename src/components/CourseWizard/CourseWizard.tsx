
import React from "react";
import { WizardProvider } from "./WizardContext";
import WizardSteps from "./WizardSteps";
import WizardContent from "./WizardContent";

const CourseWizard = () => {
  return (
    <WizardProvider>
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        <WizardSteps />
        <WizardContent />
      </div>
    </WizardProvider>
  );
};

export default CourseWizard;
