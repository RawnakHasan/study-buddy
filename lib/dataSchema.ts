import { z } from "zod";

const ChapterSchema = z.record(z.string(), z.string());

const BengaliContentSchema = z.object({
  Prose: ChapterSchema,
  Poetry: ChapterSchema,
});

const BengaliSchema = z.object({
  "1st Paper": BengaliContentSchema,
  "2nd Paper": ChapterSchema,
});

const PaperBasedSubjectSchema = z.object({
  "1st Paper": ChapterSchema,
  "2nd Paper": ChapterSchema,
});

const ICTSchema = ChapterSchema;

export const DataSchema = z.object({
  Physics: PaperBasedSubjectSchema,
  Chemistry: PaperBasedSubjectSchema,
  "Higher Math": PaperBasedSubjectSchema,
  Biology: PaperBasedSubjectSchema,
  ICT: ICTSchema,
  Bengali: BengaliSchema,
});

export type TDataSchema = z.infer<typeof DataSchema>;
