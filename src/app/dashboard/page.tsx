"use client"

import { useEffect, useState } from 'react';

import { redirect } from 'next/navigation'
import Image from 'next/image';
import { Button, KIND } from 'baseui/button';
import { Navigation } from 'baseui/side-navigation';

const DashboardHomePage = () => {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [activeItemId, setActiveItemId] = useState("#dashboard");

  useEffect(() => {
    if (typeof document !== 'undefined')
      document.title = "Dashboard de Administrador";
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
              onChange={ ({ item }) => redirect('dashboard/users') }
            />
        </nav>
        <section id="container" className="container w-3/4">

          <div className="w-full min-h-screen flex flex-col justify-center items-center p-8">

            <section className="block m-auto h-96">

              <h3 className="pb-4">Portal del Administrador</h3>

            </section>
          </div>
        </section>
      </div>
  )
}

export default DashboardHomePage;
