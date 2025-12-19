export interface ApiComment {
  id: number;
  content: string;
  created_at: string;   // ISO string
  author_id: string;
}

export interface ApiTask {
  id: number;
  title: string;
  description: string;
  created_at: string;   // ISO string
  creator_id: string;
  status: "todo" | "in-progress" | "done";
  tag: "important" | "normal" | "backlog";
  comments: ApiComment[];
}