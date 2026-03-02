import { useDetections, useStats } from "@/hooks/use-birdvision";
import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/ui/stat-card";
import { Bird, CheckCircle2, Camera, Image as ImageIcon, Video as VideoIcon, ScanEye } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "./LanguageContext";

type LangMode = "english" | "sinhala" | "both";

type Stats = {
  totalDetections?: number;
  speciesIdentified?: number;
  averageConfidence?: number;
  mostDetectedBird?: string;
};

type Detection = {
  id: string;
  englishName?: string;
  sinhalaName?: string;
  confidence?: number;
  imageUrl?: string;
  createdAt?: string;
};

type SpeciesInfo = {
  habitat_en: string;
  diet_en: string;
  habitat_si: string;
  diet_si: string;
  sinhalaName: string;
};

export default function Dashboard() {
  const { language } = useLanguage() as { language: LangMode };

  // ✅ Text dictionary (3 modes)
  const t = {
    english: {
      dashboardTitle: "Dashboard",
      dashboardSubtitle: "Real-time bird species monitoring and identification system.",
      stats: {
        totalDetections: "Total Detections",
        speciesIdentified: "Species Identified",
        avgConfidence: "Avg. Confidence",
        mostDetected: "Most Detected",
      },
      recentDetections: "Recent Detections",
      image: "Image",
      video: "Video",
      confidence: "Confidence",
      habitat: "Habitat",
      diet: "Diet",
      justNow: "Just now",
      defaultBirdEN: "Black-hooded Oriole",
      defaultBirdSI: "කහ කුරුල්ලා",
      defaultHabitatEN: "Forests, Gardens",
      defaultDietEN: "Fruits, Nectar, Insects",
      defaultHabitatSI: "වනාන්තර, ගෙවතු",
      defaultDietSI: "පලතුරු, මධු, කෘමි",
      notRecognizedEN: "Not Recognized",
      notRecognizedSI: "අදාල පක්ෂියක් නොහඳුනන ලදි",
    },
    sinhala: {
      dashboardTitle: "උපකරණ පුවරුව",
      dashboardSubtitle: "සජීවී පක්ෂි ජාති නිරීක්ෂණ සහ හඳුනාගැනීමේ පද්ධතිය.",
      stats: {
        totalDetections: "සම්පූර්ණ අනාවරණ",
        speciesIdentified: "හැඳින්වූ ජාති",
        avgConfidence: "සරසාමාන්‍ය විශ්වාසය",
        mostDetected: "වැඩිපුර අනාවරණය වූ",
      },
      recentDetections: "සමීපතම අනාවරණ",
      image: "රූපය",
      video: "වීඩියෝව",
      confidence: "විශ්වාසය",
      habitat: "වාසස්ථානය",
      diet: "ආහාර",
      justNow: "දැන්ම",
      defaultBirdEN: "Black-hooded Oriole",
      defaultBirdSI: "කහ කුරුල්ලා",
      defaultHabitatEN: "Forests, Gardens",
      defaultDietEN: "Fruits, Nectar, Insects",
      defaultHabitatSI: "වනාන්තර, ගෙවතු",
      defaultDietSI: "පලතුරු, මධු, කෘමි",
      notRecognizedEN: "Not Recognized",
      notRecognizedSI: "අදාල පක්ෂියක් නොහඳුනන ලදි",
    },
    both: {
      dashboardTitle: "Dashboard / උපකරණ පුවරුව",
      dashboardSubtitle: "Real-time bird identification with bilingual output (EN/SI).",
      stats: {
        totalDetections: "Total Detections / සම්පූර්ණ අනාවරණ",
        speciesIdentified: "Species Identified / හැඳින්වූ ජාති",
        avgConfidence: "Avg. Confidence / සරසාමාන්‍ය විශ්වාසය",
        mostDetected: "Most Detected / වැඩිපුර අනාවරණය වූ",
      },
      recentDetections: "Recent Detections / සමීපතම අනාවරණ",
      image: "Image",
      video: "Video",
      confidence: "Confidence",
      habitat: "Habitat / වාසස්ථානය",
      diet: "Diet / ආහාර",
      justNow: "Just now",
      defaultBirdEN: "Black-hooded Oriole",
      defaultBirdSI: "කහ කුරුල්ලා",
      defaultHabitatEN: "Forests, Gardens",
      defaultDietEN: "Fruits, Nectar, Insects",
      defaultHabitatSI: "වනාන්තර, ගෙවතු",
      defaultDietSI: "පලතුරු, මධු, කෘමි",
      notRecognizedEN: "Not Recognized",
      notRecognizedSI: "අදාල පක්ෂියක් නොහඳුනන ලදි",
    },
  }[language];

  const { data: statsRaw, isLoading: statsLoading } = useStats();
  const { data: detectionsRaw, isLoading: detectionsLoading } = useDetections();

  const stats = statsRaw as Stats | undefined;
  const detections = (detectionsRaw as Detection[] | undefined) ?? [];

  // ✅ Species info map (expand as you add more)
  const speciesInfo: Record<string, SpeciesInfo> = {
    "Black-hooded Oriole": {
      habitat_en: t.defaultHabitatEN,
      diet_en: t.defaultDietEN,
      habitat_si: t.defaultHabitatSI,
      diet_si: t.defaultDietSI,
      sinhalaName: t.defaultBirdSI,
    },
    "Indian Peafowl": {
      habitat_en: "Forests, Villages",
      diet_en: "Seeds, Fruits, Insects",
      habitat_si: "වනාන්තර, ගම්මාන ආසන්න",
      diet_si: "බීජ, පළතුරු, කෘමි",
      sinhalaName: "මොණරා",
    },
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-500";
    if (confidence >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const fallbackDetections: Detection[] = [
    {
      id: "mock1",
      englishName: t.defaultBirdEN,
      sinhalaName: t.defaultBirdSI,
      confidence: 96,
      imageUrl: "",
      createdAt: new Date().toISOString(),
    },
  ];

  const listToRender =
    detections.length > 0 ? detections.slice(0, 5) : fallbackDetections;

  const renderName = (en: string, si: string) => {
    if (language === "english") return en;
    if (language === "sinhala") return si;
    return en; // main line EN for "both"
  };

  const renderSecondLine = (en: string, si: string) => {
    if (language === "both") return si; // show Sinhala as second line
    return null;
  };

  const renderHabitatDiet = (info: SpeciesInfo) => {
    if (language === "english") return { habitat: info.habitat_en, diet: info.diet_en };
    if (language === "sinhala") return { habitat: info.habitat_si, diet: info.diet_si };
    // both
    return {
      habitat: `${info.habitat_en} / ${info.habitat_si}`,
      diet: `${info.diet_en} / ${info.diet_si}`,
    };
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground">
            {t.dashboardTitle}
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            {t.dashboardSubtitle}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <StatCard
            title={t.stats.totalDetections}
            value={statsLoading ? "..." : String(stats?.totalDetections ?? 1284)}
            icon={Camera}
          />
          <StatCard
            title={t.stats.speciesIdentified}
            value={statsLoading ? "..." : String(stats?.speciesIdentified ?? 42)}
            icon={ScanEye}
          />
          <StatCard
            title={t.stats.avgConfidence}
            value={statsLoading ? "..." : `${Math.round(stats?.averageConfidence ?? 94)}%`}
            icon={CheckCircle2}
          />
          <StatCard
            title={t.stats.mostDetected}
            value={statsLoading ? "..." : (stats?.mostDetectedBird ?? t.defaultBirdEN)}
            icon={Bird}
          />
        </div>

        {/* Recent Detections */}
        <div className="glass-card rounded-[24px] overflow-hidden mt-8">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-2xl font-display font-bold">{t.recentDetections}</h2>
          </div>

          <div className="divide-y divide-border/50">
            {detectionsLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-6 animate-pulse">
                    <div className="h-16 bg-muted rounded" />
                  </div>
                ))
              : listToRender.map((detection) => {
                  const enRaw = (detection.englishName ?? t.defaultBirdEN).trim();
                  const conf = Number(detection.confidence ?? 0);

                  const info =
                    speciesInfo[enRaw] ??
                    ({
                      habitat_en: t.defaultHabitatEN,
                      diet_en: t.defaultDietEN,
                      habitat_si: t.defaultHabitatSI,
                      diet_si: t.defaultDietSI,
                      sinhalaName: detection.sinhalaName ?? t.defaultBirdSI,
                    } as SpeciesInfo);

                  const siName = info.sinhalaName ?? detection.sinhalaName ?? t.defaultBirdSI;

                  const names = {
                    main: renderName(enRaw, siName),
                    second: renderSecondLine(enRaw, siName),
                  };

                  const hd = renderHabitatDiet(info);

                  return (
                    <div
                      key={detection.id}
                      className="p-6 flex items-start gap-4 hover:bg-muted/20 transition-colors cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-border bg-muted shadow-sm">
                        {detection.imageUrl ? (
                          <img
                            src={detection.imageUrl}
                            alt="bird"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                            <Bird size={20} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{names.main}</h3>
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${getConfidenceColor(conf)}`}
                          />
                        </div>

                        {names.second && (
                          <p className="text-primary font-medium text-sm">{names.second}</p>
                        )}

                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{t.habitat}:</span>{" "}
                          {hd.habitat}{" "}
                          <span className="text-muted-foreground/60">|</span>{" "}
                          <span className="font-medium text-foreground">{t.diet}:</span>{" "}
                          {hd.diet}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                          <span>
                            {detection.createdAt
                              ? format(new Date(detection.createdAt), "MMM d, h:mm a")
                              : t.justNow}
                          </span>

                          <span className="flex items-center gap-1">
                            {detection.imageUrl ? (
                              <>
                                <ImageIcon size={14} /> {t.image}
                              </>
                            ) : (
                              <>
                                <VideoIcon size={14} /> {t.video}
                              </>
                            )}
                          </span>

                          <span className="font-semibold">
                            {Math.round(conf)}% {t.confidence}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}