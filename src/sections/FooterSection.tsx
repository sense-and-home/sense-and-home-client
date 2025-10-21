export function FooterSection() {
  return (
    <div className="bg-background text-foreground px-8 py-8">
      <div className="mb-8 flex gap-16">
        <a
          href="#"
          className="justify-self-center font-[Abhaya_Libre] text-[50px] leading-[1] font-extrabold hover:underline"
        >
          S&H
        </a>

        <ul className="text-xl leading-relaxed">
          <li>
            <a className="hover:underline" href="#">
              Главная
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#">
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

        <ul className="text-xl leading-relaxed">
          <li>
            <a className="hover:underline" href="#">
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

      <div className="mb-12">
        <h2 className="heading">Мы открыты к сотрудничеству</h2>
        <p className="mb-4 text-xl">
          Оставьте почту и мы свяжемся с Вами в течении дня!
        </p>

        <div className="flex items-center justify-between text-xl">
          <form action="#">
            <input
              className="bg-foreground rounded-primary inline-block min-w-md px-8 py-3 text-black"
              type="email"
              placeholder="----------@mail.ru"
            />
            <button
              type="submit"
              className="bg-foreground rounded-primary px-8 py-3 font-bold text-black hover:cursor-pointer"
            >
              Отправить
            </button>
          </form>

          <ul>
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
                ООО “Sense&Home”
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">SenseHome, 2025</div>
    </div>
  );
}
