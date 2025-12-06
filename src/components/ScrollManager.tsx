import { useScrollToHash } from "@/hooks/useScrollToHash";
import { ScrollRestoration } from "react-router";

export function ScrollManager() {
  useScrollToHash();
  return <ScrollRestoration />;
}
