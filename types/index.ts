import { Habit, Record } from "@prisma/client";

export interface HabitResponse extends Habit {
  records: Record[];
}

export interface EmojiData {
  aliases: string[];
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
}
