export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  specialization: (title: string): boolean => {
    return title.length >= 2 && title.length <= 256;
  },

  company: (name: string): boolean => {
    return name.length >= 2 && name.length <= 256;
  },

  password: (password: string): boolean => {
    return password.length >= 8;
  },
};
