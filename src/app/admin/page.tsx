"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ArogyaIcon } from "@/components/ArogyaIcon";
import { Trash2, LogOut, Users, MessageSquare, Shield } from "lucide-react";

const ADMIN_EMAIL = "admin@vaidyaai.com";

type User = {
  uid: string;
  email: string;
  createdAt: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth");
        return;
      }
      if (user.email !== ADMIN_EMAIL) {
        router.push("/");
        return;
      }
      setIsAdmin(true);
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{background: "linear-gradient(135deg, #f0f7e6 0%, #e8f4f0 50%, #f5f0e8 100%)"}}>
        <div className="text-center">
          <ArogyaIcon className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen" style={{background: "linear-gradient(135deg, #f0f7e6 0%, #e8f4f0 50%, #f5f0e8 100%)"}}>
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-primary/20"
        style={{background: "linear-gradient(90deg, #1d9e75 0%, #174f3e 100%)"}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl p-1.5">
              <ArogyaIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">VaidyaAI Admin</h1>
              <p className="text-white/70 text-xs">Admin Control Panel</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-primary/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-xl p-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">7</p>
                <p className="text-sm text-foreground/60">Health Topics</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-primary/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-accent/10 rounded-xl p-2">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-foreground/60">Languages</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-primary/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-xl p-2">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Active</p>
                <p className="text-sm text-foreground/60">System Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Alerts Management */}
        <div className="bg-white rounded-2xl border border-primary/20 shadow-sm p-5 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Public Health Alerts</h2>
          <div className="space-y-3">
            {[
              { title: "Heatwave Warning", message: "High temperatures expected. Stay hydrated.", status: "Active" },
              { title: "Vaccination Drive", message: "Free flu shots available at local health centers.", status: "Active" },
              { title: "Monsoon Health Tips", message: "Beware of water-borne diseases. Drink boiled water.", status: "Active" },
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-primary/10 bg-primary/5">
                <div>
                  <p className="text-sm font-bold text-foreground">{alert.title}</p>
                  <p className="text-xs text-foreground/60">{alert.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">{alert.status}</span>
                  <button className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disease Topics */}
        <div className="bg-white rounded-2xl border border-primary/20 shadow-sm p-5">
          <h2 className="text-lg font-bold text-foreground mb-4">Disease Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Dengue Fever", "Malaria", "Diabetes", "Typhoid", "Tuberculosis", "Cholera", "COVID-19"].map((disease, i) => (
              <div key={i} className="p-3 rounded-xl border border-primary/10 bg-primary/5 text-center">
                <p className="text-sm font-semibold text-primary">{disease}</p>
                <p className="text-xs text-foreground/50 mt-1">Active</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}