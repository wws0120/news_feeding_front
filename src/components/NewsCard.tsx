import React from 'react';
import {getRelativeTime} from '../utils/utils'


function NewsCard({ news }) {

  const fallbackImage = "/images/newsimage.webp";
  return (
    <div className="col-span-12 sm:col-span-6  md:col-span-6 lg:col-span-6 xl:col-span-3 ">
      <div className="bg-gray-500/30 backdrop-blur-2xl backdrop-brightness-150   rounded-md w-full relative">
        <span className="focus:outline-none text-[12px] bg-orange-700/80 text-slate-200  rounded font-medium py-1 px-2 absolute z-2 top-1 start-1">
          {getRelativeTime(news.publishedAt)}
        </span>
        <a href={news.url}>
        <img
          src={news.image ? news.image : fallbackImage}
          alt=""
          className="max-w-full w-full h-full aspect-[16/9] object-cover rounded-md"
        /></a>
        <div className="flex-auto p-4">
          <a
            href={news.url}
            className="mb-3 block text-[20px] font-medium tracking-tight text-gray-200 hover:text-teal-500"
          >
            {news.title}
          </a>
          <span className='px-2 py-1 bg-secondaryColor text-white text-sm rounded-md'>
            {news.source}
          </span>
          <div className="block mt-4">
            <a
              href={news.url}
              className="block text-teal-500 hover:text-slate-300 font-semibold  focus:outline-none"
            >
              Read More{' '}
              <i
                data-lucide="arrow-right"
                className="self-center inline-block ms-1 h-4 w-4"
              />
            </a>
          </div>
        </div>
        {/*end card-body*/}
      </div>{' '}
      {/*end card*/}
    </div>
  );
}

export default NewsCard;
