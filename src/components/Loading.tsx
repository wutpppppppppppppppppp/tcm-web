import Image from "next/image";
import logo from "@/public/solid.webp";

const Loading = ({ height }: { height?: string }) => (
  <div className={`flex justify-center items-center w-screen bg-white absolute z-0 ${height}`}>
    <Image
      src={logo}
      alt="Loading..."
      width={100}
      height={100}
      className="animate-blink"
    />
  </div>
);

export default Loading;
