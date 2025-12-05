import { requestConsultation } from "@/api/bookingApi";
import ApplicationBackground from "@/assets/img/application-background.webp";
import { Button } from "@/components/ui/Button";
import { CallRequestModal } from "@/pages/Landing/components/CallRequestModal";
import { ThankYouModal } from "@/pages/Landing/components/ThankYouModal";
import { formatPhoneNumber } from "@/utils";
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
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    file: "",
    general: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    setErrors((prev) => ({ ...prev, file: "" }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validateForm = () => {
    let hasError = false;
    const newErrors = { name: "", phone: "", email: "", file: "", general: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, введите своё имя.";
      hasError = true;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 11 || !phoneDigits.startsWith("7")) {
      newErrors.phone =
        "Неверный формат номера телефона. Должен быть в формате +7 (XXX) XXX-XX-XX (российский номер).";
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Неверный формат email адреса.";
      hasError = true;
    }

    if (mode === "ready" && !formData.file) {
      newErrors.file =
        "Пожалуйста, прикрепите информацию о проекте для этого режима.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiFormData = new FormData();
      console.log("Selected file:", formData.file);
      apiFormData.append("full_name", formData.name.trim());
      apiFormData.append("email", formData.email.trim());
      let phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.startsWith("8")) {
        phoneDigits = "7" + phoneDigits.slice(1);
      }
      const cleanPhone = `+${phoneDigits}`;
      apiFormData.append("phone", cleanPhone);
      apiFormData.append(
        "consultation_type",
        mode === "consultation" ? "consult_without_details" : "consult_details",
      );
      if (formData.file) {
        apiFormData.append("project_details", formData.file);
      }
      await requestConsultation(apiFormData);
      setIsThankYouModalOpen(true);
      setFormData({ name: "", phone: "", email: "", file: null });
    } catch (error: any) {
      console.error("Consultation request error:", error);
      setErrors((prev) => ({
        ...prev,
        general:
          error.message || "Произошла ошибка. Пожалуйста, попробуйте снова.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-surface-1 px-2 py-8 md:px-4 lg:px-8"
      id="application-section"
    >
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
          <Button
            shape="round"
            type="button"
            onClick={() => setIsCallModalOpen(true)}
            className="text-surface-1-foreground mt-6 inline-block w-full bg-black px-6 py-3 text-lg font-bold hover:cursor-pointer md:px-10 md:text-xl lg:mt-10 lg:w-fit"
          >
            Запросить звонок
          </Button>
        </div>
        <div className="order-1 lg:order-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-secondary flex h-full flex-col gap-3 bg-white/10 p-4 text-lg backdrop-blur-2xl md:p-6 md:text-xl"
          >
            <div className="rounded-primary flex bg-black/20 p-[2px] text-sm font-bold md:text-lg lg:text-xl">
              <button
                type="button"
                className={`${mode == "consultation" ? "bg-accent-1/70" : ""} w-1/2 rounded-[inherit] px-4 py-2 transition-colors hover:cursor-pointer md:px-6 md:py-3 lg:px-10`}
                onClick={() => setMode("consultation")}
              >
                Мне нужна консультация
              </button>
              <button
                type="button"
                className={`${mode == "ready" ? "bg-accent-1/70" : ""} w-1/2 rounded-[inherit] px-4 py-2 transition-colors hover:cursor-pointer md:px-6 md:py-3 lg:px-10`}
                onClick={() => setMode("ready")}
              >
                Я готов к 1 этапу
              </button>
            </div>
            <div>
              <input
                className={`bg-surface-2 rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg ${errors.name ? "border-2 border-red-500" : ""}`}
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Имя Фамилия"
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                className={`bg-surface-2 rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg ${errors.phone ? "border-2 border-red-500" : ""}`}
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+7 (---) --- -- --"
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            <div>
              <input
                className={`bg-surface-2 rounded-primary inline-block w-full px-4 py-3 text-base text-black md:px-8 md:text-lg ${errors.email ? "border-2 border-red-500" : ""}`}
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="----------@mail.ru"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="min-h-[56px]">
              {mode === "ready" && (
                <div>
                  <label
                    htmlFor="customFileInput"
                    className={`bg-surface-2 rounded-primary inline-flex w-full items-center justify-between px-4 py-3 text-base text-black/50 hover:cursor-pointer md:px-8 md:text-lg ${errors.file ? "border-2 border-red-500" : ""}`}
                  >
                    <span className="truncate">
                      {formData.file
                        ? formData.file.name
                        : "Прикрепите информацию о проекте"}
                    </span>
                    <div className="flex items-center gap-2">
                      {formData.file && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData((prev) => ({ ...prev, file: null }));
                            setErrors((prev) => ({ ...prev, file: "" }));
                            const fileInput = document.getElementById(
                              "customFileInput",
                            ) as HTMLInputElement;
                            if (fileInput) fileInput.value = "";
                          }}
                          className="text-red-500 transition-colors hover:cursor-pointer hover:text-red-700"
                        >
                          <svg
                            width="28"
                            height="28"
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
                      )}
                      <svg
                        width="21"
                        height="25"
                        viewBox="0 0 23 27"
                        fill="none"
                      >
                        <path
                          d="M7.7002 5.6998L11.6002 1.7998M11.6002 1.7998L15.5002 5.6998M11.6002 1.7998V14.7998M5.10049 10.8998C3.88905 10.8998 3.28332 10.8998 2.80552 11.0977C2.16844 11.3616 1.66199 11.8681 1.39811 12.5051C1.2002 12.9829 1.2002 13.5884 1.2002 14.7998V21.0398C1.2002 22.4959 1.2002 23.2235 1.48358 23.7797C1.73285 24.2689 2.13031 24.6674 2.61953 24.9167C3.17516 25.1998 3.90289 25.1998 5.35618 25.1998H17.8448C19.2981 25.1998 20.0248 25.1998 20.5804 24.9167C21.0697 24.6674 21.4678 24.2689 21.7171 23.7797C22.0002 23.224 22.0002 22.4971 22.0002 21.0438V14.7998C22.0002 13.5884 22.0001 12.9829 21.8021 12.5051C21.5383 11.8681 21.0322 11.3616 20.3952 11.0977C19.9174 10.8998 19.3116 10.8998 18.1002 10.8998"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="customFileInput"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {errors.file && (
                    <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                  )}
                </div>
              )}
            </div>
            {errors.general && (
              <p className="text-sm text-red-600 md:text-base">
                {errors.general}
              </p>
            )}
            <Button
              shape="round"
              type="submit"
              disabled={isSubmitting}
              className="text-surface-1-foreground bg-black px-6 py-3 text-base font-bold disabled:bg-black/50 md:px-8 md:text-lg"
            >
              {isSubmitting ? "Отправка..." : "Оставить заявку"}
            </Button>
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
        message="Мы свяжемся с Вами в течение часа"
      />
    </div>
  );
}
