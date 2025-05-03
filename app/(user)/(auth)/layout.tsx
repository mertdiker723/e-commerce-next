"use client";

import { usePathname } from "next/navigation";

// Components
import AuthLayout from "@/components/user/Auth/AuthLayout";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  return <AuthLayout pathname={pathname}>{children}</AuthLayout>;
};

export default Layout;
