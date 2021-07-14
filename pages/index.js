import React, { useState } from 'react';

import Box from '../src/components/Box';
import MainGrid from '../src/components/mainGrid';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommuns';
import { ProfileRelationsBoxWapper } from '../src/ProfileRelations';



function ProfileSider(propriedades) {
  return (
    <Box >

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

export default function Home() {

  const [comunidades, setComunidades] = useState([{
    id: '1',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  console.log(comunidades)


  const githubUser = 'andermsilva'
  const pessoasFavoristas = ['recieire',
    'Ganiell',
    'leitecsleite',
    'marcobrunodev', 'felipefialho'
  ]
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSider githubUser={githubUser} />
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
                    id: new Date().toISOString(),
                    title: dadosForm.get('title'),
                    image: dadosForm.get('image'),


                  }
                  console.log(comunidade, comunidades)
                  const comunidadesAtualizadas = [...comunidades, comunidade]
                  setComunidades(comunidadesAtualizadas)


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

          <ProfileRelationsBoxWapper>
            <h2 className='smalTitle'>

              Comunidades
            </h2>
            <ul>

              {
                comunidades.map((itemAtual => {
                  return (
                    <li key={itemAtual.id}>

                      <a href={`users/${itemAtual.title}`} >

                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>

                  );
                })

                )
              }
            </ul>

          </ProfileRelationsBoxWapper>
          <ProfileRelationsBoxWapper>
            <h2 className='smalTitle'>

              Pessoas da comunidade ({pessoasFavoristas.length})
            </h2>
            <ul>

              {
                pessoasFavoristas.map((itemAtual => {
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

          <Box >
            Comunidades
          </Box>
        </div>
      </MainGrid>

    </>
  );
}

