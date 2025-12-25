"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Data, Paper, Subject } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { useToDoStore } from "@/hooks/useToDoStore";

interface TodoFormData {
  subject: string;
  paper?: string;
  chapter: string;
}

const TodoDialog = () => {
  const [open, setOpen] = useState(false);
  const addTodo = useToDoStore((state) => state.addTodo);

  const form = useForm<TodoFormData>({
    defaultValues: {
      subject: "",
      paper: "",
      chapter: "",
    },
  });

  const onSubmit = (data: TodoFormData) => {
    addTodo({
      subject: data.subject,
      paper: data.paper,
      chapter: data.chapter,
    });
    toast.success("Todo added successfully!");
    form.reset({
      subject: "",
      paper: "",
      chapter: "",
    });
    setOpen(false);
  };

  const onReset = () => {
    form.reset({
      subject: "",
      paper: "",
      chapter: "",
    });
  };

  const selectedSubject: Subject = useWatch({
    control: form.control,
    name: "subject",
  }) as Subject;

  const selectedPaper: Paper = useWatch({
    control: form.control,
    name: "paper",
  }) as Paper;

  const papers =
    selectedSubject && Data[selectedSubject]
      ? Object.keys(Data[selectedSubject])
      : [];

  const chapters = selectedSubject
    ? selectedSubject === "ICT"
      ? Object.values(Data[selectedSubject])
      : selectedPaper && Data[selectedSubject]?.[selectedPaper]
      ? Object.values(Data[selectedSubject][selectedPaper])
      : []
    : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chapter Todo</DialogTitle>
          <DialogDescription>
            Create a to-do with specific Chapter of a Subject
          </DialogDescription>
        </DialogHeader>
        <form id="todo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="subject"
              control={form.control}
              rules={{ required: "Subject is required" }}
              render={({
                field: { onChange, onBlur, ...field },
                fieldState,
              }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
                  <Select {...field} onValueChange={onChange}>
                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                      onBlur={onBlur}
                      id={field.name}
                    >
                      <SelectValue placeholder="Select a Subject" />
                    </SelectTrigger>
                    <SelectContent id={field.name}>
                      {Object.keys(Data).map((subject) => (
                        <SelectItem value={subject} key={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {selectedSubject && selectedSubject !== "ICT" && (
              <Controller
                name="paper"
                control={form.control}
                rules={{ required: "Paper is required" }}
                render={({
                  field: { onChange, onBlur, ...field },
                  fieldState,
                }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Paper</FieldLabel>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        onBlur={onBlur}
                        id={field.name}
                      >
                        <SelectValue placeholder="Select a Paper" />
                      </SelectTrigger>
                      <SelectContent id={field.name}>
                        {papers.map((paper) => (
                          <SelectItem value={paper} key={paper}>
                            {paper}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
            {chapters.length > 0 && (
              <Controller
                name="chapter"
                control={form.control}
                rules={{ required: "Chapter is required" }}
                render={({
                  field: { onChange, onBlur, ...field },
                  fieldState,
                }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Chapter</FieldLabel>
                    <Select {...field} onValueChange={onChange}>
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        onBlur={onBlur}
                        id={field.name}
                      >
                        <SelectValue placeholder="Select a Chapter" />
                      </SelectTrigger>
                      <SelectContent id={field.name}>
                        {chapters.map((chapter) => (
                          <SelectItem value={chapter} key={chapter}>
                            {chapter}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button onClick={onReset} variant="destructive" type="button">
            Reset
          </Button>
          <Button type="submit" form="todo">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default TodoDialog;
