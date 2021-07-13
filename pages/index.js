import React from 'react';

import Box from '../src/components/Box';
import MainGrid from '../src/components/mainGrid';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommuns';
import { ProfileRelationsBoxWapper } from '../src/ProfileRelations'


function ProfileSider(propriedades) {
  return (
    <Box >

      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />

    </Box>
  )
}

export default function Home() {
  const githubUser = 'andermsilva'
  const pessoasFavoristas = ['juunegreiros',
    'omariosouto',
    'peas',
    'marcobrunodev', 'felipefialho'
  ]
  return (
    <>
      <AlurakutMenu />
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
        </div>
        <div className='profileRelationArea' style={{ gridArea: 'profileRelationArea' }}>

          <ProfileRelationsBoxWapper>
            <h2 className='smalTitle'>

              Pessoas da comunidade ({pessoasFavoristas.length})
            </h2>
            <ul>

              {
                pessoasFavoristas.map((itemAtual => {
                  return (
                    <li>

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
            Comunicades
          </Box>
        </div>
      </MainGrid>

    </>
  );
}

