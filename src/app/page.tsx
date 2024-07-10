"use client"

import { React } from 'react';
import { redirect } from 'next/navigation'
import { useEffect } from 'react';
import Image from 'next/image'

const Page = () => {

  const handleLogout = () => {
    // This breaks the build
    if (typeof window !== 'undefined') {
      // console.log("FORCED ACTION: ___Clearing session___");
      // const dispatched = useAppDispatch(clearSession());
      // const dispatched2 = useAppDispatch(remove());
      // console.log("HelloDispatchedMessage _ ", dispatched, dispatched2);
    }
  }

  useEffect(() => {
     redirect('/login');
  }, []);

  return (
          <section id="container" className="container m-auto min-h-screen">
            <div className="flex justify-center min-h-fit items-center py-20">

              <header className="w-3/5 m-auto">
                <Image
                  src="/logo_tg.png"
                  width={1030}
                  height={300}
                  className="block w-full"
                  alt="Tierra Garat"
                  />
                <ul className="">
                  <li>Mi avance</li>
                </ul>
              </header>

            </div>
          </section>
  );
}

export default Page;
