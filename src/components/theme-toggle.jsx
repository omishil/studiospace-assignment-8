"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-pink-200 bg-white text-pink-600 transition hover:bg-pink-50 dark:border-pink-900/60 dark:bg-transparent dark:text-pink-300 dark:hover:bg-pink-950/50"
    >
      <SunIcon className="hidden size-4 dark:block" />
      <MoonIcon className="size-4 dark:hidden" />
    </button>
  );
}
