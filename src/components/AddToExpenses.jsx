import { Button, Divider, MultiSelect, Text, TextInput } from "@mantine/core";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AvailableCategoriesContext from "../store/AvailableCategoriesContext";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";
import DeleteCatToolTip from "./DeleteCatToolTip";

const AddToExpenses = () => {
  const { addHistoryElement } = useContext(HistoryContext);
  const { availableCategories, setAvailableCategories } = useContext(
    AvailableCategoriesContext
  );
  const { addCategory } = useContext(CategoriesContext);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState([""]);
  const navigate = useNavigate();

  return (
    <div>
      <TextInput
        onChange={(e) => setLabel(e.currentTarget.value)}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: Car payments"
        label="Label"
        withAsterisk
      />
      <TextInput
        onChange={(e) => setValue(Number.parseFloat(e.currentTarget.value))}
        mt={20}
        size="md"
        w="40%"
        placeholder="Ex: 3000"
        label="Amount"
        withAsterisk
      />
      <Divider mt={30} mb={20} />
      <Text
        size="xl"
        weight={700}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[0]
              : theme.colors.gray[9],
        })}
      >
        Add a Category to Your Expense
      </Text>
      <MultiSelect
        w="40%"
        mt={10}
        data={availableCategories}
        label="Select a Category"
        placeholder="Select a category or create a new one"
        searchable
        creatable
        value={category}
        onChange={setCategory}
        maxSelectedValues={1}
        getCreateLabel={(query) =>
          `+ Create ${query[0].toUpperCase() + query.substring(1)}`
        }
        onCreate={(query) => {
          const capQuery = query[0].toUpperCase() + query.substring(1);
          const item = {
            value: capQuery,
            label: capQuery,
            isused: "false",
          };

          setAvailableCategories((current) => [item, ...current]);
          return item;
        }}
      />
      <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <Button
          mr={30}
          onClick={() => {
            if (label === "" || value <= 0 || Number.isNaN(value)) {
              alert(
                "Invalid Entries. Make sure the label is not empty and the amount is greater than zero."
              );
            } else {
              category[0] = category[0] || "Uncategorized";
              addCategory({
                label: category[0],
                amount: value,
                id: crypto.randomUUID(),
              });
              setAvailableCategories((prev) =>
                prev.map((c) => ({
                  ...c,
                  isused: c.label === category[0] ? "true" : c.isused,
                }))
              );
              navigate("/");
              addHistoryElement({
                label,
                amount: value,
                id: crypto.randomUUID(),
                type: "Expense",
                dateCreated: "",
                category: category[0],
              });
            }
          }}
        >
          Add Expense
        </Button>
        <Button
          color="red"
          onClick={() => {
            if (!category[0]) {
              alert("No category has been selected!");
              return;
            }

            if (category[0] === "Uncategorized") {
              alert("Uncategorized cannot be removed!");
              return;
            }

            let removed = false;
            setAvailableCategories((prev) => {
              const updatedCategories = prev.filter((c) => {
                if (c.label === category[0] && c.isused === "false") {
                  removed = true;
                  return false;
                }
                return true;
              });

              return updatedCategories;
            });

            if (!removed) {
              alert("Category cannot be removed since it is being used.");
            }
          }}
        >
          Remove Category
        </Button>
        <DeleteCatToolTip />
      </div>
    </div>
  );
};

export default AddToExpenses;
