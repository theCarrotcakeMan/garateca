"use client"

import { Button, KIND } from 'baseui/button';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { handleLogin, useLoggedStatus, faultyTokenCallback } from './utils/actions';

export default function LoginPage(users) {

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // // Check for login status and redirect accordingly
  const loginStatus = useLoggedStatus();
  // const loginStatus = null;
  loginStatus ? redirect('/courses')
              : faultyTokenCallback();

  return (
      <div id="backgroundContainer" className="bg-sand-pattern bg-repeat-x bg-bottom bg-blend-multiply pb-32">
        <section id="container" className="container m-auto min-h-screen">

          <div className="flex flex-col justify-center min-h-fit items-center">

            <header className="block w-3/5 m-auto p-20">
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

            <section className="w-1/3 block m-auto">
              <h3 className="pb-4">Inicia sesión en tu cuenta</h3>
              <form onSubmit={handleLogin} >

                <FormControl label="Email">
                  <Input
                    type="email"
                    value={email}
                    placeholder="johndoe@gmail.com"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl label="Contraseña">
                  <Input
                    type="password"
                    placeholder="*******"
                    value={password}
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                <div className="">&nbsp;</div>
                <p className="text-right text-sm">¿Aún no creas un perfil? <a href="signup">Regístrate aquí</a></p>
                <div className="">&nbsp;</div>
                <Button kind={KIND.primary} style={{textAlign: 'center', margin: 'auto', display: 'block', width: '100%'}} colors={{ 'backgroundColor': '#602C0A', 'color': 'white'}} type="submit">Ingresar</Button>

              </form>
            </section>
          </div>
        </section>
      </div>
  )

}
