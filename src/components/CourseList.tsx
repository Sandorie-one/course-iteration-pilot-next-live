
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

type Course = {
  id: string;
  code: string;
  title: string;
  semester: string;
  improvements: number;
  timeEstimate: number;
  status: "current" | "past" | "upcoming";
  impact: "low" | "medium" | "high";
};

const CourseList = () => {
  const [courses] = useState<Course[]>([
    {
      id: "1",
      code: "CS101",
      title: "Introduction to Computer Science",
      semester: "Fall 2023",
      improvements: 5,
      timeEstimate: 1.5,
      status: "past",
      impact: "medium"
    },
    {
      id: "2",
      code: "BIO220",
      title: "Molecular Biology",
      semester: "Spring 2024",
      improvements: 3,
      timeEstimate: 1.0,
      status: "current",
      impact: "high"
    },
    {
      id: "3",
      code: "MATH330",
      title: "Advanced Calculus",
      semester: "Fall 2023",
      improvements: 2,
      timeEstimate: 0.5,
      status: "past",
      impact: "low"
    },
    {
      id: "4",
      code: "ENG215",
      title: "Creative Writing",
      semester: "Fall 2024",
      improvements: 0,
      timeEstimate: 0,
      status: "upcoming",
      impact: "low"
    },
    {
      id: "5",
      code: "PHYS101",
      title: "Physics for Non-majors",
      semester: "Spring 2024",
      improvements: 2,
      timeEstimate: 1.5,
      status: "current",
      impact: "high"
    }
  ]);

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800";
      case "past":
        return "bg-slate-100 text-slate-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  const getImpactColor = (impact: Course["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  const getImpactDescription = (impact: Course["impact"]) => {
    switch (impact) {
      case "high":
        return {
          title: "High Impact",
          description: "Addressing these opportunities could improve student performance by 10-15% and significantly enhance mastery of key learning outcomes. Strongly recommended to implement before the next major assessment."
        };
      case "medium":
        return {
          title: "Medium Impact",
          description: "Implementation may lead to a 5-8% improvement in student performance and better understanding of important concepts. Consider implementing when time permits."
        };
      case "low":
        return {
          title: "Low Impact",
          description: "Minor improvements that could enhance student experience but likely won't significantly affect grades or learning outcome mastery. These can be addressed at your convenience."
        };
      default:
        return {
          title: "",
          description: ""
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Course</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Semester</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Improvement opportunities</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Impact</th>
              <th className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50">
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="font-medium text-slate-900">{course.code}</div>
                  <div className="text-sm text-slate-500">{course.title}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                  {course.semester}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <Badge className={getStatusColor(course.status)}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                  {course.improvements > 0 ? (
                    <span className="font-medium text-amber-600">
                      {course.improvements} {course.status === "past" ? "missed opportunities" : "opportunities"}
                    </span>
                  ) : "No issues found"}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {course.improvements > 0 && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="flex items-center cursor-help">
                          <Badge className={getImpactColor(course.impact)}>
                            {course.impact.charAt(0).toUpperCase() + course.impact.slice(1)}
                          </Badge>
                          <Info size={14} className="ml-1 text-slate-400" />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent 
                        className="w-80 break-words"
                        side="right"
                        align="start"
                        sideOffset={10}
                        openDelay={100}
                        closeDelay={300}
                      >
                        <div>
                          <h4 className="font-semibold mb-2">{getImpactDescription(course.impact).title}</h4>
                          <p className="text-sm text-slate-600 break-words">
                            {getImpactDescription(course.impact).description}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm">
                  <Link to={`/course/${course.id}`}>
                    <Button variant="ghost" size="sm">
                      View <ArrowRight className="ml-1" size={16} />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
