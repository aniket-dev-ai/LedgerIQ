"use client";

import { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";

const UserContext = createContext<User | null>(null);

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
