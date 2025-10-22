import { ThankYouModal } from "@/components/ThankYouModal";
import { useState } from "react";

export function FooterSection() {
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsThankYouModalOpen(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-background text-foreground px-2 py-8 md:px-4 lg:px-8">
      <div className="mb-8 flex flex-col gap-8 md:flex-row md:gap-16">
        <a
          href="#"
          className="justify-self-center font-[Abhaya_Libre] text-4xl leading-[1] font-extrabold hover:underline md:text-[50px]"
        >
          S&H
        </a>

        <ul className="space-y-2 text-lg leading-relaxed md:text-xl">
          <li>
            <a className="hover:underline" href="/">
              Главная
            </a>
          </li>
          <li>
            <a className="hover:underline" href="/#technology-section">
              Технология
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#">
              Контакты
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#">
              Служба поддержки
            </a>
          </li>
        </ul>

        <ul className="space-y-2 text-lg leading-relaxed md:text-xl">
          <li>
            <a className="hover:underline" href="/dashboard">
              Личный кабинет
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#">
              Новости
            </a>
          </li>
        </ul>
      </div>

      <div id="footer-section" className="mb-8 md:mb-12">
        <h2 className="heading mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
          Мы открыты к сотрудничеству
        </h2>
        <p className="mb-6 text-lg md:mb-4 md:text-xl">
          Оставьте почту и мы свяжемся с Вами в течении дня!
        </p>

        <div className="flex flex-col items-start justify-between gap-6 text-lg md:text-xl lg:flex-row lg:items-center lg:gap-0">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0 lg:w-auto"
          >
            <input
              className="bg-foreground rounded-primary inline-block w-full px-6 py-3 text-base text-black sm:w-auto sm:min-w-md md:px-8 md:text-lg"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="----------@mail.ru"
              required
            />
            <button
              type="submit"
              className="bg-foreground rounded-primary px-6 py-3 text-base font-bold whitespace-nowrap text-black hover:cursor-pointer md:px-8 md:text-lg"
            >
              Отправить
            </button>
          </form>

          <ul className="space-y-2 text-sm md:text-base lg:text-lg xl:text-xl">
            <li>
              <a className="underline" href="#">
                Договор оферты
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#">
                ИНН 1234567890234567
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#">
                ООО "Sense&Home"
              </a>
            </li>
          </ul>
        </div>
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
