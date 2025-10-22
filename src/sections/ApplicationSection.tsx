import ApplicationBackground from "@/assets/img/application-background.webp";
import { CallRequestModal } from "@/components/CallRequestModal";
import { ThankYouModal } from "@/components/ThankYouModal";
import { useState } from "react";

type TMode = "consultation" | "ready";

export function ApplicationSection() {
  const [mode, setMode] = useState<TMode>("consultation");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    file: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim()) {
      setIsThankYouModalOpen(true);
      setFormData({ name: "", phone: "", email: "", file: null });
    }
  };

  return (
    <div className="bg-background px-4 py-8 md:px-8" id="application-section">
      <div
        className="rounded-secondary grid min-h-[500px] grid-cols-1 place-content-center gap-6 bg-cover bg-bottom px-4 py-8 md:px-8 lg:grid-cols-2 lg:gap-4"
        style={{
          backgroundImage: `url(${ApplicationBackground})`,
        }}
      >
        <div className="order-2 flex h-full flex-col justify-between text-lg md:text-xl lg:order-1">
          <div>
            <h3 className="mb-4 text-2xl font-extrabold md:text-3xl lg:text-4xl">
              Свяжитесь с нами для старта работ или персональной консультации!
            </h3>

            <div className="mb-4 text-3xl leading-none font-extrabold md:text-4xl lg:text-5xl">
              ,,
            </div>

            <p className="mb-4">
              Sense&Home — проверенный партнер в инновациях и повышении
              конверсии продаж среди застройщиков.
            </p>

            <p>
              Для вашего удобства оставить заявку вы можете как с запросом на
              бесплатную консультацию, так и с возможностью обсуждения уже
              конкретных деталей.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCallModalOpen(true)}
            className="rounded-primary mt-6 inline-block w-full bg-black px-6 py-3 text-lg font-bold text-white hover:cursor-pointer md:px-10 md:text-xl lg:mt-10 lg:w-fit"
          >
            Запросить звонок
          </button>
        </div>

        <div className="order-1 lg:order-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-secondary flex h-full flex-col gap-3 bg-white/10 p-4 text-lg backdrop-blur-2xl md:p-6 md:text-xl"
          >
            <div className="rounded-primary flex bg-black/20 p-[2px] text-sm font-bold md:text-lg lg:text-xl">
              <button
                type="button"
                className={`${mode == "consultation" ? "bg-accent/70" : ""} w-1/2 rounded-[inherit] px-4 py-2 transition-colors hover:cursor-pointer md:px-6 md:py-3 lg:px-10`}
                onClick={() => setMode("consultation")}
              >
                Мне нужна консультация
              </button>

              <button
                type="button"
                className={`${mode == "ready" ? "bg-accent/70" : ""} w-1/2 rounded-[inherit] px-4 py-2 transition-colors hover:cursor-pointer md:px-6 md:py-3 lg:px-10`}
                onClick={() => setMode("ready")}
              >
                Я готов к 1 этапу
              </button>
            </div>

            <input
              className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Имя Фамилия"
              required
            />

            <input
              className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+7 (---) --- -- --"
            />

            <input
              className="bg-foreground rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="----------@mail.ru"
              required
            />

            <label
              htmlFor="customFileInput"
              className={`${mode === "consultation" ? "invisible opacity-0" : "opacity-100"} bg-foreground rounded-primary inline-flex w-full items-center justify-between px-4 py-3 text-base text-black/50 transition-opacity hover:cursor-pointer md:px-8 md:text-lg`}
            >
              <span className="truncate">Прикрепите информацию о проекте</span>

              <svg
                width="21"
                height="25"
                viewBox="0 0 23 27"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M7.7002 5.6998L11.6002 1.7998M11.6002 1.7998L15.5002 5.6998M11.6002 1.7998V14.7998M5.10049 10.8998C3.88905 10.8998 3.28332 10.8998 2.80552 11.0977C2.16844 11.3616 1.66199 11.8681 1.39811 12.5051C1.2002 12.9829 1.2002 13.5884 1.2002 14.7998V21.0398C1.2002 22.4959 1.2002 23.2235 1.48358 23.7797C1.73285 24.2689 2.13031 24.6674 2.61953 24.9167C3.17516 25.1998 3.90289 25.1998 5.35618 25.1998H17.8448C19.2981 25.1998 20.0248 25.1998 20.5804 24.9167C21.0697 24.6674 21.4678 24.2689 21.7171 23.7797C22.0002 23.224 22.0002 22.4971 22.0002 21.0438V14.7998C22.0002 13.5884 22.0001 12.9829 21.8021 12.5051C21.5383 11.8681 21.0322 11.3616 20.3952 11.0977C19.9174 10.8998 19.3116 10.8998 18.1002 10.8998"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>

            <input
              type="file"
              id="customFileInput"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              type="submit"
              className="rounded-primary bg-black px-6 py-3 text-base font-bold text-white hover:cursor-pointer md:px-8 md:text-lg"
            >
              Оставить заявку
            </button>
          </form>
        </div>
      </div>

      <CallRequestModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onSuccess={() => setIsThankYouModalOpen(true)}
      />

      <ThankYouModal
        isOpen={isThankYouModalOpen}
        onClose={() => setIsThankYouModalOpen(false)}
        message="Мы свяжемся с Вами в течении часа"
      />
    </div>
  );
}
