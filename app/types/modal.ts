interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  price: number;
}

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (values: any) => Promise<any>;
}

interface AddUserModalProps {
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
}

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSubmit: (values: any) => Promise<any>;
}
