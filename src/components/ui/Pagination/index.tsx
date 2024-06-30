'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { generatePaginationNumbers } from '@/utils';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1;
  const isNan = isNaN(+pageString);

  let currentPath = isNan ? 1 : +pageString;

  // Si se usa ?page=abd -> null
  if ( currentPath < 1 || isNan ) {
    redirect( pathName );
  }

  const allPages = generatePaginationNumbers( currentPath, totalPages );
  console.log("🚀 ~ Pagination ~ allPages:", allPages);

  const paginationByUrl = ( pageNumber: string | number ) => {
    const params = new URLSearchParams(searchParams );

    if ( pageNumber === '...' ) {
      console.log("🚀 ~ paginationByUrl ~ pageNumber:", `${pathName}?${params.toString()}`);
      return `${pathName}?${params.toString()}`;
    }

    //! + -> vuelve un string a number
    if ( +pageNumber <= 0 ) {
      console.log("🚀 ~ paginationByUrl ~ pageNumber:", `${pathName}`)
      return `${pathName}`; // * -> href='/'
    }

    if ( +pageNumber > totalPages ) {
      console.log("🚀 ~ caso pagenumber > totalPages ", `${pathName}?${params.toString}` )
      return `${pathName}?${params.toString}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  }

  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item disabled">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={ paginationByUrl( currentPath - 1 ) }>
                <IoChevronBackOutline size={30}/>
            </Link>
          </li>

          {
            allPages.map( (page, idx) => (
              <li className="page-item" key={idx}>
                <Link
                  className={
                    clsx(
                      "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                      {
                        "bg-blue-700 text-white shadow-sm hover:text-white hover:bg-blue-500": page === currentPath
                      }
                    )
                  }
                  href={ paginationByUrl( page ) }>
                  { page }
                </Link>
              </li>
            ))
          }

          <li className="page-item">
            <Link
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={ paginationByUrl( currentPath + 1 ) }>
              <IoChevronForwardOutline size={30}/>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
};
