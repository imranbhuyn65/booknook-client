"use client";
import { useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [session, isPending, router, pathname]);

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return session ? children : null;
}
