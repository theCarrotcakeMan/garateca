"use client"

import { getCoursesListing } from './utils/actions';
import { remove as removeAuth } from '/src/redux/Features/Auth/authSlice';
import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

import { Button, KIND } from 'baseui/button';
import { MessageCard } from 'baseui/message-card';
import { useAppDispatch } from "/src/redux/hooks";
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import { HeadingLevel, Heading } from 'baseui/heading';

const handleLogout = (dispatch, router) => {

  console.log("Clearing session");
  // dispatch(removeAuth());
  //
  // router.push('login');
}

function CoursesListingPage() {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [courses, setCourses] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const articleElements = () => {

    if(courses.length)
      return (
            courses.map((course) => (
              <div key={course._id} className="w-full mb-6">
                <HeadingLevel>
                  <Heading styleLevel={5} style={{margin: '0 auto 1.5rem 0', display: 'block', width: '100%', letterSpacing: '1px', color: '#353333'}} >{course.categoryLabel}</Heading>
                </HeadingLevel>
                <section className="flex items-stretch">
                {
                  course.items.map((item, itemIndex) => (
                    <Card
                      key={itemIndex}
                      className="mr-6"
                      overrides={{Root: {style: {width: `${100/2}%`}}, Title: {style: {marginTop: '-8rem',color: 'white', textShadow: '1px 1px 2px #555353', minHeight: '120px', letterSpacing: '1px'}}}}
                      headerImage={item.mediaUrl ? item.mediaUrl : 'https://picsum.photos/400/320' }
                      title={item.label} >

                      <StyledAction>
                        <Button
                          kind="secondary"
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.location.href = `course/${item.slug}`;
                            }
                          }}
                          overrides={{
                            BaseButton: { style: { width: "100%", backgroundColor: "#F2F2F2", color: "#353333" } }
                          }}
                        >
                          Abrir curso
                        </Button>
                      </StyledAction>
                    </Card>
                  ))
                }
                </section>
              </div>
          ))
      );
  }

  useEffect( () => {

    getCoursesListing(setCourses);
  }, []);

  useEffect( () => {

    if(courses.length)
      setIsLoading(false);
  }, [courses]);


  return (
      <div id="backgroundContainer" className="bg-sand-pattern bg-repeat-x bg-bottom bg-blend-multiply pb-32">
        <section id="container" className="container m-auto min-h-screen">

          <header className="block w-full m-auto pt-10 pb-20">
            <a href="/">
              <Image src="/media/logo_tg.png"
                width={1030}
                height={300}
                className="block w-52"
                alt="Tierra Garat - Universidad para capacitación de nuestros colaboradores"
                />
            </a>
            <ul className="">
              <li>Mi avance</li>
              // <li onClick={handleLogout} >Logout</li>
            </ul>
          </header>
          <div className="w-9/12 mx-auto">

            { isLoading ? (
              <MessageCard
                  heading="⏳ Cargando los cursos"
                  paragraph="Estamos cargando la información en la plataforma, espera un momento..."
                  image={{
                    src:
                      "/media/loadingContent.png"
                  }}
                  overrides={{Root: {style: {width: '320px', margin: 'auto'}}}}
                />
              ) : articleElements() }

          </div>
        </section>
      </div>
  );
}

export default CoursesListingPage;
