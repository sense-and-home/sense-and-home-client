export const isExternalLink = (href: string) => {
  return href.startsWith("http://") || href.startsWith("https://");
};

export const siteLinks = {
  logo: {
    text: "S&H",
    href: "#",
  },
  nav: [
    { name: "Главная", href: "/", active: true },
    { name: "Личный кабинет", href: "/dashboard", active: false },
    { name: "Технология", href: "#technology-section", active: false },
    {
      name: "Контакты",
      href: "https://t.me/sense_home_cooperation",
      active: false,
    },
    {
      name: "Служба поддержки",
      href: "https://t.me/Sense_home_support",
      active: false,
    },
  ],
  auth: [
    { name: "Регистрация", href: "/registration" },
    { name: "Вход", href: "/login" },
  ],
  hero: {
    downArrow: { href: "#steps-section" },
  },
  footer: {
    main: [
      { name: "Главная", href: "/" },
      { name: "Технология", href: "/#technology-section" },
      { name: "Контакты", href: "https://t.me/sense_home_cooperation" },
      { name: "Служба поддержки", href: "https://t.me/Sense_home_support" },
    ],
    account: [
      { name: "Личный кабинет", href: "/dashboard" },
      { name: "Новости", href: "#" },
    ],
    legal: [
      { name: "Договор оферты", href: "#" },
      { name: "ИНН 1234567890234567", href: "#" },
      { name: 'ООО "Sense&Home"', href: "#" },
    ],
  },
};
