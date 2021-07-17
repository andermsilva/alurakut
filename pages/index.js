//require('dotenv').config({ path: '../../.env.local' })
import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';


import Box from '../src/components/Box';
import MainGrid from '../src/components/mainGrid';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommuns';
import { ProfileRelationsBoxWapper } from '../src/ProfileRelations';



function ProfileSider(propriedades) {
  return (
    <Box as='aside'>

      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>

        <a className='boxLink' href={`https://github.com/${propriedades.githubUser}.png`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}

function ProfileRelationBox(propriedades) {
  return (
    <ProfileRelationsBoxWapper >
      <h2 className='smallTitle'>

        {propriedades.title} {propriedades.items.length}
      </h2>
      <ul>

        {/* {
          seguidores.map((itemAtual => {
            return (
              <li key={itemAtual}>

                <a href={`https://github.com/${itemAtual.login}.png`} >

                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>

            );
          })

          )
        } */}
      </ul>

    </ProfileRelationsBoxWapper>

  );
}

export default function Home(props) {

  const [comunidades, setComunidades] = useState([]);

  const usuarioAleatorio = props.githubUser
  const pessoasFavoristas = ['recieire',
    'Ganiell',
    'leitecsleite',
    'marcobrunodev', 'felipefialho'
  ]
  //console.log(usuarioAleatorio)
  // pegar 
  //criar uma box que vai ter um map, baseado em um array que pegamos do github
  const [seguidores, setSeguidores] = useState([]);
  useEffect(function () {

    const seguidores = fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
      .then(function (respostaServidor) {
        return respostaServidor.json()
      }).then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      });
    //API GraphQL

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '49b643a3f9ca081a3f2c49378a5ab4',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `
        query{
          allCommunities{
            title
            id
            imageUrl
            creatorSlug
          }
        }
        `
      })

    }).then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(respostaCompleta)
        setComunidades(comunidadesVindasDoDato)
      })

  }, []);

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSider githubUser={usuarioAleatorio} />
        </div>

        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>

          <Box>
            <h1 className='title'>

              Bem vindo
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className='subTitle'>
              O que voce deseja fazer?
            </h2>
            <form
              onSubmit={
                function handleCriaComunidade(e) {
                  e.preventDefault();

                  const dadosForm = new FormData(e.target);

                  const comunidade = {

                    title: dadosForm.get('title'),
                    imageUrl: dadosForm.get('image'),
                    creatorSlug: usuarioAleatorio,


                  }

                  fetch('/api/comunidades', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(comunidade)

                  }).then(async (response) => {
                    const dados = await response.json();
                    console.log(dados.registroCriado)
                    const comundade = dados.registroCriado
                    const comunidadesAtualizadas = [...comunidades, comunidade];
                    setComunidades(comunidadesAtualizadas);
                  })



                }
              }>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name='title'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                  type='text'
                />
              </div>
              <div>
                <input placeholder="Coloque uma URL para usarmo de capa"
                  name='image'
                  aria-label='Coloque uma URL para usarmo de capa'
                  type='text'
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className='profileRelationArea' style={{ gridArea: 'profileRelationArea' }}>
          <ProfileRelationBox title='Seguidores' items={seguidores} />
          <ProfileRelationsBoxWapper >
            <h2 className='smallTitle'>

              Comunidades ({comunidades.length})
            </h2>
            <ul>

              {
                comunidades.slice(0, 6).map((itemAtual => {
                  return (
                    <li key={itemAtual.id}>

                      <a href={`community/${itemAtual.title}`} >

                        <img src={itemAtual.imageUrl} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>

                  );
                })

                )}
            </ul>

          </ProfileRelationsBoxWapper>
          <ProfileRelationsBoxWapper>
            <h2 className='smallTitle'>

              Pessoas da comunidade ({pessoasFavoristas.length})
            </h2>
            <ul>

              {
                pessoasFavoristas.slice(0, 6).map((itemAtual => {
                  return (
                    <li key={itemAtual}>

                      <a href={`users/${itemAtual}`} key={itemAtual} >

                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>

                  );
                })

                )
              }
            </ul>
          </ProfileRelationsBoxWapper>



        </div>
      </MainGrid>

    </>
  );
}


export async function getServerSideProps(context) {
  //const { config } = require('process');

  const isLocal = process.env.ALURA_KUT === 'local';


  const BASE_URL_AUTH = isLocal ? process.env.URL_AUTH : process.env.URL_AUTH_REMOTE



  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN

  const { githubUser } = jwt.decode(token);

  const { isAuthenticated } = await fetch(`${BASE_URL_AUTH}/api/auth`, {

    headers: {
      Authorization: token
    }
  }).then((resposta) => resposta.json())

  console.log(BASE_URL_AUTH)
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login?msg=err',
        permanent: false,
      }
    }
  }
  //console.log(githubUser, token)
  return {
    props: {

      githubUser
    }, // will be passed to the page component as props
  }
}
