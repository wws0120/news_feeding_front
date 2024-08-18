import Image from 'next/image';
import Link from 'next/link';


const Header = () => {
  return (
    <div className="w-full h-20  top-0  z-50 p-1">
      <div className="border-t max-w-[1800px] border-gray-800 px-4 md-lg:pl-6 p-3 font-inter text-md w-full bg-gray-900 rounded-lg h-full  text-white mx-auto flex justify-center items-center">
        <Link href="/">
          <div className='flex justify-center items-center'>
            <Image
              width={42}
              height={42}
              src="/images/logo.webp"
              alt="logo"
            />
            <span className='text-2xl text-white font-extrabold ml-2.5'><span className='text-amber-300'>Snap</span>News</span>
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default Header;
