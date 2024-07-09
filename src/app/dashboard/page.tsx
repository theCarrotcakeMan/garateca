"use client"

import { redirect } from 'next/navigation'
import { useEffect } from 'react';

import { Image } from 'next/image';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { Button, KIND } from 'baseui/button';
import { Navigation } from 'baseui/side-navigation';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';


const engine = new Styletron();

const DashboardHomePage = () => {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [activeItemId, setActiveItemId] = useState("#dashboard");

  useEffect(() => {
    if (typeof document !== 'undefined')
      document.title = "Dashboard de Administrador";
  }, []);


  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>

        <div className="flex flex-row" >
          <nav className="w-1/4 h-screen bg-mustard drop-shadow-sm">
            <header className="m-auto p-6">
            <a href="#">
              <Image
                src="/logo_tg.png"
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
      </BaseProvider>
    </StyletronProvider>
  )
}

export default DashboardHomePage;
