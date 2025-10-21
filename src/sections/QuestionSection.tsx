import { Accordion, type AccordionItem } from "@/components/Accordion";

const items: AccordionItem[] = [
  {
    id: 1,
    title: "Какой конкретный рост продаж я могу ожидать?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non quidem aperiam quos facilis sapiente minus possimus delectus fugiat voluptates perferendis placeat culpa, repellendus eveniet debitis quasi earum sunt quam?",
  },
  {
    id: 2,
    title:
      'Вы помогаете конвертировать "холодных" лидов или работаете с "горячими"?',
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non quidem aperiam quos facilis sapiente minus possimus delectus fugiat voluptates perferendis placeat culpa, repellendus eveniet debitis quasi earum sunt quam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non quidem aperiam quos facilis sapiente minus possimus delectus fugiat voluptates perferendis placeat culpa, repellendus eveniet debitis quasi earum sunt quam?",
  },
  {
    id: 3,
    title:
      'Как происходит процесс "примерки"? Может ли клиент сохранить свою конфигурацию',
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non quidem aperiam quos facilis sapiente minus possimus delectus fugiat voluptates perferendis placeat culpa, repellendus eveniet debitis quasi earum sunt quam?",
  },
  {
    id: 4,
    title: "Какой каталог мебели и отделки у вас есть?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non quidem aperiam quos facilis sapiente minus possimus delectus fugiat voluptates perferendis placeat culpa, repellendus eveniet debitis quasi earum sunt quam?",
  },
  {
    id: 5,
    title: "Кто обучает наших менеджеров работе с системой?",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non quidem aperiam quos facilis sapiente minus possimus delectus fugiat voluptates perferendis placeat culpa, repellendus eveniet debitis quasi earum sunt quam?",
  },
];

export function QuestionSection() {
  return (
    <div className="bg-background text-foreground px-8 py-8">
      <h2 className="heading mb-8">Вопрос & Ответ</h2>

      <Accordion items={items} />
    </div>
  );
}
