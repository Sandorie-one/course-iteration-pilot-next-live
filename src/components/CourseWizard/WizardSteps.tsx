
import React from "react";
import { useWizard } from "./WizardContext";
import { Check } from "lucide-react";

const WizardSteps = () => {
  const { currentStep, totalSteps, goToStep, selectedCourse } = useWizard();

  const steps = [
    { id: 1, label: "Select Course" },
    { id: 2, label: "Review Performance" },
    { id: 3, label: "AI Suggestions" },
    { id: 4, label: "Course Comparison" },
    { id: 5, label: "Customize & Finalize" }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep > step.id 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : currentStep === step.id 
                    ? "border-primary text-primary" 
                    : "border-gray-300 text-gray-300"
                }`}
                onClick={() => selectedCourse && step.id < currentStep && goToStep(step.id)}
                style={{ cursor: selectedCourse && step.id < currentStep ? "pointer" : "default" }}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span 
                className={`text-xs mt-2 ${
                  currentStep >= step.id ? "text-primary font-medium" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-0.5 ${
                  currentStep > index + 1 ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WizardSteps;
