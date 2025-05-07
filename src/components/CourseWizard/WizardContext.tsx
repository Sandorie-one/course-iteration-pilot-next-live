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

// New types for course outline
type ContentType = "reading" | "assignment" | "discussion" | "quiz";

type CourseContent = {
  id: string;
  title: string;
  type: ContentType;
  description: string;
  isNew?: boolean;
};

type CourseWeek = {
  id: string;
  title: string;
  order: number;
  content: CourseContent[];
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
  bloomsTaxonomy: {
    remember: number;
    understand: number;
    apply: number;
    analyze: number;
    evaluate: number;
    create: number;
    balanceScore: number;
  };
  studentEngagement: {
    moduleId: string;
    moduleName: string;
    participationRate: number;
    timeSpent: number;
    expectedTime: number;
    completionRate: number;
  }[];
  learningChallenges: {
    id: string;
    topic: string;
    moduleId: string;
    moduleName: string;
    successRate: number;
    difficulty: "high" | "medium" | "low";
    commonMisconception: string;
  }[];
  opportunityCount: number;
  courseHealthScore: number;
};

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  selectedCourse: Course | null;
  courseModules: CourseModule[];
  suggestions: Suggestion[];
  performanceData: PerformanceData | null;
  isLoading: boolean;
  courseOutline: CourseWeek[]; // New state for course outline
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  selectCourse: (course: Course) => void;
  updateSuggestion: (id: string, selected: boolean) => void;
  coursesList: Course[];
  applySuggestion: (suggestionId: string) => void; // New function to apply suggestion to outline
  previewSuggestion: (suggestionId: string) => void; // New function to preview a suggestion
  clearPreview: () => void; // Clear any active preview
}

