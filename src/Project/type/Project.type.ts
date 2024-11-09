export const initialData: Board = {
  lists: [
    {
      id: "list-1",
      title: "To Do",
      cards: [
        { id: "card-1", content: "Task 1" },
        { id: "card-2", content: "Task 2" },
      ],
    },
    {
      id: "list-2",
      title: "In Progress",
      cards: [{ id: "card-3", content: "Task 3" }],
    },
  ],
};

export interface Card {
  id: string;
  content: string;
}
export interface List {
  id: string;
  title: string;
  cards: Card[];
}
export interface Board {
  lists: List[];
}
