import CallBackBackground from "@/assets/img/call-back-background.webp";
import { Modal } from "@/components/Modal";
import React, { useState } from "react";

interface CallRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CallRequestModal({
  isOpen,
  onClose,
  onSuccess,
}: CallRequestModalProps) {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    onClose();

    if (onSuccess) {
      onSuccess();
      setPhone("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="relative overflow-hidden bg-cover bg-center text-center text-black"
        style={{
          backgroundImage: `url(${CallBackBackground})`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          <h2 className="mb-2 text-xl font-extrabold md:text-2xl">
            Оставьте номер телефона
          </h2>
          <p className="mb-6 text-sm md:text-base">
            и мы перезвоним в ближайшие 15 минут
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="text-foreground rounded-primary inline-block w-full bg-black px-4 py-3 text-base md:px-8 md:text-lg"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (---) --- -- --"
              required
            />

            <button
              type="submit"
              disabled={isSubmitting || !phone.trim()}
              className={`rounded-primary mt-6 inline-block w-fit bg-black px-6 py-2 font-bold text-white hover:cursor-pointer disabled:bg-black/50 md:px-10 lg:mt-10 lg:w-fit`}
            >
              {isSubmitting ? "Отправка..." : "Запросить звонок"}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
