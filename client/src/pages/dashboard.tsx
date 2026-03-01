import { useDetections, useStats } from "@/hooks/use-birdvision";
import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Bird, CheckCircle2, Activity, Clock } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: detections, isLoading: detectionsLoading } = useDetections();

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Overview of your recent bird detections and system performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Detections" 
            value={statsLoading ? "..." : stats?.totalDetections || "1,284"} 
            icon={Activity} 
            description="+12% from last week"
            trend="up"
          />
          <StatCard 
            title="Species Identified" 
            value={statsLoading ? "..." : stats?.speciesIdentified || "42"} 
            icon={Bird} 
            description="3 new this month"
            trend="up"
          />
          <StatCard 
            title="Avg. Confidence" 
            value={statsLoading ? "..." : `${stats?.averageConfidence || 94}%`} 
            icon={CheckCircle2} 
            description="Highly accurate"
            trend="neutral"
          />
          <StatCard 
            title="Most Detected" 
            value={statsLoading ? "..." : stats?.mostDetectedBird || "Peacock"} 
            icon={Clock} 
          />
        </div>

        <div className="glass-card rounded-[24px] overflow-hidden mt-8">
          <div className="p-6 border-b border-border/50 flex justify-between items-center">
            <h2 className="text-2xl font-display font-bold">Recent Detections</h2>
            <button className="text-sm font-semibold text-primary hover:text-accent transition-colors">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Bird Species (En / Si)</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Confidence</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Time</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Media</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {detectionsLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-5"><div className="h-4 bg-muted rounded w-32 animate-pulse"></div></td>
                      <td className="px-6 py-5"><div className="h-4 bg-muted rounded w-16 animate-pulse"></div></td>
                      <td className="px-6 py-5"><div className="h-4 bg-muted rounded w-24 animate-pulse"></div></td>
                      <td className="px-6 py-5"><div className="h-8 w-12 bg-muted rounded animate-pulse"></div></td>
                    </tr>
                  ))
                ) : detections?.slice(0, 5).map((detection) => (
                  <tr key={detection.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-semibold text-foreground">{detection.englishName}</div>
                      <div className="text-sm text-primary font-medium">{detection.sinhalaName}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full" 
                            style={{ width: `${detection.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold">{detection.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-muted-foreground text-sm">
                      {detection.createdAt ? format(new Date(detection.createdAt), 'MMM d, h:mm a') : 'Just now'}
                    </td>
                    <td className="px-6 py-5">
                      {detection.imageUrl ? (
                        <div className="w-12 h-8 rounded border border-border overflow-hidden bg-muted">
                          <img src={detection.imageUrl} alt="bird" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground font-medium">Video</span>
                      )}
                    </td>
                  </tr>
                ))}
                
                {/* Fallback mock data if API is empty */}
                {(!detections || detections.length === 0) && !detectionsLoading && (
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-semibold text-foreground">Indian Peafowl</div>
                      <div className="text-sm text-primary font-medium">මොණරා (Monara)</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: '98%' }} />
                        </div>
                        <span className="text-sm font-bold">98%</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-muted-foreground text-sm">Today, 10:42 AM</td>
                    <td className="px-6 py-5">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">Image</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
