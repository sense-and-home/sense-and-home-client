import DownArrowIcon from "@/assets/icons/down-arrow.svg";
import HeroBackground from "@/assets/img/hero-background.webp";
import HeroLogo from "@/assets/img/hero-logo.webp";
import { CustomMarquee } from "@/components/CustomMarquee";
import { isExternalLink, siteLinks } from "@/constants/siteLinks";
import { useState } from "react";

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="text-surface-1-foreground relative grid min-h-screen overflow-hidden bg-cover bg-[center_55%] lg:block"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${HeroBackground})`,
      }}
    >
      <div className="hidden grid-cols-3 items-start px-8 py-4 lg:grid">
        <ul className="text-xl leading-normal">
          {siteLinks.nav.map((link) => (
            <li key={link.name}>
              <a
                target={isExternalLink(link.href) ? "_blank" : undefined}
                rel={
                  isExternalLink(link.href) ? "noopener noreferrer" : undefined
                }
                className={`hover:underline ${!link.active ? "opacity-40" : ""}`}
                href={link.href}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={siteLinks.logo.href}
          className="justify-self-center font-[Abhaya_Libre] text-[50px] leading-[1] font-extrabold hover:underline"
        >
          {siteLinks.logo.text}
        </a>

        <div className="rounded-primary flex justify-center justify-self-end bg-white/5 text-xl font-semibold">
          {siteLinks.auth.map((authLink, index) => (
            <a
              target={isExternalLink(authLink.href) ? "_blank" : undefined}
              rel={
                isExternalLink(authLink.href)
                  ? "noopener noreferrer"
                  : undefined
              }
              key={authLink.name}
              className={`rounded-[inherit] px-10 py-3 hover:underline ${
                index === 0 ? "bg-accent-1/50" : ""
              }`}
              href={authLink.href}
            >
              {authLink.name}
            </a>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-between place-self-start px-4 py-4 lg:hidden">
        <a
          href={siteLinks.logo.href}
          className="font-[Abhaya_Libre] text-3xl font-extrabold hover:underline"
        >
          {siteLinks.logo.text}
        </a>

        <button
          onClick={toggleMenu}
          className="flex h-8 w-8 flex-col items-center justify-center space-y-1"
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/80 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleMenu}
      >
        <div
          className="bg-surface-1/95 absolute top-0 right-0 h-full w-80 px-4 py-6 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={toggleMenu}
            className="ml-auto flex h-8 w-8 flex-col items-center justify-center space-y-1"
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-6 translate-y-1.5 rotate-45 bg-white" />
            <span className="invisible block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 -translate-y-1.5 -rotate-45 bg-white" />
          </button>
          <div className="mt-16 flex flex-col space-y-6">
            {siteLinks.nav.map((link) => (
              <a
                key={link.name}
                target={isExternalLink(link.href) ? "_blank" : undefined}
                rel={
                  isExternalLink(link.href) ? "noopener noreferrer" : undefined
                }
                className={`text-xl hover:underline ${!link.active ? "opacity-40" : ""}`}
                href={link.href}
                onClick={toggleMenu}
              >
                {link.name}
              </a>
            ))}

            <div className="border-t border-white/20 pt-6">
              <div className="flex flex-col space-y-3">
                {siteLinks.auth.map((authLink, index) => (
                  <a
                    key={authLink.name}
                    target={
                      isExternalLink(authLink.href) ? "_blank" : undefined
                    }
                    rel={
                      isExternalLink(authLink.href)
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`rounded-primary px-6 py-3 text-center text-lg font-semibold hover:underline ${
                      index === 0 ? "bg-accent-1/50" : "border border-white/20"
                    }`}
                    href={authLink.href}
                    onClick={toggleMenu}
                  >
                    {authLink.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[650px] flex-col items-center justify-between px-2 pt-8 md:px-4 md:pt-0 lg:flex-row lg:px-8">
        <div className="mb-8 max-w-5xl text-center leading-tight lg:mb-0 lg:text-left">
          <h1 className="heading mb-6 text-4xl font-extrabold md:mb-10 md:text-5xl lg:text-6xl">
            VR\AR технологии для строительства и архитектуры
          </h1>

          <p className="mx-auto mb-12 max-w-4xl text-xl md:mb-20 md:text-2xl lg:mx-0 lg:text-3xl">
            Создаем VR\AR решения для застройщиков России, увеличивая конверсию
            продаж
          </p>

          <a
            href={siteLinks.hero.downArrow.href}
            className="mx-auto inline-flex items-center justify-center gap-4 hover:underline md:mx-0 lg:justify-start"
          >
            <img
              className="aspect-square w-12 md:w-[60px]"
              src={DownArrowIcon}
              alt=""
            />

            <p className="text-xl font-bold italic md:text-xl">Этапы работ</p>
          </a>
        </div>

        <div className="hidden min-w-[300px] pl-8 lg:block">
          <img src={HeroLogo} alt="" className="h-auto max-w-full" />
        </div>
      </div>

      <CustomMarquee className="absolute! bottom-0" />
    </div>
  );
}
