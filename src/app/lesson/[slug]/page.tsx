"use client"
import { notFound } from 'next/navigation'

import { getLessonDetail } from './utils/actions';
import { useEffect, useState, Fragment } from "react";
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { Button, KIND } from 'baseui/button';

import { MessageCard, IMAGE_LAYOUT } from "baseui/message-card";
import { HeadingLevel, Heading } from 'baseui/heading';
import {
  Card,
  StyledAction
} from "baseui/card";
import {
  Alert
} from 'baseui/icon';

const engine = new Styletron();

function LessonDetailPage ({ params }: { params: { slug: string } }) {

  // Throw 404 if no slug is present in the url
  if(! params?.slug)
    return notFound();

  const [lessonDetail, setLessonDetail] = useState('');
  const [contents, setContents]         = useState('');
  const [lessonsQueue, setLessonsQueue] = useState('');
  const [isLoading, setIsLoading]       = useState(true);
  const [isLoadingQueue, setIsLoadingQueue] = useState(true);

  const renderMainView = () => {
    return(
      (lessonDetail.contents[0].type === 'media') ?
          <iframe width="600" height="320" src={`https://www.youtube.com/embed/${contents[0].attachments.mediaUrl}`} title={contents[0].attachments.mediaUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        : <p>Error getting media</p>
    )
  }
  const renderSideView = () => {
    console.log("Rendering side view", contents);
    // const apiKey = 'AIzaSyDSyGjGBgjWQJlw4om36f7NwFPo9vY66_0';
    // const videoId = contents[0].attachments.mediaUrl;
    // const apiUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=snippet`;
    //
    // fetch(apiUrl)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Get the video's thumbnail URL
    //     const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
    //     console.log(thumbnailUrl);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching YouTube video data:', error);
    //   });
    return(
      <div>
        {
          contents.map((item, itemIndex) => (
            <Fragment key={itemIndex} >
              <div className="w-full bg-disabled mb-4">
                <iframe width="300" height="160" src={`https://www.youtube.com/embed/${item.attachments.mediaUrl}`} title={item.attachments.mediaUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
            </Fragment>
          ))
        }
      </div>
    )
  }

  const renderDetailComponents = () => {

    return(
      <Fragment>
        <HeadingLevel>
          <Heading styleLevel={2} style={{margin: '0 auto 1.5rem 0', display: 'block', width: '100%', letterSpacing: '1px'}} >{lessonDetail.name}</Heading>
        </HeadingLevel>
        <HeadingLevel>
          <Heading styleLevel={4} style={{margin: '0 auto 1.5rem 0', display: 'block', width: '100%', color: '#353333'}} >Lecciones</Heading>
        </HeadingLevel>
        <div className="mx-auto flex">
          {
            (contents) ?
              <article className="grow w-2/3">
                { renderMainView() }
                <HeadingLevel>
                  <Heading styleLevel={6} style={{margin: '0 auto 1.5rem 0', display: 'block', width: '100%', letterSpacing: '1px', maxWidth: '80%', backgroundColor:'#602C0A', color: 'white', padding: '0.4rem 1rem 0.4rem 0.2rem'}} >{contents[0].name}</Heading>
                </HeadingLevel>
              </article>
            : ''
          }

          <article className="flex-none w-1/3">
            { (contents) ? renderSideView() : 'none' }
          </article>

        </div>
      </Fragment>
    );
  }

  useEffect( () => {

    getLessonDetail(params.slug, setLessonDetail, setContents);

  }, []);

  useEffect( () => {

    if(lessonDetail)
      setIsLoading(false);

  }, [lessonDetail]);


  return (
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <div id="backgroundContainer" className="bg-sand-pattern bg-repeat-x bg-bottom bg-blend-multiply pb-32">
            <section id="container" className="container m-auto min-h-screen">

              <header className="block w-full m-auto pt-10 pb-20">
                <a href="/"><img src="/media/logo_tg.png" className="block w-52" alt="Tierra Garat - Universidad para capacitación de nuestros colaboradores"/></a>
              </header>
              <div className="w-9/12 mx-auto">

                <MessageCard
                    heading={<p><Alert size={24} /> Tu progreso está a salvo</p>}
                    paragraph="Recuerda que tu progreso se mantiene a salvo en tu cuenta, para guardar el avance es necesario que visualices el material en su totalidad."
                    image={{
                      src: '/media/LogoFooter.png',
                      layout: IMAGE_LAYOUT.trailing,
                      ariaLabel: 'Tierra Garat',
                    }}
                    buttonKind={KIND.secondary}
                    buttonState="disabled"
                    buttonLabel="Ver mi progreso"
                    onClick={() => {}}
                    overrides={{Root: {style: {marginBottom: '30px'}}, Image: {style: {opacity: '0.4', backgroundSize: '60%', backgroundRepeat: 'no-repeat'}}}}
                  />
                { isLoading ? (
                  <MessageCard
                      heading="⏳ Cargando el módulo"
                      paragraph={`Estamos cargando la información del módulo ${params.slug}, espera un momento...`}
                      image={{
                        src:
                          "https://picsum.photos/400/200"
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

export default LessonDetailPage;
