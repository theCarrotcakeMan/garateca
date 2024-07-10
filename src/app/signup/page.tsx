"use client"

import axios from 'axios';
import { useEffect, useState, Fragment } from "react";
import { getFormOptions, initUrlParamsInformation } from './utils/actions';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button, KIND } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { Combobox, ComboboxOption } from 'baseui/combobox';
import { Toast, ToasterContainer, toaster } from 'baseui/toast';

const toastMessage = ( messageType:any, message:String ) => {
  console.log("Toasting message ", message);
  // return toaster[messageType](message);
  return (    <Fragment>
      <Toast kind={KIND.positive}>Positive notification</Toast>
    </Fragment>);
}


function SignPage() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [cpassword, setCPassword] = useState('');
  const [password, setPassword] = useState('');
  const [invite, setInvite]     = useState('');
  const [employee, setEmployee] = useState('');
  const [role, setRole]         = useState('');
  const [branch, setBranch]     = useState('');
  const [checked, setChecked]   = useState(false);

  const [branches, setBranches]   = useState('');
  const [roles, setRoles]         = useState('');
  const [branchOptions, setBranchOptions] = useState('');
  const [roleOptions, setRoleOptions]     = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault();

    if(password !== cpassword)
      return toastMessage('warning', "Tus contraseñas no coinciden");

    if(!checked)
      return toastMessage('warning', "Debes aceptar los términos y condiciones");

    try {
      // TODO: make sure password doesn't travel in plain text
      await axios.post('/api/users', { firstName, lastName, email, password });
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  }

  useEffect(() => {

    getFormOptions(setBranches, setRoles);
    initUrlParamsInformation(setInvite, setEmployee);
  }, []); // The empty dependency array means this effect runs once on mount

  useEffect(() => {

      if(branches.length){
        let branchOptionsV = branches.map( branch =>
            ({ label: branch.name , value: branch.slug }));
        setBranchOptions(branchOptionsV);
        setIsLoading(false);
      }

  }, [branches]);

  useEffect(() => {

      if(roles.length){
        let roleOptionsV = roles.map( role =>
                  ({ label: role.name , value: role.slug }));
        setRoleOptions(roleOptionsV);
        setIsLoadingRoles(false);
      }

  }, [roles]);


  return (
      <div id="backgroundContainer" className="bg-sand-pattern bg-repeat-x bg-bottom bg-blend-multiply pb-32">
        <section id="container" className="container m-auto min-h-screen">

          <ToasterContainer/>
          <div className="flex flex-col justify-center min-h-fit items-center">

            <header className="block w-1/3 m-auto py-20">
              <a href="/">
                <Image
                  src="/logo_tg.png"
                  width={1030}
                  height={300}
                  className="block w-full"
                  alt="Tierra Garat"
                />
              </a>
            </header>

            <form id="signupForm" onSubmit={handleRegistration} className="block w-3/5 mb-12">

              <div className="flex flex-row m-auto">

                <div className="w-1/2 pr-6 bg-slate-50" >
                  <h2>Información personal</h2>
                  <FormControl label="Nombre(s)">
                    <Input
                      type="text"
                      value={firstName}
                      placeholder="John"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl label="Apellidos">
                    <Input
                      type="text"
                      value={lastName}
                      placeholder="Doe"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </FormControl>

                  <div className="">&nbsp;</div>
                  <FormControl label="Correo">
                    <Input
                      type="email"
                      value={email}
                      placeholder="johndoe@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl label="Contraseña">
                    <Input
                      type="password"
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl label="Confirma tu contraseña">
                    <Input
                      type="password"
                      placeholder="*******"
                      value={cpassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      required
                    />
                  </FormControl>

                </div>

                <div className="w-1/2 pl-6" >
                  <h2 className="block font-normal text-lg mb-4 bg-maroon text-white py-1 px-2">Empleo</h2>
                  <FormControl label="Puesto">
                    { isLoadingRoles ? (
                      <Input placeholder="Cargando opciones..." isLoading={isLoadingRoles} />
                    ) : (
                      <Combobox
                        placeholder="Selecciona una"
                        isLoading={isLoadingRoles}
                        value={role}
                        onChange={nextValue => setRole(nextValue)}
                        options={roleOptions}
                        mapOptionToString={option => option.label}
                      />
                    )}

                  </FormControl>

                  <FormControl label="Sucursal">
                    { isLoading ? (
                      <Input placeholder="Cargando opciones..." isLoading={isLoading} />
                    ) : (
                      <Combobox
                        placeholder="Selecciona una"
                        isLoading={isLoading}
                        value={branch}
                        onChange={nextValue => setBranch(nextValue)}
                        options={branchOptions}
                        mapOptionToString={option => option.label}
                      />
                    )}

                  </FormControl>

                  <FormControl label="No. de empleado">
                    <Input
                      type="text"
                      placeholder="094844"
                      value={employee}
                      onChange={(e) => setEmployee(e.target.value)}
                      required
                    />
                  </FormControl>

                  <FormControl label="Código de confirmación">
                    <Input
                      type="text"
                      placeholder="UT300FYCD"
                      value={invite}
                      onChange={(e) => setInvite(e.target.value)}
                      required
                      disabled
                    />
                  </FormControl>

                </div>

              </div>

              <section id="submitSignup" className="w-full self-center">

                <div className="">&nbsp;</div>
                <FormControl>
                  <Checkbox
                    style={{margin: 'auto', display: 'block', width: '300px'}}
                    checked={checked}
                    onChange={e => setChecked(e.target.checked)}
                    labelPlacement={LABEL_PLACEMENT.right}
                  >
                    Acepto los <a href="/terms-and-conditions">Términos y Condiciones</a>
                  </Checkbox>
                </FormControl>

                <div className="">&nbsp;</div>
                <Button kind={KIND.primary} style={{textAlign: 'center', margin: 'auto', display: 'block', width: '300px'}} colors={{ 'backgroundColor': '#602C0A', 'color': 'white'}} type="submit">Registrarme</Button>
              </section>

            </form>

          </div>
        </section>
      </div>
  );
}

export default SignPage;
