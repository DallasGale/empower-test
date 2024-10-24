import { Button, NumberInput } from "@mantine/core";
import styles from "./styles.module.css";

const EditCategoryForm = ({
  categoryName,
  spendLimit,
  setSpendLimit,
  onSave,
}: {
  categoryName: string;
  spendLimit: number | string;
  setSpendLimit: (value: number | string) => void;
  onSave: () => void;
}) => (
  <>
    <div className={styles.modalRow}>
      <p className="display-3">Name</p>
      <p className="display-3" style={{ color: "grey" }}>
        {categoryName}
      </p>
    </div>
    <div className={styles.modalRow}>
      <p className="display-3">Spend Limit</p>
      <NumberInput value={spendLimit} onChange={setSpendLimit} />
    </div>
    <Button
      className="primary-cta"
      classNames={{ label: "display-3" }}
      onClick={onSave}
    >
      Save
    </Button>
  </>
);

export default EditCategoryForm;
