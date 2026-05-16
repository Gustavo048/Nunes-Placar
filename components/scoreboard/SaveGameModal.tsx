'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SaveGameModal({
  open,
  loading,
  onClose,
  onConfirm
}: Props) {

  return (
    <AnimatePresence>

      {open && (

        <motion.div

          initial={{
            opacity: 0
          }}

          animate={{
            opacity: 1
          }}

          exit={{
            opacity: 0
          }}

          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            backdrop-blur-md
          "
        >

          <motion.div

            initial={{
              scale: 0.92,
              opacity: 0
            }}

            animate={{
              scale: 1,
              opacity: 1
            }}

            exit={{
              scale: 0.92,
              opacity: 0
            }}

            transition={{
              duration: 0.2
            }}

            className="
              w-full
              max-w-md
              mx-4
              p-7
              rounded-[2rem]
              border
              border-white/10
              bg-zinc-950
              shadow-[0_0_80px_rgba(0,0,0,0.5)]
            "
          >

            <div className="space-y-6">

              <div>
                <h2
                  className="
                    text-2xl
                    font-black
                    text-white
                    mb-3
                  "
                >
                  Salvar partida?
                </h2>

                <p
                  className="
                    text-white/50
                    leading-relaxed
                  "
                >
                  A vitória será registrada
                  no ranking oficial.
                </p>
              </div>

              <div
                className="
                  flex
                  gap-3
                "
              >

                <button
                  onClick={onClose}

                  className="
                    flex-1
                    py-4
                    rounded-2xl
                    bg-white/5
                    hover:bg-white/10
                    border
                    border-white/10
                    text-white
                    font-bold
                    transition-all
                  "
                >
                  Cancelar
                </button>

                <button
                  onClick={onConfirm}

                  disabled={loading}

                  className="
                    flex-1
                    py-4
                    rounded-2xl
                    bg-yellow-500
                    hover:bg-yellow-400
                    disabled:opacity-50
                    text-black
                    font-black
                    transition-all
                  "
                >

                  {loading
                    ? "Salvando..."
                    : "Salvar"}

                </button>
              </div>
            </div>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}

