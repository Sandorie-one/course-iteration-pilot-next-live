
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type Course = {
  id: string;
  code: string;
  title: string;
  semester: string;
  improvements: number;
  timeEstimate: number;
  status: "current" | "past" | "upcoming";
  impactLevel: "high" | "medium" | "low";
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
      impactLevel: "medium"
    },
    {
      id: "2",
      code: "BIO220",
      title: "Molecular Biology",
      semester: "Spring 2024",
      improvements: 3,
      timeEstimate: 1.0,
      status: "current",
      impactLevel: "high"
    },
    {
      id: "3",
      code: "MATH330",
      title: "Advanced Calculus",
      semester: "Fall 2023",
      improvements: 2,
      timeEstimate: 0.5,
      status: "past",
      impactLevel: "low"
    },
    {
      id: "4",
      code: "ENG215",
      title: "Creative Writing",
      semester: "Fall 2024",
      improvements: 0,
      timeEstimate: 0,
      status: "upcoming",
      impactLevel: "low"
    },
    {
      id: "5",
      code: "PHYS101",
      title: "Physics for Non-majors",
      semester: "Spring 2024",
      improvements: 2,
      timeEstimate: 1.5,
      status: "current",
      impactLevel: "medium"
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

  const getImpactBadge = (impactLevel: Course["impactLevel"]) => {
    switch (impactLevel) {
      case "high":
        return {
          badge: <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">High Impact</Badge>,
          description: "Expected to improve student performance by 15-20% and increase mastery of core learning objectives. Addressing these opportunities promptly is highly recommended."
        };
      case "medium":
        return {
          badge: <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Medium Impact</Badge>,
          description: "Could improve student performance by 8-12% and help clarify challenging concepts. These opportunities are worth implementing when time allows."
        };
      case "low":
        return {
          badge: <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Low Impact</Badge>,
          description: "May enhance the learning experience with 3-5% improvement in specific areas. These are nice-to-have improvements that can be addressed after higher priority items."
        };
      default:
        return {
          badge: null,
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
            {courses.map((course) => {
              const { badge, description } = getImpactBadge(course.impactLevel);
              return (
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
                            {badge}
                            <Info size={16} className="ml-2 text-slate-400" />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-medium">{course.impactLevel.charAt(0).toUpperCase() + course.impactLevel.slice(1)} Impact Level</h4>
                            <p className="text-sm text-slate-500">{description}</p>
                            
                            <div className="pt-2 border-t border-slate-100">
                              <div className="text-xs text-slate-500">
                                <span className="font-semibold">Projected Grade Impact:</span> 
                                {' '}{course.impactLevel === "high" ? "15-20%" : course.impactLevel === "medium" ? "8-12%" : "3-5%"} improvement
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                <span className="font-semibold">Learning Outcome Mastery:</span>
                                {' '}{course.impactLevel === "high" ? "Significant increase in core objectives" : course.impactLevel === "medium" ? "Moderate improvement in key areas" : "Minor enhancements to specific concepts"}
                              </div>
                            </div>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
