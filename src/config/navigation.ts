export type LinkKind = "internal" | "anchor" | "external";
export type LinkDef = {
  name: string;
  href: string;
  kind?: LinkKind;
  id?: string;
};

export const logoLink: LinkDef = { id: "logo", name: "S&H", href: "/" };

export const navLinks: LinkDef[] = [
  { id: "home", name: "Главная", href: "/", kind: "internal" },
  {
    id: "dashboard",
    name: "Личный кабинет",
    href: "/dashboard",
    kind: "internal",
  },
  {
    id: "technology",
    name: "Технология",
    href: "#technology-section",
    kind: "anchor",
  },
  {
    id: "contacts",
    name: "Контакты",
    href: "https://t.me/sense_home_cooperation",
    kind: "external",
  },
  {
    id: "support",
    name: "Служба поддержки",
    href: "https://t.me/Sense_home_support",
    kind: "external",
  },
];

export const authLinks: LinkDef[] = [
  {
    id: "register",
    name: "Регистрация",
    href: "/registration",
    kind: "internal",
  },
  { id: "login", name: "Вход", href: "/login", kind: "internal" },
];

export const heroLink = {
  id: "hero-down",
  name: "Этапы работ",
  href: "#steps-section",
  kind: "anchor",
};

export const footerMain: LinkDef[] = [
  { id: "home", name: "Главная", href: "/" },
  { id: "technology-anchor", name: "Технология", href: "/#technology-section" },
  {
    id: "contacts",
    name: "Контакты",
    href: "https://t.me/sense_home_cooperation",
  },
  {
    id: "support",
    name: "Служба поддержки",
    href: "https://t.me/Sense_home_support",
  },
];

export const footerAccount: LinkDef[] = [
  { id: "dashboard", name: "Личный кабинет", href: "/dashboard" },
];

export const footerLegal: LinkDef[] = [
  { id: "terms", name: "Договор оферты", href: "/terms" },
  { id: "inn", name: "ИНН 751202967940", href: "/legal" },
  { id: "company", name: 'ООО "Sense&Home"', href: "/legal" },
];

export const allLinks = [
  logoLink,
  ...navLinks,
  ...authLinks,
  heroLink,
  ...footerMain,
  ...footerAccount,
  ...footerLegal,
];
