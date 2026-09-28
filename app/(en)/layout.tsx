import type React from "react";
import { RootShell, buildMetadata } from "../shell";

export { viewport } from "../shell";
export const metadata = buildMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
