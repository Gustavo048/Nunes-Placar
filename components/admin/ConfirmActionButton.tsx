'use client';

import { useState } from 'react';

interface ConfirmActionButtonProps {

  label: string;

  confirmText: string;

  action: () => Promise<void>;

  variant?:
    | 'green'
    | 'red'
    | 'blue'
    | 'emerald'
    | 'yellow';

  loadingText?: string;
}

export default function ConfirmActionButton({
  label,
  confirmText,
  action,
  variant = 'red',
  loadingText = 'Processando...'
}: ConfirmActionButtonProps) {

  const [
    loading,
    setLoading
  ] = useState(false);

  const handleClick =
    async () => {

      const confirmed =
        window.confirm(
          confirmText
        );

      if (!confirmed) {
        return;
      }

      try {

        setLoading(true);

        await action();

      } finally {

        setLoading(false);
      }
    };

  const variants = {

    green: `
      bg-green-500/10
      hover:bg-green-500/20
      border-green-500/10
      text-green-300
    `,

    red: `
      bg-red-500/10
      hover:bg-red-500/20
      border-red-500/10
      text-red-300
    `,

    blue: `
      bg-blue-500/10
      hover:bg-blue-500/20
      border-blue-500/10
      text-blue-300
    `,

    emerald: `
      bg-emerald-500/10
      hover:bg-emerald-500/20
      border-emerald-500/10
      text-emerald-300
    `,

    yellow: `
      bg-yellow-500/10
      hover:bg-yellow-500/20
      border-yellow-500/10
      text-yellow-300
    `,
  };

  return (

    <button

      onClick={handleClick}

      disabled={loading}

      className={`
        px-3
        py-2

        rounded-xl

        border

        text-[10px]

        uppercase

        tracking-[0.18em]

        font-black

        transition-all

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${variants[variant]}
      `}
    >

      {loading
        ? loadingText
        : label}

    </button>
  );
}