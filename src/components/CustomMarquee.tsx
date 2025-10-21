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

interface CustomMarqueeProps {
  className?: string;
}

export function CustomMarquee({ className }: CustomMarqueeProps) {
  return (
    <Marquee
      pauseOnHover
      className={`${className} overflow-y-hidden bg-black py-2 md:py-4`}
    >
      {marqueeWords.map((word) => (
        <span key={word} className="mx-2 text-2xl md:mx-4 md:text-4xl">
          {word}
        </span>
      ))}
    </Marquee>
  );
}
