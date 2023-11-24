"use client"

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { useAppDispatch } from "src/redux/hooks";
import { remove } from 'src/redux/Features/Auth/currentUserSlice';
import { clearSession } from 'src/redux/Features/Auth/currentUserSlice';


const engine = new Styletron();

const handleLogout = () => {
  console.log("Clearing session");
  const dispatched = useAppDispatch(clearSession());
  const dispatched2 = useAppDispatch(remove());
  console.log("HelloDispatchedMessage", dispatched, dispatched2);
}

const Page = () => {

  setTimeout( () => {
    window.location.replace(`login/`);
  }, 200);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
          <section id="container" class="container m-auto min-h-screen">
            <div class="flex justify-center min-h-fit items-center py-20">

              <header class="w-3/5 m-auto">
                <img src="logo_tg.png" class="block w-full" alt="Tierra Garat"/>
                <ul className="">
                  <li>Mi avance</li>
                  <li onClick={handleLogout} >Logout</li>
                </ul>
              </header>

            </div>
          </section>

      </BaseProvider>
    </StyletronProvider>
  );
}

export default Page;
