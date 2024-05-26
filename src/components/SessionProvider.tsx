"use client";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const router = useRouter();

  React.useEffect(() => {
    async function init() {
      const session = await getSession();

      if (!session?.user) {
        router.push("/auth/login");
      }
    }

    init();
  }, []);
  return <>{children}</>;
};

export default SessionProvider;