const defaultContext: WizardContextType = {
  currentStep: 1,
  totalSteps: 5,
  selectedCourse: null,
  courseModules: [],
  suggestions: [],
  performanceData: null,
  isLoading: false,
  courseOutline: [], // Initialize empty course outline
  nextStep: () => {},
  prevStep: () => {},
  goToStep: () => {},
  selectCourse: () => {},
  updateSuggestion: () => {},
  coursesList: [],
  applySuggestion: () => {},
  previewSuggestion: () => {},
  clearPreview: () => {}
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
  const [courseOutline, setCourseOutline] = useState<CourseWeek[]>([]); // State for course outline
  const [previewSuggestionId, setPreviewSuggestionId] = useState<string | null>(null);

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
      const mockPerformanceData: PerformanceData = {
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
        ],
        bloomsTaxonomy: {
          remember: 45,
          understand: 30,
          apply: 15,
          analyze: 5,
          evaluate: 3,
          create: 2,
          balanceScore: 62
        },
        studentEngagement: [
          { moduleId: "m1", moduleName: "Introduction", participationRate: 89, timeSpent: 115, expectedTime: 120, completionRate: 94 },
          { moduleId: "m2", moduleName: "Basic Concepts", participationRate: 82, timeSpent: 160, expectedTime: 180, completionRate: 87 },
          { moduleId: "m3", moduleName: "Advanced Topics", participationRate: 68, timeSpent: 190, expectedTime: 240, completionRate: 72 },
          { moduleId: "m4", moduleName: "Practical Applications", participationRate: 76, timeSpent: 155, expectedTime: 180, completionRate: 80 },
          { moduleId: "m5", moduleName: "Final Project", participationRate: 58, timeSpent: 280, expectedTime: 360, completionRate: 65 }
        ],
        learningChallenges: [
          { id: "lc1", topic: "Object-Oriented Principles", moduleId: "m3", moduleName: "Advanced Topics", successRate: 54, difficulty: "high", commonMisconception: "Confusion between inheritance and composition" },
          { id: "lc2", topic: "Recursion Concepts", moduleId: "m3", moduleName: "Advanced Topics", successRate: 48, difficulty: "high", commonMisconception: "Difficulty understanding the base case" },
          { id: "lc3", topic: "API Integration", moduleId: "m4", moduleName: "Practical Applications", successRate: 62, difficulty: "medium", commonMisconception: "Misunderstanding request/response cycles" },
          { id: "lc4", topic: "Database Relationships", moduleId: "m4", moduleName: "Practical Applications", successRate: 59, difficulty: "medium", commonMisconception: "Confusion with join operations and foreign keys" },
          { id: "lc5", topic: "Project Architecture", moduleId: "m5", moduleName: "Final Project", successRate: 51, difficulty: "high", commonMisconception: "Difficulty with component separation and organization" }
        ],
        opportunityCount: 5,
        courseHealthScore: 71
      };

      // Mock course outline data
      const mockCourseOutline: CourseWeek[] = [
        {
          id: "w1",
          title: "Week 1: Getting Started",
          order: 1,
          content: [
            { id: "c1", title: "Course Introduction", type: "reading", description: "Overview of course topics and learning objectives" },
            { id: "c2", title: "Setup Your Environment", type: "assignment", description: "Install required software and tools" },
            { id: "c3", title: "Introduce Yourself", type: "discussion", description: "Share your background and interests with classmates" }
          ]
        },
        {
          id: "w2",
          title: "Week 2: Fundamentals",
          order: 2,
          content: [
            { id: "c4", title: "Basic Principles", type: "reading", description: "Core concepts and terminology" },
            { id: "c5", title: "Knowledge Check", type: "quiz", description: "Test your understanding of fundamental concepts" },
            { id: "c6", title: "Apply Fundamentals", type: "assignment", description: "Hands-on practice with core concepts" }
          ]
        },
        {
          id: "w3",
          title: "Week 3: Advanced Concepts",
          order: 3,
          content: [
            { id: "c7", title: "Advanced Theories", type: "reading", description: "Deeper exploration of key concepts" },
            { id: "c8", title: "Critical Analysis", type: "discussion", description: "Analyze and discuss complex scenarios" },
            { id: "c9", title: "Concept Assessment", type: "quiz", description: "Test your understanding of advanced concepts" }
          ]
        }
      ];

      setCourseModules(modules);
      setSuggestions(courseSuggestions);
      setPerformanceData(mockPerformanceData);
      setCourseOutline(mockCourseOutline);
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

  // Function to apply a suggestion to the course outline
  const applySuggestion = (suggestionId: string) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (!suggestion) return;

    let newCourseOutline = [...courseOutline];
    
    // Based on the suggestion, update the course outline
    // This is a simplified implementation - a real app would have more complex logic
    switch (suggestionId) {
      case "s1": // Add interactive quiz
        if (newCourseOutline[0]) {
          newCourseOutline[0].content.push({
            id: "new-quiz-1",
            title: "Introduction Quiz",
            type: "quiz",
            description: "Interactive quiz to reinforce key concepts",
            isNew: true
          });
        }
        break;
      case "s2": // Include more visual examples
        if (newCourseOutline[1]) {
          newCourseOutline[1].content.push({
            id: "new-reading-1",
            title: "Visual Guide to Core Concepts",
            type: "reading",
            description: "Illustrated explanations of key concepts with diagrams",
            isNew: true
          });
        }
        break;
      case "s3": // Restructure content flow
        if (newCourseOutline[2]) {
          // Reorder some content and add a new item
          newCourseOutline[2].content = [
            ...newCourseOutline[2].content,
            {
              id: "new-structure-1",
              title: "Concept Synthesis",
              type: "assignment",
              description: "Connect advanced topics with fundamental principles",
              isNew: true
            }
          ];
        }
        break;
      case "s4": // Add industry case studies
        if (newCourseOutline[2]) {
          newCourseOutline[2].content.push({
            id: "new-reading-2",
            title: "Industry Case Studies",
            type: "reading",
            description: "Real-world applications and examples from industry",
            isNew: true
          });
        }
        break;
      case "s5": // Create milestone structure
        // Add a new week with milestone structure
        newCourseOutline.push({
          id: "w4",
          title: "Week 4: Final Project Milestones",
          order: 4,
          content: [
            {
              id: "new-milestone-1",
              title: "Project Planning",
              type: "assignment",
              description: "Develop project plan and objectives",
              isNew: true
            },
            {
              id: "new-milestone-2",
              title: "Implementation Phase",
              type: "assignment",
              description: "Begin implementation based on project plan",
              isNew: true
            }
          ]
        });
        break;
    }
    
    setCourseOutline(newCourseOutline);
    
    // Mark suggestion as selected
    updateSuggestion(suggestionId, true);
    
    // Clear any active preview
    setPreviewSuggestionId(null);
  };

  // Preview a suggestion (temporary view)
  const previewSuggestion = (suggestionId: string) => {
    setPreviewSuggestionId(suggestionId);
  };

  // Clear preview
  const clearPreview = () => {
    setPreviewSuggestionId(null);
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
        courseOutline,
        nextStep,
        prevStep,
        goToStep,
        selectCourse,
        updateSuggestion,
        coursesList,
        applySuggestion,
        previewSuggestion,
        clearPreview
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
