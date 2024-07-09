"use client"

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import dynamic from 'next/dynamic';

const Image = dynamic(() => import('next/image'), { ssr: false });

const engine = new Styletron();

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
    // Client-side only code
  }, []);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>

          <section id="container" className="container m-auto min-h-screen">
            <div className="flex justify-center min-h-fit items-center py-20">

              <header className="w-3/5 m-auto">
                <Image
                  src="logo_tg.png"
                  className="block w-full"
                  alt="Tierra Garat"
                  />
                <ul className="">
                  <li>Mi avance</li>
                  <li onClick={ handleLogout } >Logout</li>
                </ul>
              </header>

            </div>
          </section>

      </BaseProvider>
    </StyletronProvider>
  );
}

export default Page;
