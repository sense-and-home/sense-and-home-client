import HeroBackground from "@/assets/img/hero-background.webp";
import Tech1 from "@/assets/img/tech-1.webp";
import Tech2 from "@/assets/img/tech-2.webp";

function App() {
  return (
    <div className="m-auto w-5xl">
      <div className="flex items-center gap-4 p-4">
        <h1 className="text-3xl font-bold">Heading</h1>
        <div className="rounded-primary h-[150px] w-[300px] bg-red-500"></div>
        <div className="rounded-secondary h-[150px] w-[300px] bg-green-500"></div>
        <div className="bg-accent rounded-primary h-[150px] w-[300px]"></div>
      </div>

      <div className="flex flex-col gap-2 leading-[1.5]">
        <p className="border-b pb-2 font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima at
          cupiditate, recusandae consectetur illo non molestias amet ducimus
          perspiciatis totam. Suscipit magni eum atque commodi aut neque ratione
          quis provident!
        </p>

        <p className="border-b pb-2 font-[Abhaya_Libre] text-lg font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima at
          cupiditate, recusandae consectetur illo non molestias amet ducimus
          perspiciatis totam. Suscipit magni eum atque commodi aut neque ratione
          quis provident!
        </p>

        <p className="border-b pb-2 font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima at
          cupiditate, recusandae consectetur illo non molestias amet ducimus
          perspiciatis totam. Suscipit magni eum atque commodi aut neque ratione
          quis provident!
        </p>
      </div>

      <div className="my-2 rounded-sm border p-4">
        <img
          className="rounded-sm"
          src={HeroBackground}
          alt="hero background"
        />
        <div className="flex items-end justify-center gap-2">
          <div>
            <img src={Tech1} alt="tech" />
          </div>

          <div>
            <img src={Tech2} alt="tech" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
