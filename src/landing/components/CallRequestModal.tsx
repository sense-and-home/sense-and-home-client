import CallBackBackground from "@/assets/img/call-back-background.webp";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/landing/components/Modal";
import { bookingAPI } from "@/services/bookingService";
import { formatPhoneNumber } from "@/utils";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const cleanPhone = phone.replace(/[\s()]/g, "");
      await bookingAPI.requestCall({ phone: cleanPhone });

      onClose();
      if (onSuccess) {
        onSuccess();
      }
      setPhone("");
    } catch (error: any) {
      console.error("Callback request error:", error);
      setErrorMessage(
        error.message || "Произошла ошибка, пожалуйста попробуйте позже.",
      );
    } finally {
      setIsSubmitting(false);
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
          {errorMessage && (
            <p className="mb-4 text-sm text-red-600 md:text-base">
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="text-surface-1-foreground rounded-primary inline-block w-full bg-black px-4 py-3 text-base md:px-8 md:text-lg"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+7 (---) --- -- --"
              required
            />
            <Button
              shape="round"
              type="submit"
              disabled={isSubmitting || !phone.trim()}
              className="text-surface-1-foreground mt-6 inline-block w-fit bg-black px-6 py-2 font-bold hover:cursor-pointer disabled:bg-black/50 md:px-10 lg:mt-10 lg:w-fit"
            >
              {isSubmitting ? "Отправка..." : "Запросить звонок"}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
