import { ActionIcon, Button, Modal, NumberInput } from "@mantine/core";
import { IconEdit, IconPencil } from "@tabler/icons-react";
import EmojiPicker from "emoji-picker-react";
import { observer } from "mobx-react-lite";
import { useDisclosure } from "@mantine/hooks";
import { trackerStore } from "../../store/trackerStore";
import styles from "./styles.module.css";
import { Slider } from "@mantine/core";
import { CategoryTypes } from "../../types";
import { useEffect, useState } from "react";
import { toJS, transaction } from "mobx";
import TransactionMeta from "../transactionHistory/transactions/meta";
import { filterTransactions } from "../../utils/filterTransactions";

const Categories = observer(() => {
  // const transactions = trackerStore.transactions;
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
    setSpendLimit(spendLimit);
    open();
  };

  const convertSpendIntoPercentage = (spend: number, limit: number) => {
    if (!limit) return 0; // Prevent division by zero
    const percentage = (spend / limit) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  const transactions = filterTransactions(trackerStore.transactions);
  const sumAllTransactions = transactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  // useEffect(() => {
  //   console.log(
  //     "trackerStore.selectedAccount",
  //     toJS(trackerStore.selectedAccount)
  //   );
  //   console.log("trackerStore.transactions", toJS(trackerStore.transactions));
  // }, [trackerStore.selectedAccount]);
  return (
    <>
      <section>
        <div className={styles.header}>
          <h2 className="display-2">Categories</h2>
          <div>
            <p className="display-1">Money Spent</p>
          </div>
        </div>

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

            const percent = convertSpendIntoPercentage(amountSpent, spendLimit);
            return (
              <li className="li" key={id}>
                <div className={styles.categoryRow}>
                  <div>
                    <p className="display-1">{name}</p>
                  </div>
                  <div className={styles.spent}>
                    {/* Total spent */}
                    <div style={{ width: "100%" }}>
                      {percent > 0 ? (
                        <Slider
                          classNames={{
                            bar:
                              percent < 99
                                ? styles.defaultTrack
                                : styles.alertTrack,
                            thumb: styles.thumb,
                          }}
                          value={percent}
                          style={{ pointerEvents: "none", width: "100%" }}
                        />
                      ) : (
                        <p className="display-1">
                          You haven't spent anything yet on {name} yet!
                        </p>
                      )}{" "}
                      {percent === 100 && (
                        <p className="display-1">
                          Ooops!, you have reached your limit
                        </p>
                      )}
                      <p className="display-1">
                        Max Spend Limit: ${spendLimit}
                      </p>
                    </div>

                    <div>
                      <p className="display-1">${amountSpent.toFixed(2)}</p>
                    </div>
                    <ActionIcon
                      className="action-button"
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
        <TransactionMeta totalSpent={sumAllTransactions} />
      </section>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Tracker"
        classNames={{ title: "display-3" }}
      >
        {/* Modal content */}
        {/* <EmojiPicker /> */}
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
