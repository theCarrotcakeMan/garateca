"use client"
import { notFound } from 'next/navigation'

import { getCourseDetail } from './utils/actions';
import { useEffect, useState, Fragment } from "react";
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { Button, KIND } from 'baseui/button';
import {
  Upload,
  ArrowRight,
} from 'baseui/icon';

import { MessageCard, IMAGE_LAYOUT } from "baseui/message-card";
import { HeadingLevel, Heading } from 'baseui/heading';
import {
  Card,
  StyledAction
} from "baseui/card";

const engine = new Styletron();

function CourseDetailPage ({ params }: { params: { slug: string } }) {

  // Throw 404 if no slug is present in the url
  if(! params?.slug)
    return notFound();

  const [courseDetail, setCourseDetail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const renderDetailComponents = () => {

    return(
      <Fragment>
        <HeadingLevel>
          <Heading styleLevel={2} style={{margin: '0 auto 1.5rem 0', display: 'block', width: '100%', letterSpacing: '1px'}} >{courseDetail.label}</Heading>
        </HeadingLevel>
        <HeadingLevel>
          <Heading styleLevel={4} style={{margin: '0 auto 1.5rem 0', display: 'block', width: '100%', color: '#353333'}} >Módulos</Heading>
        </HeadingLevel>
        <div className="grid gap-4 grid-cols-4 grid-rows-3">
          {
              courseDetail.lessons.map((item) => (
                <Card
                  key={item._id}
                  overrides={{Root: {style: { backgroundColor: '#8B8B8B', position:'relative', minHeight: '200px'}}, Title: {style: {color: 'white', marginTop: '3rem',  marginBottom: '3rem', textShadow: '1px 1px 2px #555353', letterSpacing: '1px'}}}}
                  title={item.name} >

                  <StyledAction>
                    <Button
                      kind="secondary"
                      onClick={() => {window.location.href = `/lesson/${item.slug}`}}
                      endEnhancer={() => <ArrowRight size={24} />}
                      overrides={{
                        BaseButton: { style: { width: "86%", bottom: '1rem', position: 'absolute', backgroundColor: "#F2F2F2", color: "#353333" } }
                      }} >
                      Abrir módulo
                    </Button>
                  </StyledAction>
                </Card>
              ))
          }
        </div>

      </Fragment>
    );
  }

  useEffect( () => {

    getCourseDetail(params.slug, setCourseDetail);

  }, []);

  useEffect( () => {

    if(courseDetail)
      setIsLoading(false);

  }, [courseDetail]);


  return (
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>

          <div id="backgroundContainer" className="bg-sand-pattern bg-repeat-x bg-bottom bg-blend-multiply pb-32">
            <section id="container" className="container m-auto min-h-screen">

              <header className="block w-full m-auto pt-10 pb-20">
                <a href="/"><img src="/media/logo_tg.png" className="block w-52" alt="Tierra Garat - Universidad para capacitación de nuestros colaboradores"/></a>
              </header>
              <div className="w-9/12 mx-auto">

                { isLoading ? (
                  <MessageCard
                      heading="⏳ Cargando el curso"
                      paragraph="Estamos cargando la información del curso, espera un momento..."
                      image={{
                        src:
                          "/media/loadingContent.png"
                      }}
                      overrides={{Root: {style: {width: '320px', margin: 'auto'}}}}
                    />
                  ) : renderDetailComponents() }

              </div>
            </section>
          </div>

        </BaseProvider>
      </StyletronProvider>
  );
};

export default CourseDetailPage;
