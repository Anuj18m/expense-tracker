import { useLocalStorage } from "@mantine/hooks";
import { createContext } from "react";

const AvailableCategoriesContext = createContext({
  availableCategories: [],
  setAvailableCategories: () => {},
});

export function AvailableCategoriesContextProvider({ children }) {
  const [availableCategories, setAvailableCategories] = useLocalStorage({
    key: "multiSelectCategories",
    defaultValue: [
      { label: "Entertainment", value: "Entertainment", isused: "false" },
      { label: "Groceries", value: "Groceries", isused: "false" },
      { label: "Uncategorized", value: "Uncategorized", isused: "false" },
    ],
  });

  function setAvailableCategoriesHandler(callBack) {
    setAvailableCategories(callBack);
  }

  const context = {
    availableCategories,
    setAvailableCategories: setAvailableCategoriesHandler,
  };

  return (
    <AvailableCategoriesContext.Provider value={context}>
      {children}
    </AvailableCategoriesContext.Provider>
  );
}

export default AvailableCategoriesContext;
