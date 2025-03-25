import { Button, Modal, Text } from "@mantine/core";
import { useContext } from "react";
import CategoriesContext from "../store/CategoriesContext";
import HistoryContext from "../store/HistoryContext";

const HistoryModal = ({
  opened,
  setOpened,
  label,
  amount,
  dateCreated,
  type,
  id,
  category,
}) => {
  const { deleteHistoryElement } = useContext(HistoryContext);
  const { subtractCategoryAmount, addCategory } = useContext(CategoriesContext);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Transaction Details"
      styles={{
        title: {
          fontSize: 20,
        },
      }}
    >
      <Text>
        <span style={{ fontWeight: "bold" }}>Label:</span> {label}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Type:</span> {type}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Amount:</span> $
        {amount.toLocaleString()}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Category:</span> {category}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>Date Created:</span> {dateCreated}
      </Text>
      <Text>
        <span style={{ fontWeight: "bold" }}>ID:</span> {id}
      </Text>
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Button onClick={() => setOpened(false)}>Exit</Button>
        <Button
          color="red"
          onClick={() => {
            deleteHistoryElement(id);

            if (type === "Expenses Reset") {
              // Assign returned expenses to the Uncategorized category
              addCategory({
                label: "Uncategorized",
                amount: amount,
                id: crypto.randomUUID(),
              });
            } else if (type === "Budget Reset") {
              addCategory({
                label: "Budget",
                amount: amount,
                id: crypto.randomUUID(),
              });
            }

            // Subtract the removed transaction amount from its category
            subtractCategoryAmount(category, amount);
            setOpened(false);
          }}
        >
          Delete Item
        </Button>
      </div>
    </Modal>
  );
};

export default HistoryModal;
