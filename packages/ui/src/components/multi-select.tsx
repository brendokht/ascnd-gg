"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@ascnd-gg/ui/lib/utils";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { Badge } from "@ascnd-gg/ui/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@ascnd-gg/ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ascnd-gg/ui/components/ui/popover";

export type Option = {
  label: string;
  value: string;
  category?: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: Option[];
  onValueChange: (options: Option[]) => void;
  placeholder?: string;
  maxCount?: number;
}

export function MultiSelect({
  options,
  selected,
  onValueChange,
  placeholder = "Select items...",
  maxCount = 3,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (option: Option) => {
    onValueChange(selected.filter((item) => item.value !== option.value));
  };

  const handleSelectAll = () => {
    onValueChange(options);
  };

  const handleDeselectAll = () => {
    onValueChange([]);
  };

  const groupedOptions = options.reduce(
    (acc, option) => {
      const category = option.category || "";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(option);
      return acc;
    },
    {} as Record<string, Option[]>,
  );

  const displayedBadges = maxCount ? selected.slice(0, maxCount) : selected;
  const overflowCount =
    maxCount && selected.length > maxCount ? selected.length - maxCount : 0;

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="hover:bg-background w-full justify-between bg-transparent"
        >
          <div className="flex max-h-10 flex-wrap items-center gap-1 overflow-hidden">
            {selected.length > 0 ? (
              <>
                {displayedBadges.map((option) => (
                  <Badge
                    key={option.value}
                    variant="secondary"
                    className="animate-in fade-in zoom-in-95 mr-1 mb-0 flex items-center gap-1 transition-all duration-200 hover:opacity-90 hover:shadow-md"
                  >
                    <span className="max-w-16 truncate">{option.label}</span>
                    <div
                      className="ring-offset-background focus:ring-ring group ml-1 shrink-0 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(option);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(option)}
                    >
                      <X className="text-muted-foreground group-hover:text-foreground h-3 w-3 transition-all duration-200 group-hover:scale-110" />
                    </div>
                  </Badge>
                ))}
                {overflowCount > 0 && (
                  <Badge variant="outline" className="mr-1 mb-0">
                    +{overflowCount} more
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) max-w-lg p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            className="truncate px-2 py-1.5"
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {selected.length === options.length ? (
                <CommandItem onSelect={handleDeselectAll}>
                  <Check className="mr-2 h-4 w-4 opacity-100" />
                  Deselect All
                </CommandItem>
              ) : (
                <CommandItem onSelect={handleSelectAll}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.length > 0 ? "opacity-100" : "opacity-0",
                    )}
                  />
                  Select All
                </CommandItem>
              )}
            </CommandGroup>
            <CommandSeparator />
            {Object.entries(groupedOptions).map(
              ([category, categoryOptions], index) => (
                <React.Fragment key={category}>
                  {index > 0 && <CommandSeparator />}
                  <CommandGroup heading={category}>
                    {categoryOptions.map((option) => {
                      const isSelected = selected.some(
                        (item) => item.value === option.value,
                      );
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            onValueChange(
                              isSelected
                                ? selected.filter(
                                    (item) => item.value !== option.value,
                                  )
                                : [...selected, option],
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 shrink-0",
                              isSelected ? "opacity-100" : "opacity-0",
                            )}
                          />
                          <span className="truncate">{option.label}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </React.Fragment>
              ),
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
