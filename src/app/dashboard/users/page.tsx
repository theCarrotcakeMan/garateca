"use client"

import { useState, setState, useEffect } from "react";
import type { NextApiResponse } from 'next';
import Image from 'next/image';

import { Button, KIND } from 'baseui/button';
import { StatefulDataTable } from 'baseui/data-table';
import { Navigation } from "baseui/side-navigation";
import { getUsers } from './utils/actions';


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
      <div className="flex flex-row" >
        <nav className="w-1/4 h-screen bg-mustard drop-shadow-sm">
          <header className="m-auto p-6">
          <a href="#">
            <Image
              src="/logo_tg.png"
              width={1030}
              height={300}
              className="block w-full"
              alt="Tierra Garat"
            />
          </a>
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
  )
}

export default UsersPage;
