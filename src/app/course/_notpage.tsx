"use client"

import axios from 'axios'
import { getCoursesListing } from './utils/actions';
import { useEffect, useState, Fragment } from "react";
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { Button, KIND } from 'baseui/button';
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import { HeadingLevel, Heading } from 'baseui/heading'

const engine = new Styletron();

function CoursesListingPage() {

  const [courses, setCourses] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const articleElements = () => {
    console.log(courses);
    if(courses.length)
      return (
            courses.map((course) => (
              <div key={course._id} className="w-full mb-6">
                <HeadingLevel>
                  <Heading styleLevel={5} style={{margin: '0 auto 1.5rem 0', display: 'block', width: '100%', letterSpacing: '1px', color: '#353333'}} >{course.label}</Heading>
                </HeadingLevel>
                <section className="flex items-stretch">
                {
                  course.items.map((item, itemIndex) => (
                    <Card
                      key={itemIndex}
                      className="mr-6"
                      overrides={{Root: {style: {width: '30%'}}, Title: {style: {marginTop: '-60%',color: 'white', textShadow: '1px 1px 2px #555353', letterSpacing: '1px'}}}}
                      headerImage={item.mediaUrl ? item.mediaUrl : 'https://picsum.photos/400/320' }
                      title={item.label} >

                      <StyledAction>
                        <Button
                          onClick={() => window.location.replace(`course/${item.slug}`)}
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
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>

          <section id="container" className="container m-auto">

            <header className="block w-full m-auto pt-10 pb-20">
              <a href="/"><img src="logo_tg.png" className="block w-52" alt="Tierra Garat - Universidad para capacitación de nuestros colaboradores"/></a>
            </header>
            <div className="w-9/12 mx-auto">

              { isLoading ? (
                  <p>Cargando cursos disponibles</p>
                ) : articleElements() }

            </div>
          </section>

      </BaseProvider>
    </StyletronProvider>
  );
}

export default CoursesListingPage;
