"use client"

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';

const engine = new Styletron();

const Page = () => {

  setTimeout( () => {
    window.location.replace(`login/`)
  }, 200);
  
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
          <section id="container" class="container m-auto min-h-screen">
            <div class="flex justify-center min-h-fit items-center py-20">

              <header class="w-3/5 m-auto">
                <img src="logo_tg.png" class="block w-full" alt="Tierra Garat"/>
              </header>

            </div>
          </section>

      </BaseProvider>
    </StyletronProvider>
  );
}

export default Page;
