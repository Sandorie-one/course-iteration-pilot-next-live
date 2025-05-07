
import React, { createContext, useContext, useState, ReactNode } from "react";

type Course = {
  id: string;
  title: string;
  code: string;
  semester: string;
  modules: number;
  students: number;
  avgGrade: number;
};

type CourseModule = {
  id: string;
  title: string;
  description: string;
  duration: number;
  order: number;
};

type Suggestion = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  selected: boolean;
};

type PerformanceData = {
  strengths: string[];
  weaknesses: string[];
  studentFeedback: {
    positive: string[];
    negative: string[];
  };
  modulePerformance: {
    moduleId: string;
    name: string;
    score: number;
    previousScore?: number;
  }[];
};

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  selectedCourse: Course | null;
  courseModules: CourseModule[];
  suggestions: Suggestion[];
  performanceData: PerformanceData | null;
  isLoading: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  selectCourse: (course: Course) => void;
  updateSuggestion: (id: string, selected: boolean) => void;
  coursesList: Course[];
}

const defaultContext: WizardContextType = {
  currentStep: 1,
  totalSteps: 5,
  selectedCourse: null,
  courseModules: [],
  suggestions: [],
  performanceData: null,
  isLoading: false,
  nextStep: () => {},
  prevStep: () => {},
  goToStep: () => {},
  selectCourse: () => {},
  updateSuggestion: () => {},
  coursesList: []
};

const WizardContext = createContext<WizardContextType>(defaultContext);

export const useWizard = () => useContext(WizardContext);

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [courseModules, setCourseModules] = useState<CourseModule[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);

  // Mock course data
  const coursesList = [
    {
      id: "1",
      title: "Introduction to Computer Science",
      code: "CS101",
      semester: "Fall 2024",
      modules: 10,
      students: 120,
      avgGrade: 78
    },
    {
      id: "2",
      title: "Data Structures and Algorithms",
      code: "CS201",
      semester: "Spring 2024",
      modules: 12,
      students: 85,
      avgGrade: 72
    },
    {
      id: "3",
      title: "Web Development Fundamentals",
      code: "CS310",
      semester: "Fall 2024",
      modules: 8,
      students: 95,
      avgGrade: 81
    },
    {
      id: "4",
      title: "Database Management",
      code: "CS315",
      semester: "Spring 2024",
      modules: 9,
      students: 65,
      avgGrade: 76
    },
    {
      id: "5",
      title: "Artificial Intelligence",
      code: "CS450",
      semester: "Fall 2023",
      modules: 11,
      students: 45,
      avgGrade: 68
    }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const selectCourse = (course: Course) => {
    setIsLoading(true);
    setSelectedCourse(course);
    
    // Simulate API call to fetch course modules and performance data
    setTimeout(() => {
      // Mock course modules
      const modules = [
        { id: "m1", title: "Introduction", description: "Course overview and fundamentals", duration: 2, order: 1 },
        { id: "m2", title: "Basic Concepts", description: "Core concepts and terminology", duration: 3, order: 2 },
        { id: "m3", title: "Advanced Topics", description: "Deeper exploration of key areas", duration: 4, order: 3 },
        { id: "m4", title: "Practical Applications", description: "Real-world use cases and examples", duration: 3, order: 4 },
        { id: "m5", title: "Final Project", description: "Capstone project implementing learned concepts", duration: 6, order: 5 }
      ];
      
      // Mock suggestions - ensure we use the correct types for impact and effort
      const courseSuggestions: Suggestion[] = [
        { 
          id: "s1", 
          moduleId: "m1", 
          title: "Add interactive quiz",
          description: "Add an interactive quiz at the end of the introduction module to improve engagement and retention",
          impact: "high", 
          effort: "low", 
          selected: false 
        },
        { 
          id: "s2", 
          moduleId: "m2", 
          title: "Include more visual examples",
          description: "Add more diagrams and visual examples to explain abstract concepts",
          impact: "medium", 
          effort: "medium", 
          selected: false 
        },
        { 
          id: "s3", 
          moduleId: "m3", 
          title: "Restructure content flow",
          description: "Reorganize advanced topics to build more logically on previous concepts",
          impact: "high", 
          effort: "high", 
          selected: false 
        },
        { 
          id: "s4", 
          moduleId: "m4", 
          title: "Add industry case studies",
          description: "Include recent case studies from industry to demonstrate practical relevance",
          impact: "medium", 
          effort: "medium", 
          selected: false 
        },
        { 
          id: "s5", 
          moduleId: "m5", 
          title: "Create milestone structure",
          description: "Break final project into milestone deliverables to improve completion rates",
          impact: "high", 
          effort: "medium", 
          selected: false 
        }
      ];
      
      // Mock performance data
      const mockPerformanceData = {
        strengths: [
          "Strong student engagement in practical sessions",
          "High completion rate for assignments",
          "Positive feedback on lecture materials"
        ],
        weaknesses: [
          "Low quiz scores in modules 3 and 4",
          "Student feedback indicates difficulty understanding advanced topics",
          "High drop-off rate during final project phase"
        ],
        studentFeedback: {
          positive: [
            "Enjoyed the interactive elements",
            "Found the course structure logical",
            "Appreciated the real-world examples"
          ],
          negative: [
            "Too much theory without practical application",
            "Final project requirements unclear",
            "Would benefit from more visual aids"
          ]
        },
        modulePerformance: [
          { moduleId: "m1", name: "Introduction", score: 85, previousScore: 82 },
          { moduleId: "m2", name: "Basic Concepts", score: 78, previousScore: 75 },
          { moduleId: "m3", name: "Advanced Topics", score: 62, previousScore: 68 },
          { moduleId: "m4", name: "Practical Applications", score: 71, previousScore: 69 },
          { moduleId: "m5", name: "Final Project", score: 65, previousScore: 72 }
        ]
      };

      setCourseModules(modules);
      setSuggestions(courseSuggestions);
      setPerformanceData(mockPerformanceData);
      setIsLoading(false);
    }, 1000);
  };

  const updateSuggestion = (id: string, selected: boolean) => {
    setSuggestions(
      suggestions.map(suggestion => 
        suggestion.id === id ? { ...suggestion, selected } : suggestion
      )
    );
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        totalSteps,
        selectedCourse,
        courseModules,
        suggestions,
        performanceData,
        isLoading,
        nextStep,
        prevStep,
        goToStep,
        selectCourse,
        updateSuggestion,
        coursesList
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
