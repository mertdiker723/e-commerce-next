"use client";

import { usePathname } from "next/navigation";

// Components
import AuthLayout from "@/user/components/Auth/AuthLayout";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  return <AuthLayout pathname={pathname}>{children}</AuthLayout>;
};

export default Layout;
