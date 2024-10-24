import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { trackerStore } from "../../store/trackerStore";
import { CategoryTypes } from "../../types";
import { filterTransactions } from "../../utils/filterTransactions";
import TransactionMeta from "../transactionHistory/transactions/meta";
import CategoryRow from "./row";
import styles from "./styles.module.css";
import CategoryModal from "./modal";
import EditCategoryForm from "./editForm";
import AddCategoryForm from "./addForm";

const Categories = observer(() => {
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [openedAddModal, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  const [newName, setNewName] = useState("");
  const [newLimit, setNewLimit] = useState<string | number>(0);
  const [spendLimit, setSpendLimit] = useState<number | string>(0);
  const [mutatingCategory, setMutatingCategory] = useState<CategoryTypes>({
    id: "",
    name: "",
    spendLimit: 0,
  });

  const transactions = filterTransactions(trackerStore.transactions);
  const totalSpent = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  const handleOpenEdit = ({ id, name, spendLimit }: CategoryTypes) => {
    setMutatingCategory({ id, name, spendLimit });
    setSpendLimit(spendLimit);
    openEditModal();
  };

  const handleAddCategory = () => {
    trackerStore.addCategory({
      id: (trackerStore.categories.length + 2).toString(),
      name: newName,
      spendLimit: newLimit as number,
    });
    closeAddModal();
  };

  const handleEditCategory = () => {
    trackerStore.setMutatingCategory(
      mutatingCategory.id,
      mutatingCategory.name,
      spendLimit as number
    );
    closeEditModal();
  };

  return (
    <>
      <section>
        <div className={styles.header}>
          <div className="flex flex-row gap-2.5">
            <h2 className="display-2">Categories</h2>
            <ActionIcon
              classNames={{ root: "primary-cta" }}
              onClick={openAddModal}
            >
              <IconPlus size={10} />
            </ActionIcon>
          </div>
          <div className="flex items-end">
            <p className="display-1">
              Money
              <br />
              Spent
            </p>
          </div>
        </div>

        <ul className="ul panel">
          {trackerStore.categories.map((category) => (
            <CategoryRow
              key={category.id}
              transactions={transactions}
              {...category}
              handleOpen={handleOpenEdit}
            />
          ))}
        </ul>
        <TransactionMeta totalSpent={totalSpent} />
      </section>

      <CategoryModal
        opened={openedAddModal}
        onClose={closeAddModal}
        title="Add New Category"
      >
        <AddCategoryForm
          newName={newName}
          setNewName={setNewName}
          newLimit={newLimit}
          setNewLimit={setNewLimit}
          onSave={handleAddCategory}
        />
      </CategoryModal>

      <CategoryModal
        opened={openedEditModal}
        onClose={closeEditModal}
        title="Edit Tracker"
      >
        <EditCategoryForm
          categoryName={mutatingCategory.name}
          spendLimit={spendLimit}
          setSpendLimit={setSpendLimit}
          onSave={handleEditCategory}
        />
      </CategoryModal>
    </>
  );
});

export default Categories;
