
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function createComment(
  taskId: number,
  content: string,
  authorId: string
) {
  const res = await fetch(`${BACKEND_URL}/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task_id: taskId,
      content,
      author_id: authorId,
    }),
  });

  if (!res.ok) {
    throw new Error("Create comment failed");
  }
}

export async function deleteComment(commentId: number): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Delete comment failed");
}
