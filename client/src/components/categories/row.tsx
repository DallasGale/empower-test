import { ActionIcon, Slider } from "@mantine/core";
import { TransactionTypes } from "../../types";
import styles from "./styles.module.css";
import { IconPencil } from "@tabler/icons-react";
import { convertSpendIntoPercentage } from "../../utils/convertSpendIntoPercentage";

interface CategoryRowProps {
  transactions: TransactionTypes[];
  id: string;
  spendLimit: number;
  name: string;
  handleOpen: (category: {
    id: string;
    name: string;
    spendLimit: number;
  }) => void;
}

const CategoryRow = ({
  transactions,
  id,
  spendLimit,
  name,
  handleOpen,
}: CategoryRowProps) => {
  const linkedTransactions = transactions.filter((transaction) => {
    return transaction.category_id === id;
  });

  const amountSpent = linkedTransactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const percent = convertSpendIntoPercentage(amountSpent, spendLimit);

  const barColor = () => {
    if (percent === 0) {
      return styles.blankTrack;
    } else if (percent > 0 && percent < 45) {
      return styles.defaultTrack;
    } else if (percent > 45 && percent < 75) {
      return styles.warningTrack;
    } else {
      return styles.alertTrack;
    }
  };
  return (
    <li className="li">
      <div className={styles.categoryRow}>
        <div>
          <p className="display-1">{name}</p>
        </div>
        <div className={styles.spent}>
          {/* Total spent */}
          <div style={{ width: "100%", position: "relative" }}>
            <Slider
              // format the bar style with a function
              classNames={{
                bar: barColor(),
                thumb: styles.thumb,
              }}
              value={percent === 0 ? 0 : percent}
              style={{ pointerEvents: "none", width: "100%" }}
            />
            {percent === 0 && (
              <p className="display-1">
                You haven't spent anything on {name} yet!
              </p>
            )}{" "}
            {percent === 100 && (
              <p className="display-1 alert">
                Ooops!, you have reached your limit
              </p>
            )}
            <p
              className="display-1"
              style={{
                position: "absolute",
                right: 0,
                top: 16,
                opacity: 0.5,
                padding: "4px 8px",
                background: "#cbcbcb",
                borderRadius: "7px",
              }}
            >
              Limit: ${spendLimit}
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
};

export default CategoryRow;
