"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ascnd-gg/ui/components/ui/popover";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { cn } from "@ascnd-gg/ui/lib/utils";
import { Calendar } from "@ascnd-gg/ui/components/ui/calendar";
import { Label } from "@ascnd-gg/ui/components/ui/label";
import { Input } from "@ascnd-gg/ui/components/ui/input";
import { useState } from "react";

export default function DateTimePicker({
  defaultDate,
  onDateChange,
}: {
  defaultDate?: Date;
  onDateChange: (date: Date | undefined) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const [time, setTime] = useState<string>(
    defaultDate
      ? `${defaultDate?.toTimeString().split(" ")[0]?.split(":", 2).toString().replace(",", ":")}`
      : "12:00",
  );

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    if (date) {
      const [hours, minutes] = e.target.value.split(":");
      const newDate = new Date(date);
      if (!hours || !minutes) return;
      newDate.setHours(
        Number.parseInt(hours, 10),
        Number.parseInt(minutes, 10),
      );

      setDate(newDate);
      onDateChange(newDate);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date && time) {
      date?.setHours(
        Number.parseInt(time.split(":")[0]!, 10),
        Number.parseInt(time.split(":")[1]!, 10),
      );
      setDate(date);
      onDateChange(date);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
          variant="outline"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? `${format(date, "PPPp")}` : <span>Pick a date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <div className="bg-background divide-y overflow-hidden">
          <Calendar
            mode="single"
            month={defaultDate}
            onSelect={handleDateChange}
            selected={date}
          />
          <div className="space-y-2 p-4">
            <Label htmlFor="time">Time</Label>
            <Input
              className="w-full"
              id="time"
              onChange={handleTimeChange}
              type="time"
              value={time}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
