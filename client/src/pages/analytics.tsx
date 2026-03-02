import { AppLayout } from "@/components/layout/app-layout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useLanguage } from "./LanguageContext";

type LangMode = "english" | "sinhala" | "both";

const mockAccuracy = [
  { date: "Mon", accuracy: 88 },
  { date: "Tue", accuracy: 90 },
  { date: "Wed", accuracy: 89 },
  { date: "Thu", accuracy: 93 },
  { date: "Fri", accuracy: 95 },
  { date: "Sat", accuracy: 94 },
  { date: "Sun", accuracy: 96 },
];

const mockSpecies = [
  { name: "Peacock", count: 120 },
  { name: "Junglefowl", count: 85 },
  { name: "Kingfisher", count: 65 },
  { name: "Hornbill", count: 45 },
  { name: "Parrot", count: 30 },
];

export default function Analytics() {
  const { language } = useLanguage() as { language: LangMode };

  const t = {
    english: {
      title: "Analytics",
      subtitle: "System performance and historical detection data.",
      accuracyTitle: "Model Accuracy Trend",
      accuracyDesc: "Average confidence score over the last 7 days",
      speciesTitle: "Top Detected Species",
      speciesDesc: "Most frequent classifications this month",
      // optional: axis label terms if you ever add them
      confidence: "Accuracy",
      count: "Count",
    },
    sinhala: {
      title: "විශ්ලේෂණ",
      subtitle: "පද්ධති කාර්යක්ෂමතාව සහ ඉතිහාසමය අනාවරණ දත්ත.",
      accuracyTitle: "මොඩල නිවැරදිත්ව ප්‍රවණතාව",
      accuracyDesc: "පසුගිය දින 7 තුළ සාමාන්‍ය විශ්වාස ලකුණු",
      speciesTitle: "වැඩිපුර අනාවරණ වූ ජාති",
      speciesDesc: "මෙම මාසයේ වැඩිපුරම වාර්තා වූ වර්ගීකරණ",
      confidence: "නිවැරදිත්වය",
      count: "ගණන",
    },
    both: {
      title: "Analytics / විශ්ලේෂණ",
      subtitle: "System performance and detection history (EN/SI).",
      accuracyTitle: "Model Accuracy Trend / නිවැරදිත්ව ප්‍රවණතාව",
      accuracyDesc: "Average confidence over 7 days / දින 7ක සාමාන්‍ය විශ්වාසය",
      speciesTitle: "Top Detected Species / වැඩිපුර අනාවරණ වූ ජාති",
      speciesDesc: "Most frequent this month / මෙම මාසයේ වැඩිපුරම",
      confidence: "Accuracy / නිවැරදිත්වය",
      count: "Count / ගණන",
    },
  }[language];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-2 text-lg">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Accuracy Chart */}
          <div className="glass-card rounded-[24px] p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{t.accuracyTitle}</h2>
              <p className="text-muted-foreground text-sm">{t.accuracyDesc}</p>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAccuracy}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    domain={[80, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value: any) => [`${value}%`, t.confidence]}
                    itemStyle={{ color: "hsl(var(--accent))", fontWeight: "bold" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="hsl(var(--accent))"
                    strokeWidth={4}
                    dot={{
                      fill: "hsl(var(--background))",
                      stroke: "hsl(var(--accent))",
                      strokeWidth: 3,
                      r: 6,
                    }}
                    activeDot={{ r: 8, strokeWidth: 0, fill: "hsl(var(--accent))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Species Chart */}
          <div className="glass-card rounded-[24px] p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{t.speciesTitle}</h2>
              <p className="text-muted-foreground text-sm">{t.speciesDesc}</p>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSpecies} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "hsl(var(--foreground))",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value: any) => [value, t.count]}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[0, 8, 8, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}