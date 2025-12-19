"use client";

import { Flex, Separator } from "@radix-ui/themes";
import { ToDoColumn } from "@/components/ToDoColumn";
import { ToDoItem as ToDoListType, TaskUpdate as TaskUpdate, NewTaskInput } from "@/types/todo";
import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { fetchTasks, deleteTask, createTask,updateTask } from "@/app/api/tasks";
import { createComment, deleteComment } from "@/app/api/comments";





export default function ToDoList() {

    const [tasks, setTasks] = useState<ToDoListType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { currentUser } = useUserStore();

    const defaultGap: string = "4";

    useEffect(() => {
        fetchTasks()
            .then(setTasks)
            .catch((err: unknown) => {
            console.error(err);
            setError("Nie udało się pobrać zadań");
            })
            .finally(() => setLoading(false));
        }, []);


    const onUpdateTask = async (id: number, update: TaskUpdate) => {
        try {
            await updateTask(id, update);   // PATCH
            const fresh = await fetchTasks(); // GET + mapowanie
            setTasks(fresh);
        } catch (e) {
            console.error(e);
        }
    };


    const onAddComment = async (taskId: number, content: string) => {
        if (!currentUser) {
            alert("Wybierz użytkownika");
            return;
        }

        try {
            await createComment(taskId, content, currentUser.steam_id);

            // 🔥 KLUCZOWA LINIJKA
            const freshTasks = await fetchTasks();
            setTasks(freshTasks);
        } catch (err) {
            console.error(err);
            alert("Nie udało się dodać komentarza");
        }
    };




    const onDeleteComment = async (taskId: number, commentId: number) => {
        const prev = tasks;

        setTasks((tasks) =>
            tasks.map((t) =>
            t.id === taskId
                ? {
                    ...t,
                    comments: t.comments.filter((c) => c.id !== commentId),
                }
                : t
            )
        );

        try {
            await deleteComment(commentId);
        } catch {
            setTasks(prev);
            alert("Nie udało się usunąć komentarza");
        }
    };


    const onAddTask = async (data: NewTaskInput) => {
        if (!currentUser) return alert("Wybierz użytkownika");

        try {
            const newTask = await createTask({
            ...data,
            creatorId: currentUser.steam_id,
            });

            setTasks((prev) => [newTask, ...prev]);
        } catch (err) {
            console.error(err);
            alert("Nie udało się dodać zadania");
        }
    };

        const onDeleteTask = async (id: number) => {
            // optimistic update
            const prevTasks = tasks;
            setTasks((prev) => prev.filter((t) => t.id !== id));

            try {
                await deleteTask(id);
            } catch (err) {
                console.error(err);
                // rollback
                setTasks(prevTasks);
                alert("Nie udało się usunąć zadania");
            }
        };

    if (loading) {
        return <p>Ładowanie zadań…</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }



    return (
        <Flex direction={{initial: "column", sm: "row"}} gap={defaultGap} justify={"between"} className="h-[70vh] pt-4">
            
            
            <ToDoColumn
                title="To Do"
                tasks={tasks.filter(t => t.status === "todo")}
                onUpdateTask={onUpdateTask}
                onAddComment={onAddComment}
                onDeleteComment={onDeleteComment}
                onAddTask={onAddTask}
                onDeleteTask={onDeleteTask}
            />

            <Separator orientation="vertical" size={"4"} />

            <ToDoColumn
                title="In progress"
                tasks={tasks.filter(t => t.status === "in-progress")}
                onUpdateTask={onUpdateTask}
                onAddComment={onAddComment}
                onDeleteComment={onDeleteComment}
                onAddTask={onAddTask}
                onDeleteTask={onDeleteTask}
            />

            <Separator orientation="vertical" size={"4"} />

            <ToDoColumn
                title="Done"
                tasks={tasks.filter(t => t.status === "done")}
                showTag={false}
                onUpdateTask={onUpdateTask}
                onAddComment={onAddComment}
                onDeleteComment={onDeleteComment}
                onAddTask={onAddTask}
                onDeleteTask={onDeleteTask}
            />
        </Flex>
    )
}   