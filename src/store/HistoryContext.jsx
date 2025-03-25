import { useLocalStorage } from "@mantine/hooks";
import { createContext } from "react";

const HistoryContext = createContext({
  history: [],
  setHistory: () => {},
  addHistoryElement: () => {},
  deleteHistoryElement: () => {},
});

export function HistoryContextProvider({ children }) {
  const [history, setHistory] = useLocalStorage({
    key: "History",
    defaultValue: [],
  });

  function setHistoryHandler(history) {
    setHistory(history);
  }

  // Adds a history item with the current date
  function addHistoryElementHandler(element) {
    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    setHistory((prev) => [
      {
        ...element,
        dateCreated: date,
      },
      ...prev,
    ]);
  }

  // Deletes a history item by ID
  function deleteHistoryElementHandler(id) {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  }

  const context = {
    history,
    setHistory: setHistoryHandler,
    addHistoryElement: addHistoryElementHandler,
    deleteHistoryElement: deleteHistoryElementHandler,
  };

  return (
    <HistoryContext.Provider value={context}>
      {children}
    </HistoryContext.Provider>
  );
}

export default HistoryContext;
