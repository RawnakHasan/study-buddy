"use client";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useToDoStore } from "@/hooks/useToDoStore";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

const ToDo = () => {
  const todos = useToDoStore((state) => state.todos);
  const toggleTodo = useToDoStore((state) => state.toggleTodo);
  const deleteTodo = useToDoStore((state) => state.deleteTodo);

  if (todos.length === 0) {
    return (
      <div className="h-18/20 p-4 border rounded-lg">
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground">
            No todos yet. Click the + button to add one!
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-18/20 p-4 border rounded-lg">
      <h1 className="text-2xl pb-4 mb-4 border-b font-bold">To-Do</h1>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={`flex hover:cursor-pointer items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors ${
              todo.completed ? "bg-white/10" : ""
            }`}
          >
            <Checkbox
              checked={todo.completed}
              className="mt-1 pointer-events-none"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge>{todo.subject}</Badge>
                {todo.paper && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <Badge>{todo.paper}</Badge>
                  </>
                )}
              </div>
              <p
                className={`text-xl mt-1 ${
                  todo.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {todo.chapter}
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ToDo;
