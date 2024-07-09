"use client"

import { Image } from 'next/image';

const MainFooter = () => (
    <footer className="bottom-0 py-6 w-screen text-center bg-action flex justify-center">
      <a href="">
        <Image
          src="/media/LogoFooter.png"
          alt="Tierra Garat logotipo small"
          className="w-28 m-4"
          style={{minWidth: '100px'}}
          />
      </a>
      <ul className="m-4 text-left text-white leading-10 text-sm">
        <h3 className="text-lg font-bold">CONTACTO</h3>
        <li><a href="mailto: info@universidadtierragarat.com">info@universidadtierragarat.com</a></li>
        <li><a href="#">55 55 555 555</a></li>
      </ul>
      <ul className="m-4 text-left text-white leading-10 text-sm">
        <h3 className="text-lg font-bold">LEGAL</h3>
        <li><a href="#">Aviso de privacidad</a></li>
      </ul>
      <ul className="m-4 text-left text-white leading-10 text-sm">
        <h3 className="text-lg font-bold">AYUDA</h3>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Instrucciones</a></li>
      </ul>
      <ul className="m-4 text-left text-white leading-10 text-sm">
        <h3 className="text-lg font-bold">NUESTRAS REDES</h3>
        <li><a href="#">IG</a></li>
      </ul>
    </footer>
)

export default MainFooter;
