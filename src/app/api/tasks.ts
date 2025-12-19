
import { ToDoItem, TaskUpdate } from "@/types/todo";
import { ApiTask } from "@/types/api";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export function mapTaskFromApi(task: ApiTask): ToDoItem {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    createdAt: task.created_at,
    creatorId: task.creator_id,
    status: task.status,
    tag: task.tag,
    comments: task.comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.created_at,
      authorId: c.author_id,
    })),
  };
}


/* GET */
export async function fetchTasks(): Promise<ToDoItem[]> {
  const res = await fetch(`${BACKEND_URL}/api/tasks`);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data: ApiTask[] = await res.json();
  return data.map(mapTaskFromApi);
}

/* POST */
export async function createTask(data: {
    title: string;
    description: string;
    tag: "important" | "normal" | "backlog";
    creatorId: string;
    }) {
    const res = await fetch(`${BACKEND_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        title: data.title,
        description: data.description,
        tag: data.tag,
        creator_id: data.creatorId, // ⬅️ KLUCZOWE
        }),
    });

    if (!res.ok) {
        const error = await res.text();
        console.error("Create task error:", error);
        throw new Error("Create task failed");
    }

    return res.json();
}


/* PATCH */
export async function updateTask(
  id: number,
  data: TaskUpdate
): Promise<ToDoItem> {
  const res = await fetch(`${BACKEND_URL}/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update task failed");
  return res.json();
}

/* DELETE */
export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Delete task failed");
}
