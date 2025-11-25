import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/libs/api";
import { Todo } from "@/schemas/todo";

const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get("/todos");
  return data;
};

export const useTodos = () =>
  useQuery({ queryKey: ["todos"], queryFn: fetchTodos });

export const useCreateTodo = () => {
  const qc = useQueryClient();
  return useMutation((payload: Partial<Todo>) => api.post("/todos", payload), {
    onSuccess: () => qc.invalidateQueries(["todos"]),
  });
};
