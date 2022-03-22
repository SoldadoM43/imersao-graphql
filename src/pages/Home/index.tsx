import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {CircularProgress, Container as ContainerDetail } from '@material-ui/core';

import BoxOptions from './BoxOptions';
import { IBoxOptions, IGetCount } from './types';
import { Container, Content, Box, Logo, Details, BoxDetails } from './styles';

import logo from '../../assets/logo.png';
import locations from '../../assets/locations.jpg';
import episodes from '../../assets/episodes.jpg';
import characters from '../../assets/characters.png';
import imersaoGraphQL from '../../assets/imersao-graphql.png';
import { gql, useQuery } from '@apollo/client';

const Home: React.FC = () => {
  const GET_COUNTS = gql`
  query GetCounts {
    characters {
      info {
        count
      }
    }
    locations {
      info {
        count
      }
    }
    episodes {
      info {
        count
      }
    }
  }
`;
  const [optionsList, setOptionsList] = useState<IBoxOptions[]>([
    {
      title: "Locais",
      count: 0,
      image: locations,
      link: "locations"
    },
    {
      title: "Episódios",
      count: 0,
      image: episodes,
      link: "episodes"
    },
    {
      title: "Personagens",
      count: 0,
      image: characters,
      link: "characters"
    }
  ])

  const { loading, error, data } = useQuery<IGetCount>(GET_COUNTS);

  useEffect(() => {
    if(!data) return ;
    const newList = [...optionsList]
    newList[0].count = data.locations.info.count
    newList[1].count = data.episodes.info.count
    newList[2].count = data.characters.info.count
    setOptionsList(newList)
  },[data])

  return <>
    <Container>
      <Content>
        <Box first>
          <Logo src={logo} />
        </Box>
        <Box>
          <Logo src={imersaoGraphQL} />
        </Box>
      </Content>
    </Container>

    <ContainerDetail maxWidth="md" style={{paddingTop: 42, textAlign: 'center'}}>
      <h3> Rick and Morty (em português Rick e Morty) é uma série de animação adulta norte-americana de comédia e ficção científica criada por Justin Roiland e Dan Harmon para o bloco de programação noturno Adult Swim, exibido no canal Cartoon Network.</h3>
      <br/>
      <p>A série estreou em 2 de dezembro de 2013 e acompanha as perigosas aventuras do cientista alcoólatra Rick e seu neto Morty, que divide seu tempo entre a vida familiar e viagens interdimensionais. Em 2016, suas duas primeiras temporadas foram lançadas na Netflix com a dublagem brasileira realizada pelo estúdio Dubbing Company, de Campinas, com tradução de Carlos Freires, e também foi transmitida nos canais pagos TBS, I.Sat e TNT Séries, atualmente é exibida no Brasil pelo canal Warner Channel desde 4 de maio de 2020 com a estreia do bloco do Adult Swim no canal. Em agosto de 2015, o Adult Swim renovou a série para uma terceira temporada de 10 episódios, que estreou no dia 1 de abril de 2017 com o resto da temporada programada para ir ao ar durante o verão do mesmo ano.</p>  
      <br/>
      <p>A série se originou de uma paródia animada em curta-metragem do filme De Volta Para o Futuro criada por Roiland para o festival de cinema Channel 101. A Adult Swim abordou Harmon a respeito de ideias para um programa de televisão, então ele e Roiland desenvolveram o programa com base no curta, substituindo os personagens de Doc com Rick e Marty com Morty.</p>
    </ContainerDetail>

    <ContainerDetail maxWidth="lg">
      {loading ?
        <CircularProgress/>
      :
        <Details>      
          {optionsList.map(item => (
            <BoxDetails>
              <Link to={item.link}>
                <BoxOptions item={item}/>
              </Link>
            </BoxDetails>
          ))}
        </Details>
      }
    </ContainerDetail>
  </>
}

export default Home;