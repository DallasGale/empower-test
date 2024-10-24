import { Modal } from "@mantine/core";

interface CategoryModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CategoryModal = ({
  opened,
  onClose,
  title,
  children,
}: CategoryModalProps) => (
  <Modal
    opened={opened}
    onClose={onClose}
    title={title}
    classNames={{ title: "display-3" }}
  >
    {children}
  </Modal>
);
export default CategoryModal;
