
import React from "react";
import { useWizard } from "../WizardContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SelectCourse = () => {
  const { coursesList, selectCourse, selectedCourse } = useWizard();

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Select a Course to Leverage</h2>
        <p className="text-slate-500">
          Choose an existing course as a starting point for your new course. 
          We'll analyze its performance and suggest improvements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coursesList.map((course) => (
          <Card 
            key={course.id} 
            className={`cursor-pointer transition hover:shadow-md ${
              selectedCourse?.id === course.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => selectCourse(course)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-slate-500">{course.code} • {course.semester}</p>
                  </div>
                  {selectedCourse?.id === course.id && (
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                      Selected
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center p-2 bg-slate-50 rounded">
                    <div className="text-lg font-medium">{course.modules}</div>
                    <div className="text-xs text-slate-500">Modules</div>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded">
                    <div className="text-lg font-medium">{course.students}</div>
                    <div className="text-xs text-slate-500">Students</div>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded">
                    <div className="text-lg font-medium">{course.avgGrade}%</div>
                    <div className="text-xs text-slate-500">Avg. Grade</div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button 
                    variant={selectedCourse?.id === course.id ? "default" : "outline"} 
                    className="w-full"
                    onClick={() => selectCourse(course)}
                  >
                    {selectedCourse?.id === course.id ? "Selected" : "Select Course"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SelectCourse;
