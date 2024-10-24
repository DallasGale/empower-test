import { Button, NumberInput, TextInput } from "@mantine/core";
import styles from "./styles.module.css";

const AddCategoryForm = ({
  newName,
  setNewName,
  newLimit,
  setNewLimit,
  onSave,
}: {
  newName: string;
  setNewName: (value: string) => void;
  newLimit: string | number;
  setNewLimit: (value: number | string) => void;
  onSave: () => void;
}) => (
  <>
    <div className={styles.modalRow}>
      <p className="display-3">Name</p>
      <TextInput
        value={newName}
        onChange={(e) => setNewName(e.currentTarget.value)}
      />
    </div>
    <div className={styles.modalRow}>
      <p className="display-3">Spend Limit</p>
      <NumberInput value={newLimit} onChange={setNewLimit} />
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

export default AddCategoryForm;
