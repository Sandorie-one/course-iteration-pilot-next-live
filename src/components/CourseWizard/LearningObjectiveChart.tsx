
import React from "react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine
} from "recharts";
import { useWizard } from "./WizardContext";

type LearningObjectiveChartProps = {
  className?: string;
}

const LearningObjectiveChart = ({ className }: LearningObjectiveChartProps) => {
  const { performanceData } = useWizard();
  
  if (!performanceData?.learningObjectives?.length) {
    return <div className="text-center py-8">No learning objective data available</div>;
  }

  // Transform the data for the stacked bar chart
  const chartData = performanceData.learningObjectives.map(objective => ({
    name: objective.name,
    id: objective.id,
    description: objective.description,
    target: objective.target,
    mastery: objective.mastery,
    excellent: objective.students.excellent,
    proficient: objective.students.proficient,
    developing: objective.students.developing,
    struggling: objective.students.struggling
  }));

  const config = {
    excellent: {
      label: "Excellent (90%+)",
      color: "#22c55e", // Green
    },
    proficient: {
      label: "Proficient (70-89%)",
      color: "#3b82f6", // Blue
    },
    developing: {
      label: "Developing (50-69%)",
      color: "#f59e0b", // Amber
    },
    struggling: {
      label: "Struggling (<50%)",
      color: "#ef4444", // Red
    },
    target: {
      label: "Target",
      color: "#6b7280", // Gray
    }
  };

  return (
    <div className={`w-full h-[400px] ${className}`}>
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={150}
              tickLine={false}
            />
            <ReferenceLine 
              yAxisId={0}
              x={75} 
              stroke="var(--color-target)" 
              strokeWidth={2} 
              strokeDasharray="3 3" 
              label={{ value: 'Target Mastery', position: 'top' }}
            />
            <Tooltip
              content={
                <ChartTooltipContent 
                  formatter={(value, name) => [`${value}% of students`, config[name as keyof typeof config]?.label || name]}
                  labelFormatter={(label, payload) => {
                    const dataItem = payload && payload[0]?.payload;
                    return dataItem 
                      ? <div>
                          <p className="font-bold">{label}</p>
                          <p className="text-xs mt-1">{dataItem.description}</p>
                          <p className="text-xs mt-1">Average Mastery: {dataItem.mastery}%</p>
                          <p className="text-xs">Target: {dataItem.target}%</p>
                        </div> 
                      : label;
                  }}
                />
              }
            />
            <Legend />
            <Bar dataKey="excellent" stackId="a" fill="var(--color-excellent)" />
            <Bar dataKey="proficient" stackId="a" fill="var(--color-proficient)" />
            <Bar dataKey="developing" stackId="a" fill="var(--color-developing)" />
            <Bar dataKey="struggling" stackId="a" fill="var(--color-struggling)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default LearningObjectiveChart;
