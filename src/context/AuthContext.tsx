import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { User, Session } from "@supabase/supabase-js";

import type { Member } from "@/types/member";
import type { Campus } from "@/types/campus";
import type { Country } from "@/types/country";

import { supabase } from "@/supabaseClient";
import { getMemberByUserId } from "@/services/member";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { getMemberCampusesByMemberId } from "@/services/memberCampus";
import { fetchCampuses } from "@/services/campus";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  member: Member | null;
  isAuthenticated: boolean;

  campuses: Campus[];
  campusIds: string[];

  countries: Country[];

  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [member, setMember] = useState<Member | null>(null);

  const [campuses, setCampuses] = useState<any[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [memberCampusIds, setMemberCampusIds] = useState<any[]>([]);

  /* =========================
     Auth session
  ========================= */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* =========================
     Load member & campuses
  ========================= */
  const loadMember = useCallback(async () => {
    if (!user) {
      setMember(null);
      setCampuses([]);
      setCountries([]);
      return;
    }

    const member = await getMemberByUserId(user.id);
    setMember(member ?? null);

    
    const member_campuses = await getMemberCampusesByMemberId(member.id)
    setMemberCampusIds(member_campuses.map(o=> o.campus_id))
    const memberCampuses = await fetchCampuses({ids:memberCampusIds})
    setCampuses(memberCampuses);
    const uniqueCountries = Array.from(
      new Map(
        memberCampuses
          .map((c) => c.country)
          .filter((c): c is Country => !!c)
          .map((c) => [c.id, c])
      ).values()
    );

    setCountries(uniqueCountries);
  }, [user]);

  useEffect(() => {
    loadMember();
  }, [loadMember]);

  /* =========================
     ✅ Realtime (CORRECT)
  ========================= */
  useSupabaseRealtime({
    table: "member_campuses",
    events: "*",    
    onChange: loadMember,
  });

  const campusIds = memberCampusIds;
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setMember(null);
    setCampuses([]);
    setCountries([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        member,
        isAuthenticated: !!user,
        campuses,
        campusIds,
        countries,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  return context;
}
