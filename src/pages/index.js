import { Button, Flex, Image, Text } from '@chakra-ui/react'
import Head from 'next/head'

import {FiArrowRight} from 'react-icons/fi';
import Router from 'next/router';


export default function Home() {
  return (
    <Flex justifyContent='center' flexDirection='column' alignItems='center'>
      <Head>
        <title>Quiz Lavoisier</title>
        <meta name="description" content="quiz do 2 ano A Lavoisier" />
        <link rel="icon" href="/home.svg" />
      </Head>
      
      <Image marginTop='50px' src='/home.svg' alt='icone da home'/>
      <Text textAlign='center' marginTop='30px' width='100%' fontSize='20px' fontWeight='bold' >Seja bem vindo ao <Text display='inline-block' color='blue.600'>quiz</Text>!</Text>
      <Text textAlign='center' color='gray.500' marginTop='10px' width='80%' fontSize='16px' fontWeight='regular'>separamos algumas perguntas para testar seus conhecimentos! Está pronto para tentar?</Text>

      <Button onClick={() => Router.push('/quiz')} textAlign='center'width='80%' marginTop='10%' colorScheme='cyan' color='white' display='flex' justifyContent='center' >
        Começar <FiArrowRight style={{marginLeft: '10px'}}/>
      </Button>
     
    </Flex>
  )
}
