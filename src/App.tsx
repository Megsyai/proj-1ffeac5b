
import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "sonner";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Load todos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("megsy-todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("megsy-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
    toast.success("تمت إضافة المهمة بنجاح");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.error("تم حذف المهمة");
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6" dir="rtl">
      <Toaster position="top-center" />
      <div className="max-w-md mx-auto">
        <Card className="shadow-xl border-none">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                <ListTodo className="h-6 w-6 text-primary" />
                قائمة مهامي
              </CardTitle>
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                {completedCount} / {todos.length} مكتمل
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={addTodo} className="flex gap-2 mb-6">
              <Input
                placeholder="ما الذي تنوي فعله اليوم؟"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Plus className="h-5 w-5" />
              </Button>
            </form>

            <div className="space-y-3">
              {todos.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <p>لا توجد مهام حالياً. ابدأ بإضافة واحدة!</p>
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-all duration-200 group",
                      todo.completed 
                        ? "bg-slate-50 border-slate-100" 
                        : "bg-white border-slate-200 hover:border-primary/30 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={cn(
                          "transition-colors",
                          todo.completed ? "text-green-500" : "text-slate-300 hover:text-primary"
                        )}
                      >
                        {todo.completed ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <Circle className="h-6 w-6" />
                        )}
                      </button>
                      <span
                        className={cn(
                          "text-sm font-medium transition-all",
                          todo.completed 
                            ? "text-slate-400 line-through" 
                            : "text-slate-700"
                        )}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-destructive transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center mt-8 text-slate-400 text-xs text-balance">
          تم التصميم بواسطة Megsy AI - تطبيق مهام بسيط وسريع.
        </p>
      </div>
    </div>
  );
};

export default App;
