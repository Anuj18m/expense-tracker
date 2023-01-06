import { Divider, Text } from "@mantine/core";
import AddToExpenses from "../components/AddToExpenses";
import PageContainer from "../layout/PageContainer";
import { useContext } from "react";
import ExpensesContext from "../store/ExpensesContext";
import ResetValueModal from "../components/ResetValueModal";

const AddExpensePage = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);

  return (
    <PageContainer>
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
        Add an Expense
      </Text>
      <Text
        size="xs"
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[1]
              : theme.colors.gray[9],
        })}
      >
        Adds on to your current expense amount.
      </Text>
      <AddToExpenses />
      <Divider mt={30} mb={20} />
      <ResetValueModal
        prevAmount={expenses}
        resetFunction={setExpenses}
        type="Expenses"
      />
    </PageContainer>
  );
};

export default AddExpensePage;
