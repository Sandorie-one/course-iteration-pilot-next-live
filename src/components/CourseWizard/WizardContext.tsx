
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

// Course structure types
type ContentItem = {
  id: string;
  title: string;
  description: string;
  type: string;
  isHighlighted: boolean;
  isModified: boolean;
  isNew: boolean;
};

type ContentType = {
  id: string;
  name: string;
  items: ContentItem[];
};

type CourseWeek = {
  id: string;
  order: number;
  title: string;
  description: string;
  isHighlighted: boolean;
  contentTypes: ContentType[];
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
  // New properties for course structure
  courseStructure: CourseWeek[];
  previewSuggestion: (id: string | null) => void;
  applySuggestion: (id: string) => void;
  activePreviewId: string | null;
  appliedSuggestions: string[];
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
  coursesList: [],
  // New default values
  courseStructure: [],
  previewSuggestion: () => {},
  applySuggestion: () => {},
  activePreviewId: null,
  appliedSuggestions: []
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
  
  // New state for course structure
  const [courseStructure, setCourseStructure] = useState<CourseWeek[]>([]);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([]);

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

  // Function to create mock course structure
  const createMockCourseStructure = () => {
    return [
      {
        id: "week1",
        order: 1,
        title: "Course Introduction",
        description: "Introduction to the course and fundamental concepts",
        isHighlighted: false,
        contentTypes: [
          {
            id: "lectures-w1",
            name: "Lectures",
            items: [
              {
                id: "lec1",
                title: "Course Overview & Syllabus",
                description: "Introduction to course objectives and expectations",
                type: "lecture",
                isHighlighted: false,
                isModified: false,
                isNew: false
              },
              {
                id: "lec2",
                title: "Introduction to Key Concepts",
                description: "Overview of fundamental concepts",
                type: "lecture",
                isHighlighted: false,
                isModified: false,
                isNew: false
              }
            ]
          },
          {
            id: "assignments-w1",
            name: "Assignments",
            items: [
              {
                id: "assign1",
                title: "Concept Mapping Exercise",
                description: "Create a concept map of key terms",
                type: "assignment",
                isHighlighted: false,
                isModified: false,
                isNew: false
              }
            ]
          },
          {
            id: "quizzes-w1",
            name: "Quizzes",
            items: [
              {
                id: "quiz1",
                title: "Basic Terminology Quiz",
                description: "Test on basic terminology",
                type: "quiz",
                isHighlighted: false,
                isModified: false,
                isNew: false
              }
            ]
          }
        ]
      },
      {
        id: "week2",
        order: 2,
        title: "Core Principles",
        description: "Exploring core principles and methodologies",
        isHighlighted: false,
        contentTypes: [
          {
            id: "lectures-w2",
            name: "Lectures",
            items: [
              {
                id: "lec3",
                title: "Foundation Principles",
                description: "Detailed exploration of foundation principles",
                type: "lecture",
                isHighlighted: false,
                isModified: false,
                isNew: false
              },
              {
                id: "lec4",
                title: "Application Methods",
                description: "Methods for practical applications",
                type: "lecture",
                isHighlighted: false,
                isModified: false,
                isNew: false
              }
            ]
          },
          {
            id: "readings-w2",
            name: "Readings",
            items: [
              {
                id: "read1",
                title: "Core Concepts Research Paper",
                description: "Recent research on core concepts",
                type: "reading",
                isHighlighted: false,
                isModified: false,
                isNew: false
              }
            ]
          },
          {
            id: "assignments-w2",
            name: "Assignments",
            items: [
              {
                id: "assign2",
                title: "Principle Application Task",
                description: "Apply principles to a real-world scenario",
                type: "assignment",
                isHighlighted: false,
                isModified: false,
                isNew: false
              }
            ]
          }
        ]
      },
      {
        id: "week3",
        order: 3,
        title: "Advanced Topics",
        description: "Deep dive into advanced topics and techniques",
        isHighlighted: false,
        contentTypes: [
          {
            id: "lectures-w3",
            name: "Lectures",
            items: [
              {
                id: "lec5",
                title: "Advanced Methodologies",
                description: "Exploration of cutting-edge methods",
                type: "lecture",
                isHighlighted: false,
                isModified: false,
                isNew: false
              }
            ]
          },
          {
            id: "workshops-w3",
            name: "Workshops",
            items: [
              {
                id: "wkshp1",
                title: "Practical Implementation Workshop",
                description: "Hands-on session implementing advanced techniques",
                type: "workshop",
                isHighlighted: false,
                isModified: false,
                isNew: false
              }
            ]
          },
          {
            id: "assignments-w3",
            name: "Assignments",
            items: [
              {
                id: "assign3",
                title: "Advanced Implementation Project",
                description: "Complex project applying advanced concepts",
                type: "assignment",
                isHighlighted: false,
                isModified: false,
                isNew: false
              }
            ]
          }
        ]
      }
    ];
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

      // Initialize course structure
      const mockCourseStructure = createMockCourseStructure();

      setCourseModules(modules);
      setSuggestions(courseSuggestions);
      setPerformanceData(mockPerformanceData);
      setCourseStructure(mockCourseStructure);
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

  // New functions for suggestion interactions with course structure
  const previewSuggestion = (id: string | null) => {
    // Reset all highlights
    const resetStructure = courseStructure.map(week => ({
      ...week,
      isHighlighted: false,
      contentTypes: week.contentTypes.map(contentType => ({
        ...contentType,
        items: contentType.items.map(item => ({
          ...item,
          isHighlighted: false
        }))
      }))
    }));

    if (!id) {
      setCourseStructure(resetStructure);
      setActivePreviewId(null);
      return;
    }

    // Find the suggestion
    const suggestion = suggestions.find(s => s.id === id);
    if (!suggestion) return;

    // Highlight appropriate course sections based on suggestion
    let updatedStructure = [...resetStructure];
    
    // This is simplified logic - in a real app, you would have more complex targeting
    switch (suggestion.id) {
      case "s1": // Add interactive quiz
        updatedStructure = updatedStructure.map(week => 
          week.order === 1 ? {
            ...week,
            isHighlighted: true,
            contentTypes: week.contentTypes.map(ct => 
              ct.id === "quizzes-w1" ? {
                ...ct,
                items: ct.items.map(item => ({
                  ...item,
                  isHighlighted: true
                }))
              } : ct
            )
          } : week
        );
        break;
        
      case "s2": // Include more visual examples
        updatedStructure = updatedStructure.map(week => 
          week.order === 2 ? {
            ...week,
            isHighlighted: true,
            contentTypes: week.contentTypes.map(ct => 
              ct.id === "lectures-w2" ? {
                ...ct,
                items: ct.items.map(item => ({
                  ...item,
                  isHighlighted: true
                }))
              } : ct
            )
          } : week
        );
        break;
        
      case "s3": // Restructure content flow
        updatedStructure = updatedStructure.map(week => 
          week.order === 3 ? {
            ...week,
            isHighlighted: true,
            contentTypes: week.contentTypes.map(ct => ({
              ...ct,
              items: ct.items.map(item => ({
                ...item,
                isHighlighted: true
              }))
            }))
          } : week
        );
        break;
        
      case "s4": // Add industry case studies
        updatedStructure = updatedStructure.map(week => 
          week.order === 2 ? {
            ...week,
            contentTypes: week.contentTypes.map(ct => 
              ct.id === "readings-w2" ? {
                ...ct,
                items: ct.items.map(item => ({
                  ...item,
                  isHighlighted: true
                }))
              } : ct
            )
          } : week
        );
        break;
        
      case "s5": // Create milestone structure
        updatedStructure = updatedStructure.map(week => 
          week.order === 3 ? {
            ...week,
            contentTypes: week.contentTypes.map(ct => 
              ct.id === "assignments-w3" ? {
                ...ct,
                items: ct.items.map(item => ({
                  ...item,
                  isHighlighted: true
                }))
              } : ct
            )
          } : week
        );
        break;
    }

    setCourseStructure(updatedStructure);
    setActivePreviewId(id);
  };

  const applySuggestion = (id: string) => {
    // Find the suggestion
    const suggestion = suggestions.find(s => s.id === id);
    if (!suggestion) return;
    
    // Reset all highlights first
    const resetStructure = courseStructure.map(week => ({
      ...week,
      isHighlighted: false,
      contentTypes: week.contentTypes.map(contentType => ({
        ...contentType,
        items: contentType.items.map(item => ({
          ...item,
          isHighlighted: false
        }))
      }))
    }));

    // Apply changes based on suggestion
    let updatedStructure = [...resetStructure];
    
    switch (suggestion.id) {
      case "s1": // Add interactive quiz
        updatedStructure = updatedStructure.map(week => 
          week.order === 1 ? {
            ...week,
            contentTypes: week.contentTypes.map(ct => 
              ct.id === "quizzes-w1" ? {
                ...ct,
                items: [
                  ...ct.items,
                  {
                    id: "quiz-new-1",
                    title: "Interactive Module Completion Quiz",
                    description: "Interactive quiz with feedback to reinforce key concepts",
                    type: "quiz",
                    isHighlighted: false,
                    isModified: true,
                    isNew: true
                  }
                ]
              } : ct
            )
          } : week
        );
        break;
        
      case "s2": // Include more visual examples
        updatedStructure = updatedStructure.map(week => 
          week.order === 2 ? {
            ...week,
            contentTypes: week.contentTypes.map(ct => 
              ct.id === "lectures-w2" ? {
                ...ct,
                items: ct.items.map(item => 
                  item.id === "lec3" ? {
                    ...item,
                    title: "Foundation Principles with Visual Aids",
                    isModified: true
                  } : item
                )
              } : ct
            )
          } : week
        );
        break;
        
      case "s3": // Restructure content flow
        updatedStructure = updatedStructure.map(week => 
          week.order === 3 ? {
            ...week,
            contentTypes: week.contentTypes.map(ct => ({
              ...ct,
              items: ct.items.map(item => ({
                ...item,
                isModified: true
              }))
            }))
          } : week
        );
        break;
        
      case "s4": // Add industry case studies
        updatedStructure = updatedStructure.map(week => 
          week.order === 2 ? {
            ...week,
            contentTypes: week.contentTypes.map(ct => 
              ct.id === "readings-w2" ? {
                ...ct,
                items: [
                  ...ct.items,
                  {
                    id: "read-new-1",
                    title: "Industry Case Study: Real-World Applications",
                    description: "Analysis of recent industry examples",
                    type: "reading",
                    isHighlighted: false,
                    isModified: true,
                    isNew: true
                  }
                ]
              } : ct
            )
          } : week
        );
        break;
        
      case "s5": // Create milestone structure
        updatedStructure = updatedStructure.map(week => 
          week.order === 3 ? {
            ...week,
            contentTypes: week.contentTypes.map(ct => 
              ct.id === "assignments-w3" ? {
                ...ct,
                items: [
                  {
                    id: "assign3-1",
                    title: "Project Milestone 1: Planning",
                    description: "Initial project planning and requirements",
                    type: "assignment",
                    isHighlighted: false,
                    isModified: true,
                    isNew: true
                  },
                  {
                    id: "assign3-2",
                    title: "Project Milestone 2: Implementation",
                    description: "Core implementation of project features",
                    type: "assignment",
                    isHighlighted: false,
                    isModified: true,
                    isNew: true
                  },
                  {
                    id: "assign3-3",
                    title: "Project Final Submission",
                    description: "Final project with documentation and reflection",
                    type: "assignment",
                    isHighlighted: false,
                    isModified: true,
                    isNew: false
                  }
                ]
              } : ct
            )
          } : week
        );
        break;
    }
    
    // Mark suggestion as applied
    setAppliedSuggestions([...appliedSuggestions, id]);
    setCourseStructure(updatedStructure);
    setActivePreviewId(null);
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
        coursesList,
        // New values
        courseStructure,
        previewSuggestion,
        applySuggestion,
        activePreviewId,
        appliedSuggestions
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
