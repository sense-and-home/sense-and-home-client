import { requestEmail } from "@/api/bookingApi";
import { SmartLink } from "@/components/SmartLink";
import { ThankYouModal } from "@/components/ThankYouModal";
import { Button } from "@/components/ui/Button";
import {
  footerAccount,
  footerLegal,
  footerMain,
  logoLink,
} from "@/config/navigation";
import { useState } from "react";
import { Input } from "./ui/Input";
// import { useAuth } from "@/hooks/useAuth";

export function Footer() {
  // TODO handle footer links properly
  // const { user } = useAuth();
  // const isManager = user?.role === "manager";

  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Неверный формат email адреса.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await requestEmail({ email: trimmedEmail });
      setIsThankYouModalOpen(true);
      setEmail("");
    } catch (error: any) {
      console.error("Email request error:", error);

      const serverMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Произошла ошибка. Пожалуйста, попробуйте снова.";

      setErrorMessage(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerAccountLinks = [...footerAccount];
  // if (isManager) {
  footerAccountLinks.push(
    { id: "my-learning", name: "Моё обучение", href: "/my-learning" },
    { id: "courses", name: "Каталог", href: "/courses" },
  );
  // }

  return (
    <div className="bg-surface-1 text-surface-1-foreground px-2 py-8 md:px-4 lg:px-8">
      <div className="mb-8 flex flex-col gap-8 md:flex-row md:gap-16">
        <SmartLink
          to={logoLink.href}
          className="h-fit justify-self-center font-[Abhaya_Libre] text-4xl leading-[1] font-extrabold hover:underline md:text-[50px]"
        >
          {logoLink.name}
        </SmartLink>

        <ul className="space-y-2 text-lg leading-relaxed md:text-xl">
          {footerMain.map((link) => (
            <li key={link.id ?? link.name}>
              <SmartLink to={link.href} className="hover:underline">
                {link.name}
              </SmartLink>
            </li>
          ))}
        </ul>

        <ul className="space-y-2 text-lg leading-relaxed md:text-xl">
          {footerAccountLinks.map((link) => (
            <li key={link.id ?? link.name}>
              <SmartLink to={link.href} className="hover:underline">
                {link.name}
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>

      <div id="footer-section" className="mb-8 md:mb-12">
        <h2 className="heading mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
          Мы открыты к сотрудничеству
        </h2>
        <p className="mb-6 text-lg md:mb-4 md:text-xl">
          Оставьте почту и мы свяжемся с Вами в течение дня!
        </p>

        <div className="flex flex-col items-start justify-between gap-6 text-lg md:text-xl lg:flex-row lg:items-center lg:gap-0">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0 lg:w-auto"
          >
            <Input
              shape="round"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="----------@mail.ru"
              required
            />
            <Button
              shape="round"
              type="submit"
              disabled={isSubmitting}
              className="bg-surface-2 disabled:bg-surface-2/80 px-6 py-3 text-base font-bold whitespace-nowrap text-black hover:cursor-pointer md:px-8 md:text-lg"
            >
              Отправить
            </Button>
          </form>

          <ul className="space-y-2 text-sm md:text-base lg:text-lg xl:text-xl">
            {footerLegal.map((link) => (
              <li key={link.id ?? link.name}>
                <SmartLink to={link.href} className="hover:underline">
                  {link.name}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        {errorMessage && (
          <p className="mt-4 text-sm text-red-600 md:text-base">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="text-center">SenseHome, 2025</div>

      <ThankYouModal
        isOpen={isThankYouModalOpen}
        onClose={() => setIsThankYouModalOpen(false)}
        message="Мы свяжемся с Вами в ближайшем времени"
      />
    </div>
  );
}
