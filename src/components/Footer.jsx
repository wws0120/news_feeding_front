import Image from 'next/image';

import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsLinkedin,
  BsGithub,
} from 'react-icons/bs';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="w-full py-10 bg-bgColor text-white/80 px-4">
      <div className="max-w-[1480px]  mx-auto flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
          <div className='flex justify-center items-center'>
            <Image src='/images/logo.webp' width={48} height={48} alt="logo" />
            <span className='text-2xl text-white font-extrabold ml-2.5'><span className='text-amber-300'>Snap</span>News</span>
          </div>
          
          <p className="flex items-center text-sm gap-1">
            
          &#169; This website is for educational purposes only. All articles and materials are sourced from HK01 and Sing Tao, with all copyrights belonging to HK01 and Sing Tao.
          </p>
        

        <div className="flex gap-6">
          <BsYoutube className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsFacebook className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsGithub className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsLinkedin className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsTwitter className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
