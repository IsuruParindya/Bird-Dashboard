import { AppLayout } from "@/components/layout/app-layout";
import {
  BadgeAlert,
  MapPin,
  Drumstick,
  Bird,
  ShieldCheck,
  Sparkles,
  Leaf,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

type LangMode = "english" | "sinhala" | "both";

const rareBird = {
  englishName: "Sri Lanka Blue Magpie",
  sinhalaName: "කැහිබෙල්ලා",
  scientificName: "Urocissa ornata",
  eatsEnglish: "Insects, small fruits, seeds, and small animals",
  eatsSinhala: "කෘමීන්, කුඩා පළතුරු, ගෙඩි සහ කුඩා සත්ත්වයන්",
  locationEnglish: "Wet zone forests such as Sinharaja and nearby forest reserves",
  locationSinhala: "සිංහරාජය වැනි තෙත් කලාප වනාන්තර හා ආසන්න ආරක්ෂිත වනාන්තර ප්‍රදේශ",
  rarityEnglish: "Rare / Endemic Species",
  raritySinhala: "දුර්ලභ / ශ්‍රී ලංකාවට ස්වදේශික විශේෂය",
  descriptionEnglish:
    "A colorful endemic bird found only in Sri Lanka. It is known for its striking blue plumage and its importance to biodiversity conservation.",
  descriptionSinhala:
    "ශ්‍රී ලංකාවේ පමණක් හමුවන වර්ණවත් ස්වදේශික කුරුල්ලෙකි. එහි නීල වර්ණ පියාපත් සහ ජෛව විවිධත්ව සංරක්ෂණයේ වැදගත්කම නිසා විශේෂ අවධානයට ලක්වේ.",
  lastDetectedEnglish: "Last detected 2 hours ago",
  lastDetectedSinhala: "අවසන් වරට හඳුනාගත්තේ පැය 2කට පෙර",
};

export default function BirdInsights() {
  const { language } = useLanguage() as { language: LangMode };

  const t = {
    english: {
      title: "Bird Insights",
      subtitle:
        "Explore rare and important bird species identified through BirdVision.",
      badge: "Rare Bird Spotlight",
      panelTitle: "Species Profile",
      panelDesc: "A highlighted rare species recognized by the system.",
      englishName: "English Name",
      sinhalaName: "Sinhala Name",
      food: "Usually Eats",
      whereFound: "Where You Can See Them",
      rarity: "Conservation Status",
      about: "About This Bird",
      imageTitle: "Featured Species",
      imageDesc: "Rare bird highlight",
      lastDetected: rareBird.lastDetectedEnglish,
    },
    sinhala: {
      title: "කුරුළු අවබෝධය",
      subtitle:
        "BirdVision මඟින් හඳුනාගත් දුර්ලභ සහ වැදගත් කුරුළු විශේෂ සොයා බලන්න.",
      badge: "දුර්ලභ කුරුළු අවධානය",
      panelTitle: "විශේෂ පැතිකඩ",
      panelDesc: "පද්ධතිය මඟින් හඳුනාගත් දුර්ලභ විශේෂයකි.",
      englishName: "ඉංග්‍රීසි නම",
      sinhalaName: "සිංහල නම",
      food: "සාමාන්‍යයෙන් ආහාරයට ගන්නා දේ",
      whereFound: "දැකගත හැකි ස්ථාන",
      rarity: "සංරක්ෂණ තත්ත්වය",
      about: "මෙම කුරුල්ලා පිළිබඳ",
      imageTitle: "විශේෂිත කුරුළු විශේෂය",
      imageDesc: "දුර්ලභ කුරුළු අවධානය",
      lastDetected: rareBird.lastDetectedSinhala,
    },
    both: {
      title: "Bird Insights / කුරුළු අවබෝධය",
      subtitle:
        "Explore rare and important bird species identified through BirdVision / BirdVision මඟින් හඳුනාගත් දුර්ලභ සහ වැදගත් කුරුළු විශේෂ සොයා බලන්න.",
      badge: "Rare Bird Spotlight / දුර්ලභ කුරුළු අවධානය",
      panelTitle: "Species Profile / විශේෂ පැතිකඩ",
      panelDesc:
        "A highlighted rare species recognized by the system / පද්ධතිය මඟින් හඳුනාගත් දුර්ලභ විශේෂයකි.",
      englishName: "English Name / ඉංග්‍රීසි නම",
      sinhalaName: "Sinhala Name / සිංහල නම",
      food: "Usually Eats / ආහාර",
      whereFound: "Where You Can See Them / දැකගත හැකි ස්ථාන",
      rarity: "Conservation Status / සංරක්ෂණ තත්ත්වය",
      about: "About This Bird / මෙම කුරුල්ලා පිළිබඳ",
      imageTitle: "Featured Species / විශේෂිත කුරුළු විශේෂය",
      imageDesc: "Rare bird highlight / දුර්ලභ කුරුළු අවධානය",
      lastDetected: `${rareBird.lastDetectedEnglish} / ${rareBird.lastDetectedSinhala}`,
    },
  }[language || "english"];

  const getDescription = () => {
    if (language === "sinhala") return rareBird.descriptionSinhala;
    if (language === "both") {
      return `${rareBird.descriptionEnglish} / ${rareBird.descriptionSinhala}`;
    }
    return rareBird.descriptionEnglish;
  };

  const getFood = () => {
    if (language === "sinhala") return rareBird.eatsSinhala;
    if (language === "both") {
      return `${rareBird.eatsEnglish} / ${rareBird.eatsSinhala}`;
    }
    return rareBird.eatsEnglish;
  };

  const getLocation = () => {
    if (language === "sinhala") return rareBird.locationSinhala;
    if (language === "both") {
      return `${rareBird.locationEnglish} / ${rareBird.locationSinhala}`;
    }
    return rareBird.locationEnglish;
  };

  const getRarity = () => {
    if (language === "sinhala") return rareBird.raritySinhala;
    if (language === "both") {
      return `${rareBird.rarityEnglish} / ${rareBird.raritySinhala}`;
    }
    return rareBird.rarityEnglish;
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-[28px] border border-border/50 bg-gradient-to-br from-emerald-500/10 via-background to-cyan-500/10 p-8 lg:p-10">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles size={16} />
              {t.badge}
            </div>

            <h1 className="mt-5 text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
              {t.title}
            </h1>

            <p className="mt-3 text-lg text-muted-foreground leading-8">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 space-y-8">
            <div className="glass-card rounded-[28px] p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center">
                <div className="relative mx-auto md:mx-0">
                  <div className="h-56 w-56 rounded-[28px] bg-gradient-to-br from-emerald-500/20 via-background to-cyan-500/20 border border-border/50 flex items-center justify-center overflow-hidden shadow-xl">
                    <img
                      src="/blue-magpie.jpg"
                      alt={rareBird.englishName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-[10px] bg-white/90 border border-slate-200 px-5 py-2 text-xs font-medium text-status-busy shadow-md min-w-[140px] whitespace-nowrap">
                    <BadgeAlert size={13} className="shrink-0" />
                    <span>{t.imageDesc}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                    {rareBird.englishName}
                  </h2>

                  <p className="mt-2 text-lg text-muted-foreground font-medium">
                    {rareBird.sinhalaName}
                  </p>

                  <p className="mt-2 text-sm italic text-muted-foreground">
                    {rareBird.scientificName}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-600 px-4 py-2 text-sm font-semibold">
                      <ShieldCheck size={16} />
                      {getRarity()}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-semibold">
                      <Bird size={16} />
                      {t.lastDetected}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-[28px] p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Leaf size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{t.about}</h3>
                  <p className="text-sm text-muted-foreground">
                    {rareBird.englishName}
                  </p>
                </div>
              </div>

              <p className="text-base lg:text-lg leading-8 text-muted-foreground">
                {getDescription()}
              </p>
            </div>
          </div>

          <div className="xl:col-span-2">
            <div className="glass-card rounded-[28px] p-5 lg:p-7 h-full">
              <div className="flex items-center gap-3 pb-5 border-b border-border/50">
                <div className="h-12 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Bird size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{t.panelTitle}</h3>
                  <p className="text-sm text-muted-foreground">{t.panelDesc}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <InfoCard title={t.englishName} value={rareBird.englishName} />

                <InfoCard title={t.sinhalaName} value={rareBird.sinhalaName} />

                <InfoCard
                  title={t.food}
                  value={getFood()}
                  icon={<Drumstick size={18} className="text-primary" />}
                />

                <InfoCard
                  title={t.whereFound}
                  value={getLocation()}
                  icon={<MapPin size={18} className="text-primary" />}
                />

                <InfoCard
                  title={t.rarity}
                  value={getRarity()}
                  icon={<ShieldCheck size={18} className="text-emerald-600" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

type InfoCardProps = {
  title: string;
  value: string;
  icon?: React.ReactNode;
  italic?: boolean;
};

function InfoCard({ title, value, icon, italic = false }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-border/50 bg-background/50 p-4 lg:p-5 transition-all hover:border-primary/30 hover:shadow-md">
      <div className="flex gap-3">
        {icon ? <div className="mt-1 shrink-0">{icon}</div> : null}
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
            {title}
          </p>
          <p
            className={`text-base font-semibold text-foreground leading-7 ${
              italic ? "italic" : ""
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}