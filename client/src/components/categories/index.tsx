import {
  ActionIcon,
  Button,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useDisclosure } from "@mantine/hooks";
import { trackerStore } from "../../store/trackerStore";
import styles from "./styles.module.css";
import { CategoryTypes } from "../../types";
import { useState } from "react";
import TransactionMeta from "../transactionHistory/transactions/meta";
import { filterTransactions } from "../../utils/filterTransactions";
import CategoryRow from "./row";

const Categories = observer(() => {
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    openedAddCategoryModal,
    { open: openAddCategoryModal, close: closeAddCategoryModal },
  ] = useDisclosure(false);

  const [newName, setNewName] = useState("");
  const [newLimit, setNewLimit] = useState<string | number>(0);

  const [mutatingCategory, setMutatingCategory] = useState({
    id: "",
    name: "",
    spendLimit: 0,
  });

  const [spendLimit, setSpendLimit] = useState<number | string>(0);

  const handleOpen = ({ id, name, spendLimit }: CategoryTypes) => {
    setMutatingCategory({ id, name, spendLimit });
    setSpendLimit(spendLimit);
    openEditModal();
  };

  const transactions = filterTransactions(trackerStore.transactions);
  const sumAllTransactions = transactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const addNewCategory = () => {
    openAddCategoryModal();
  };

  const handleAddNewCategoryToStore = () => {
    trackerStore.addCategory({
      id: (trackerStore.categories.length + 2).toString(),
      name: newName,
      spendLimit: newLimit as number,
    });
    closeAddCategoryModal();
  };

  const handleEditCategory = () => {
    closeEditModal();
    trackerStore.setMutatingCategory(
      mutatingCategory.id,
      mutatingCategory.name,
      spendLimit as number
    );
  };
  return (
    <>
      <section>
        <div className={styles.header}>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <h2 className="display-2">Categories</h2>
            <ActionIcon
              classNames={{ root: "primary-cta" }}
              onClick={() => addNewCategory()}
            >
              <IconPlus size={10} />
            </ActionIcon>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end " }}>
            <p className="display-1">
              Money
              <br />
              Spent
            </p>
          </div>
        </div>

        <ul className="ul panel">
          {trackerStore.categories.map(({ id, name, spendLimit }) => {
            // Filter the categories from the transactions
            return (
              <CategoryRow
                key={id}
                transactions={transactions}
                id={id}
                spendLimit={spendLimit}
                name={name}
                handleOpen={handleOpen}
              />
            );
          })}
        </ul>
        <TransactionMeta totalSpent={sumAllTransactions} />
      </section>

      <Modal
        opened={openedAddCategoryModal}
        onClose={closeAddCategoryModal}
        title="Add New Category"
        classNames={{ title: "display-3" }}
      >
        <div className={styles.modalRow}>
          <p className="display-3">Name</p>{" "}
          <p className="display-3" style={{ color: "grey" }}>
            <TextInput
              value={newName}
              onChange={(e) => setNewName(e.currentTarget.value)}
            />
          </p>
        </div>
        <div className={styles.modalRow}>
          <p className="display-3">Spend Limit</p>{" "}
          <p className="display-3">
            <NumberInput value={newLimit} onChange={setNewLimit} />
          </p>
        </div>
        <Button
          className="primary-cta"
          classNames={{ label: "display-3" }}
          onClick={() => handleAddNewCategoryToStore()}
        >
          Save
        </Button>
      </Modal>
      <Modal
        opened={openedEditModal}
        onClose={closeEditModal}
        title="Edit Tracker"
        classNames={{ title: "display-3" }}
      >
        <div className={styles.modalRow}>
          <p className="display-3">Name</p>{" "}
          <p className="display-3" style={{ color: "grey" }}>
            {mutatingCategory.name}
          </p>
        </div>
        <div className={styles.modalRow}>
          <p className="display-3">Spend Limit</p>{" "}
          <p className="display-3">
            <NumberInput value={spendLimit} onChange={setSpendLimit} />
          </p>
        </div>
        <Button
          className="primary-cta"
          classNames={{ label: "display-3" }}
          onClick={() => handleEditCategory()}
        >
          Save
        </Button>
      </Modal>
    </>
  );
});

export default Categories;
