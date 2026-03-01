import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Check, Globe2, Bell, Database, Shield } from "lucide-react";

export default function Settings() {
  const [language, setLanguage] = useState<'english' | 'sinhala' | 'both'>('both');

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2 text-lg">Configure your system preferences.</p>
        </div>

        <div className="glass-card rounded-[32px] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Settings Sidebar */}
            <div className="border-r border-border/50 bg-muted/10 p-6 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-primary font-bold shadow-sm">
                <Globe2 className="w-5 h-5" /> Language
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/50 font-medium transition-colors">
                <Bell className="w-5 h-5" /> Notifications
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/50 font-medium transition-colors">
                <Database className="w-5 h-5" /> Data Storage
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/50 font-medium transition-colors">
                <Shield className="w-5 h-5" /> Privacy
              </button>
            </div>

            {/* Settings Content */}
            <div className="col-span-3 p-8 lg:p-12">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-6">Display Language</h2>
                
                <div className="space-y-4">
                  {[
                    { id: 'english', label: 'English Only', desc: 'Display all UI and results in English.' },
                    { id: 'sinhala', label: 'Sinhala Only (සිංහල)', desc: 'Display all UI and results in Sinhala.' },
                    { id: 'both', label: 'Bilingual (Recommended)', desc: 'Display English with prominent Sinhala translations.' }
                  ].map((option) => (
                    <div 
                      key={option.id}
                      onClick={() => setLanguage(option.id as any)}
                      className={`
                        relative flex items-center p-5 rounded-2xl cursor-pointer border-2 transition-all duration-200
                        ${language === option.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-transparent bg-muted/30 hover:bg-muted/50'
                        }
                      `}
                    >
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${language === option.id ? 'text-primary' : 'text-foreground'}`}>
                          {option.label}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">{option.desc}</p>
                      </div>
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${language === option.id ? 'border-primary bg-primary' : 'border-muted-foreground/30'}
                      `}>
                        {language === option.id && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <button className="px-8 py-3 bg-foreground text-white rounded-xl font-bold hover:bg-foreground/90 transition-colors shadow-lg shadow-black/10">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
