
import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BloomsTaxonomyData = {
  remember: number;
  understand: number;
  apply: number;
  analyze: number;
  evaluate: number;
  create: number;
  balanceScore: number;
};

const BloomsTaxonomyChart = ({ data }: { data: BloomsTaxonomyData }) => {
  // Transform data for the chart
  const chartData = [
    { name: "Remember", value: data.remember, color: "#94a3b8" }, // Lower-order thinking
    { name: "Understand", value: data.understand, color: "#64748b" },
    { name: "Apply", value: data.apply, color: "#3b82f6" },
    { name: "Analyze", value: data.analyze, color: "#2563eb" },
    { name: "Evaluate", value: data.evaluate, color: "#1d4ed8" },
    { name: "Create", value: data.create, color: "#1e40af" }, // Higher-order thinking
  ];
  
  const renderBalanceIndicator = () => {
    let color = "text-red-600";
    let message = "Poor balance";
    
    if (data.balanceScore >= 80) {
      color = "text-green-600";
      message = "Well balanced";
    } else if (data.balanceScore >= 60) {
      color = "text-amber-600";
      message = "Decent balance";
    }
    
    return <Badge variant="outline" className={`${color} ml-2`}>{message}</Badge>;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Bloom's Taxonomy Distribution</CardTitle>
          <div className="flex items-center">
            <span className="text-sm mr-2">Balance Score: {data.balanceScore}</span>
            {renderBalanceIndicator()}
          </div>
        </div>
        <CardDescription>
          Distribution of cognitive skills required in your course
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={80}
                tickLine={false}
              />
              <ChartTooltip
                content={(props) => {
                  if (!props.active || !props.payload || !props.payload.length) {
                    return null;
                  }
                  
                  const { name, value } = props.payload[0].payload;
                  return (
                    <div className="bg-white p-2 border shadow-md rounded-md">
                      <p className="font-medium">{name}</p>
                      <p className="text-sm">{value}% of course content</p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="value" minPointSize={2}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-slate-600">
          <p>
            Bloom's Taxonomy classifies learning objectives into six levels of cognitive complexity.
            A well-designed course should have a balanced distribution across these levels, 
            with appropriate emphasis based on the course level and goals.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="bg-slate-100 text-slate-600">Lower-order thinking</Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">Higher-order thinking</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BloomsTaxonomyChart;
