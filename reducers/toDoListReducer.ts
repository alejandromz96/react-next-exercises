type ToDoTask = {
  id: string;
  text: string;
  completed: boolean;
};

type ToDoListState = {
  tasks: ToDoTask[];
};

type ToDoListAction =
  | { type: "add"; payload: string }
  | { type: "toggle"; payload: string }
  | { type: "delete"; payload: string }
  | { type: "reset" };

export const initialState: ToDoListState = { tasks: [] };

const ToDoListReducer = (state: ToDoListState, action: ToDoListAction): ToDoListState => {
  switch (action.type) {
    case "add":
      const text = action.payload.trim();
      if (!text) return state;
      return {
        tasks: [...state.tasks, { id: crypto.randomUUID(), text, completed: false }],
      };
    case "toggle":
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }),
      };
    case "delete":
      return {
        tasks: state.tasks.filter(({ id }) => id !== action.payload),
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export default ToDoListReducer;
