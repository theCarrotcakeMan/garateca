"use client"

import { getUsers } from './utils/actions';
import { useState, setState, useEffect } from "react";
import type { NextApiResponse } from 'next';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { Button, KIND } from 'baseui/button';
import {  StatefulDataTable } from 'baseui/data-table';
import { Navigation } from "baseui/side-navigation";

const engine = new Styletron();


const DashboardHomePage = () => {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [activeItemId, setActiveItemId] = useState(
    "#dashboard"
  );

  useEffect( () => {

  }, []);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>

        <div class="flex flex-row" >
          <nav class="w-1/4 h-screen bg-mustard drop-shadow-sm">
            <header class="m-auto p-6">
            <a href="#"><img src="/logo_tg.png" class="block w-full" alt="Tierra Garat"/></a>
            </header>
              <Navigation
              items={[
                  {
                    title: "Panel",
                    itemId: "#dashboard",
                  },
                  {
                    title: "Usuarios",
                    itemId: "#users",
                    subNav: [
                      {
                        title: "Alumnos",
                        itemId: "#alumni",
                      },
                    ]
                  },
                  {
                    title: "Cursos",
                    itemId: "#courses",
                    subNav: [
                      {
                        title: "Nuevo curso",
                        itemId: "#new-course",
                      },
                    ]
                  }
                ]}
                activeItemId={activeItemId}
                onChange={({ item }) =>
                  window.location.replace('dashboard/users')
                }
              />
          </nav>
          <section id="container" class="container w-3/4">

            <div class="w-full min-h-screen flex flex-col justify-center items-center p-8">

              <section class="block m-auto h-96">

                <h3 class="pb-4">Portal del Administrador</h3>

              </section>
            </div>
          </section>
        </div>
      </BaseProvider>
    </StyletronProvider>
  )
}

export default DashboardHomePage;
