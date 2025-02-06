import logo from '@/public/solid.webp';
import Image from 'next/image';

const Loading = ({ height }: { height?: string }) => (
  <div className={`absolute z-0 flex w-screen items-center justify-center bg-white ${height}`}>
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
