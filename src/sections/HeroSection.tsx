import DownArrowIcon from "@/assets/icons/down-arrow.svg";
import HeroBackground from "@/assets/img/hero-background.webp";
import HeroLogo from "@/assets/img/hero-logo.webp";
import Marquee from "react-fast-marquee";

const marqueeWords = [
  "User experience",
  "AI solutions",
  "VR\\AR tech",
  "Innovation lab",
  "AR filter",
  "LIDAR tech",
  "3D design",
  "Sell improvement",
  "AI clues",
];

export function HeroSection() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-position-[0_55%] text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${HeroBackground})`,
      }}
    >
      <div className="grid grid-cols-3 items-start px-4 py-4">
        <ul className="text-xl leading-normal">
          <li>
            <a className="hover:underline" href="#">
              Главная
            </a>
          </li>
          <li>
            <a className="opacity-40 hover:underline" href="#">
              Личный кабинет
            </a>
          </li>
          <li>
            <a className="opacity-40 hover:underline" href="#">
              Технология
            </a>
          </li>
          <li>
            <a className="opacity-40 hover:underline" href="#">
              Контакты
            </a>
          </li>
          <li>
            <a className="opacity-40 hover:underline" href="#">
              Служба поддержки
            </a>
          </li>
        </ul>

        <a
          href="#"
          className="justify-self-center font-[Abhaya_Libre] text-[50px] leading-[1] font-extrabold hover:underline"
        >
          S&H
        </a>

        <div className="rounded-primary flex justify-center justify-self-end bg-white/5 text-xl font-semibold">
          <a
            className="bg-accent/50 rounded-[inherit] px-10 py-3 hover:underline"
            href="#"
          >
            Регистрация
          </a>
          <a className="rounded-[inherit] px-10 py-3 hover:underline" href="#">
            Вход
          </a>
        </div>
      </div>
      <div className="flex items-center justify-around px-4">
        <div className="max-w-5xl leading-tight">
          <h1 className="heading mb-10 font-extrabold">
            VR\AR технологии для строительства и архитектуры
          </h1>

          <p className="mb-20 max-w-4xl text-3xl">
            Создаем VR\AR решения для застройщиков России, увеличивая конверсию
            продаж
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-4 hover:underline"
          >
            <img
              className="aspect-square w-[60px]"
              src={DownArrowIcon}
              alt=""
            />

            <p className="text-xl font-bold italic">Этапы работ</p>
          </a>
        </div>

        <img src={HeroLogo} alt="" />
      </div>

      <Marquee
        pauseOnHover
        className="absolute! bottom-0 overflow-y-hidden bg-black py-4"
      >
        {marqueeWords.map((word) => (
          <span key={word} className="mx-4 text-4xl">
            {word}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
