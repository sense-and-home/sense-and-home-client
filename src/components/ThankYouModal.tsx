import ApplyBackground from "@/assets/img/apply-background.webp";
import { Modal } from "./Modal";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function ThankYouModal({
  isOpen,
  onClose,
  title = "Спасибо за интерес к Sense&Home!",
  message = "Мы свяжемся с вами в ближайшее время",
}: ThankYouModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="relative grid min-h-[300px] place-content-center overflow-hidden text-black"
        style={{
          backgroundImage: `url(${ApplyBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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

        <div className="p-6 text-center md:p-8">
          <h2 className="mb-4 text-xl leading-none font-bold md:text-2xl">
            {title}
          </h2>
          <p className="mb-6 text-sm md:text-base">{message}</p>
        </div>
      </div>
    </Modal>
  );
}
