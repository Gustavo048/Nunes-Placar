interface ConfirmModalProps {

  open: boolean;

  title: string;

  description: string;

  confirmText?: string;

  cancelText?: string;

  onConfirm: () => void;

  onCancel: () => void;
}


