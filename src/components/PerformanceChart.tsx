
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { module: "M1", name: "Introduction", currentGrade: 88, previousGrade: 85, target: 80 },
  { module: "M2", name: "Basics", currentGrade: 82, previousGrade: 83, target: 80 },
  { module: "M3", name: "Variables", currentGrade: 75, previousGrade: 76, target: 80 },
  { module: "M4", name: "Algorithms", currentGrade: 62, previousGrade: 72, target: 80 },
  { module: "M5", name: "Functions", currentGrade: 78, previousGrade: 75, target: 80 },
  { module: "M6", name: "Objects", currentGrade: 76, previousGrade: 72, target: 80 },
  { module: "M7", name: "Recursion", currentGrade: 68, previousGrade: 71, target: 80 },
  { module: "M8", name: "Data Struct", currentGrade: 74, previousGrade: 70, target: 80 },
  { module: "M9", name: "Adv. Topics", currentGrade: 80, previousGrade: 75, target: 80 },
  { module: "M10", name: "Final Proj", currentGrade: 72, previousGrade: 78, target: 80 },
];

const config = {
  currentGrade: {
    label: "Current Semester",
    color: "#3b82f6",
  },
  previousGrade: {
    label: "Previous Semester",
    color: "#94a3b8",
  },
  target: {
    label: "Target",
    color: "#10b981",
  },
};

const PerformanceChart = () => {
  return (
    <div className="w-full h-80">
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
          >
            <XAxis 
              dataKey="module" 
              tickLine={true}
              axisLine={true}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              domain={[50, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  labelFormatter={(label) => {
                    const item = data.find((d) => d.module === label);
                    return item ? item.name : label;
                  }}
                />
              }
            />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="currentGrade"
              activeDot={{ r: 6 }}
              stroke="var(--color-currentGrade)"
            />
            <Line 
              type="monotone"
              strokeWidth={2}
              stroke="var(--color-previousGrade)"
              dataKey="previousGrade"
              strokeDasharray="5 5"
            />
            <Line
              type="monotone" 
              stroke="var(--color-target)"
              strokeWidth={2}
              dataKey="target"
              strokeDasharray="3 3"
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default PerformanceChart;
