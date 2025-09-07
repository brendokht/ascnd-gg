"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@ascnd-gg/ui/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ICON_SIZE = 16;

export const ThemeToggleRadioItems = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenuRadioItem className="flex gap-2" value={value}>
      {children}
    </DropdownMenuRadioItem>
  );
};

export const ThemeToggleSub = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="gap-2">
        Theme
        {theme === "light" ? (
          <Sun
            key="light"
            size={ICON_SIZE}
            className={"text-muted-foreground"}
          />
        ) : theme === "dark" ? (
          <Moon
            key="dark"
            size={ICON_SIZE}
            className={"text-muted-foreground"}
          />
        ) : (
          <Laptop
            key="system"
            size={ICON_SIZE}
            className={"text-muted-foreground"}
          />
        )}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(e) => setTheme(e)}
          >
            <ThemeToggleRadioItems value="light">
              <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "}
              <span>Light</span>
            </ThemeToggleRadioItems>
            <ThemeToggleRadioItems value="dark">
              <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
              <span>Dark</span>
            </ThemeToggleRadioItems>
            <ThemeToggleRadioItems value="system">
              <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
              <span>System</span>
            </ThemeToggleRadioItems>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <ThemeToggleRadioItems value="light">
            <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Light</span>
          </ThemeToggleRadioItems>
          <ThemeToggleRadioItems value="dark">
            <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Dark</span>
          </ThemeToggleRadioItems>
          <ThemeToggleRadioItems value="system">
            <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>System</span>
          </ThemeToggleRadioItems>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
