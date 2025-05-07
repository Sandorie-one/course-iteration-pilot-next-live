
import React from "react";
import { useWizard } from "../WizardContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Modules</TableHead>
            <TableHead>Avg. Grade</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coursesList.map((course) => (
            <TableRow 
              key={course.id} 
              className={selectedCourse?.id === course.id ? "bg-primary/10" : ""}
            >
              <TableCell className="font-medium">
                <div>{course.title}</div>
                <div className="text-sm text-slate-500">{course.code}</div>
              </TableCell>
              <TableCell>{course.modules}</TableCell>
              <TableCell>{course.avgGrade}%</TableCell>
              <TableCell>{course.semester}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant={selectedCourse?.id === course.id ? "default" : "outline"} 
                  onClick={() => selectCourse(course)}
                  size="sm"
                >
                  {selectedCourse?.id === course.id ? "Selected" : "Select Course"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SelectCourse;
