import { ActionIcon, Button, Modal, NumberInput } from "@mantine/core";
import { IconEdit, IconPencil } from "@tabler/icons-react";
import EmojiPicker from "emoji-picker-react";
import { observer } from "mobx-react-lite";
import { useDisclosure } from "@mantine/hooks";
import { trackerStore } from "../../store/trackerStore";
import styles from "./styles.module.css";
import { Slider } from "@mantine/core";
import { CategoryTypes } from "../../types";
import { useState } from "react";

const maxSpendLimit = 100;

const Categories = observer(() => {
  const transactions = trackerStore.transactions;
  const [opened, { open, close }] = useDisclosure(false);
  const [mutatingCategory, setMutatingCategory] = useState({
    id: "",
    name: "",
    spendLimit: 0,
  });

  const [spendLimit, setSpendLimit] = useState(0);

  const handleOpen = ({ id, name, spendLimit }: CategoryTypes) => {
    // console.log({ id, name, spendLimit });
    setMutatingCategory({ id, name, spendLimit });
    open();
  };
  return (
    <>
      <section>
        <h2>Categories</h2>
        <ul className="ul panel">
          {trackerStore.categories.map(({ id, name, spendLimit }) => {
            // Filter the categories from the transactions
            const linkedTransactions = transactions.filter((transaction) => {
              return transaction.category_id === id;
            });

            const amountSpent = linkedTransactions.reduce(
              (acc, curr) => acc + curr.amount,
              0
            );

            // Get the max spend limit
            // const maxSpendLimit = trackerStore.categories.find(
            //   (category) => category.id === id
            // )?.max_spend_limit;

            return (
              <li className="li" key={id}>
                <div className={styles.categoryRow}>
                  <div>
                    <p className="display-1">{name}</p>
                  </div>
                  <div className={styles.spent}>
                    {/* Total spent */}
                    <div style={{ width: "70%" }}>
                      <Slider defaultValue={20} disabled />
                      <p className="display-1">
                        Max Spend Limit: ${spendLimit}
                      </p>
                    </div>

                    <p className="display-1">${amountSpent.toFixed(2)}</p>
                    <ActionIcon
                      onClick={() => handleOpen({ id, name, spendLimit })}
                    >
                      <IconPencil size={18} color="grey" />
                    </ActionIcon>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <Modal opened={opened} onClose={close} title="Edit Tracker">
        {/* Modal content */}
        {/* <EmojiPicker /> */}
        <div className={styles.modalRow}>
          <p className="display-1">Name</p>{" "}
          <p className="display-1">{mutatingCategory.name}</p>
        </div>
        <div className={styles.modalRow}>
          <p className="display-1">Spend Limit</p>{" "}
          <p className="display-1">
            <NumberInput value={spendLimit} onChange={setSpendLimit} />
          </p>
        </div>
        <Button
          onClick={() => [
            close(),
            trackerStore.setMutatingCategory(
              mutatingCategory.id,
              mutatingCategory.name,
              spendLimit
            ),
          ]}
        >
          Save
        </Button>
      </Modal>
    </>
  );
});

export default Categories;
