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


const UsersPage = () => {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [activeItemId, setActiveItemId] = useState(
    "#users"
  );

  useEffect( () => {
    getUsers(setData, setColumns);
  }, []);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>

        <div className="flex flex-row" >
          <nav className="w-1/4 h-screen bg-mustard drop-shadow-sm">
            <header className="m-auto p-6">
            <a href="#"><img src="/logo_tg.png" className="block w-52" alt="Tierra Garat"/></a>
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
                  setActiveItemId(item.itemId)
                }
              />
          </nav>
          <section id="container" className="container w-3/4">

            <div className="w-full min-h-screen flex p-8">

              <section className="flex-1">

                <h3 className="pb-4">Administración de usuarios</h3>
                <StatefulDataTable
                  columns={columns}
                  rows={data}
                  emptyMessage="No hay usuarios que coincidan con tu búsqueda"
                  />

              </section>
            </div>
          </section>
        </div>
      </BaseProvider>
    </StyletronProvider>
  )
}

export default UsersPage;
