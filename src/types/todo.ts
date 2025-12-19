export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    authorId: string;
}

export interface ToDoItem {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    creatorId: string;
    status: "todo" | "in-progress" | "done";
    tag: "important" | "normal" | "backlog";
    comments: Comment[];
}

export type TaskUpdate = Partial<
  Pick<ToDoItem, "title" | "description" | "status" | "tag">
>;

export type NewTaskInput = {
  title: string;
  description: string;
  tag: ToDoItem["tag"];
};
