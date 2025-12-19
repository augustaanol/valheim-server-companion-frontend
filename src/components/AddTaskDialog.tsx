"use client";

import { useState } from "react";
import {
  Dialog,
  Button,
  TextField,
  TextArea,
  Flex,
  Select,
  Text,
} from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { NewTaskInput, ToDoItem } from "@/types/todo";

interface Props {
  onAdd: (data: NewTaskInput) => void;
  disabled?: boolean;
}

/**
 * Type guard dla tagów taska
 */
const isTaskTag = (value: string): value is ToDoItem["tag"] => {
  return value === "important" || value === "normal" || value === "backlog";
};

export function AddTaskDialog({ onAdd, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState<ToDoItem["tag"]>("normal");

  const submit = () => {
    if (!title.trim()) return;


    onAdd({
      title: title.trim(),
      description: description.trim(),
      tag,
    });

    setTitle("");
    setDescription("");
    setTag("normal");
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button disabled={disabled} variant="ghost">
          <PlusIcon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Nowe zadanie</Dialog.Title>

        <Flex direction="column" gap="3" mt="4">
          <TextField.Root
            placeholder="Tytuł zadania"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <TextArea
            placeholder="Opis (opcjonalnie)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            resize="vertical"
          />

          <Flex direction="column" gap="1">
            <Text size="2">Tag</Text>

            <Select.Root
              value={tag}
              onValueChange={(value) => {
                if (isTaskTag(value)) {
                  setTag(value);
                }
              }}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="important">Important</Select.Item>
                <Select.Item value="normal">Normal</Select.Item>
                <Select.Item value="backlog">Backlog</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex justify="end" gap="2" mt="4">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Anuluj
              </Button>
            </Dialog.Close>
            <Button onClick={submit}>
              Dodaj
            </Button>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
