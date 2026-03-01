import { AppLayout } from "@/components/layout/app-layout";
import { useAnalytics } from "@/hooks/use-birdvision";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockAccuracy = [
  { date: 'Mon', accuracy: 88 },
  { date: 'Tue', accuracy: 90 },
  { date: 'Wed', accuracy: 89 },
  { date: 'Thu', accuracy: 93 },
  { date: 'Fri', accuracy: 95 },
  { date: 'Sat', accuracy: 94 },
  { date: 'Sun', accuracy: 96 },
];

const mockSpecies = [
  { name: 'Peacock', count: 120 },
  { name: 'Junglefowl', count: 85 },
  { name: 'Kingfisher', count: 65 },
  { name: 'Hornbill', count: 45 },
  { name: 'Parrot', count: 30 },
];

export default function Analytics() {
  // Using mock data for immediate visual impact, would use real data:
  // const { data } = useAnalytics();

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-2 text-lg">System performance and historical detection data.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Accuracy Chart */}
          <div className="glass-card rounded-[24px] p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Model Accuracy Trend</h2>
              <p className="text-muted-foreground text-sm">Average confidence score over the last 7 days</p>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAccuracy}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                  <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: 'hsl(var(--accent))', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={4}
                    dot={{ fill: 'hsl(var(--background))', stroke: 'hsl(var(--accent))', strokeWidth: 3, r: 6 }}
                    activeDot={{ r: 8, strokeWidth: 0, fill: 'hsl(var(--accent))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Species Chart */}
          <div className="glass-card rounded-[24px] p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Top Detected Species</h2>
              <p className="text-muted-foreground text-sm">Most frequent classifications this month</p>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSpecies} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--foreground))', fontWeight: 600, fontSize: 13 }} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
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
