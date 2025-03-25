import { useLocalStorage } from "@mantine/hooks";
import { createContext, useContext } from "react";
import AvailableCategoriesContext from "./AvailableCategoriesContext";

const CategoriesContext = createContext({
  categories: [],
  getTotalAmount: () => 0,
  resetAmount: () => {},
  setCategories: () => {},
  addCategory: () => {},
  deleteCategory: () => {},
  subtractCategoryAmount: () => {},
});

export function CategoriesContextProvider({ children }) {
  const [categories, setCategories] = useLocalStorage({
    key: "categories",
    defaultValue: [],
  });

  const { setAvailableCategories } = useContext(AvailableCategoriesContext);

  function setCategoriesHandler(categories) {
    setCategories(categories);
  }

  function getTotalAmount(type) {
    let total = 0;
    categories.forEach((category) => {
      if (type === "Expenses" && category.label !== "Budget") {
        total += category.amount;
      } else if (type !== "Expenses" && category.label === "Budget") {
        total += category.amount;
      }
    });
    return total;
  }

  function resetAmount(type) {
    setCategories((prev) =>
      prev.filter((c) =>
        type === "Budget" ? c.label !== "Budget" : c.label === "Budget"
      )
    );
  }

  function addCategoryHandler(newCategory) {
    setCategories((prev) => {
      let arr = JSON.parse(JSON.stringify(prev));
      let count = 0;

      arr = arr.map((c) => {
        if (c.label === newCategory.label) {
          c.amount += newCategory.amount;
          count++;
        }
        return c;
      });

      if (count === 0) {
        arr.push(newCategory);
      }
      return [...arr];
    });
  }

  function deleteCategory(label) {
    setCategories((prev) => prev.filter((cat) => cat.label !== label));
  }

  function subtractCategoryAmount(label, amount) {
    setCategories((prev) => {
      const arr = JSON.parse(JSON.stringify(prev));
      const arr2 = [];

      arr.forEach((c) => {
        if (c.label === label) {
          c.amount -= amount;
        }
        if (c.amount > 0) {
          arr2.push(c);
        } else {
          setAvailableCategories((prev) => {
            const arr3 = JSON.parse(JSON.stringify(prev));
            arr3.forEach((category) => {
              if (category.label === label) {
                category.isused = "false";
              }
            });
            return arr3;
          });
        }
      });

      return arr2;
    });
  }

  const context = {
    categories,
    getTotalAmount,
    resetAmount,
    setCategories: setCategoriesHandler,
    addCategory: addCategoryHandler,
    deleteCategory,
    subtractCategoryAmount,
  };

  return (
    <CategoriesContext.Provider value={context}>
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesContext;
