import { Box, Button, Flex, Progress, Tag, Text,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, 
  CircularProgress,
  CircularProgressLabel} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import {questions, total} from '../questions';

import {FiArrowRight, FiCheckCircle, FiXCircle} from 'react-icons/fi';


function Quiz() {

  const [percent, setPercent] = useState(0);  
  const [progress, setProgress] = useState(1);

  const [selected, setSelected] = useState('0');

  const [status, setStatus] = useState(false);

  const [hits, setHits] = useState(0);

  useEffect(() => {
    const result = (progress / total) * 100;

    setPercent(result);
  }, [progress]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function validate(word) {
    

    
   if(selected === '0') {
    alert('selecione uma opção para continuar 😉');
    return;
   }

   if(questions[progress - 1].response === word) {
    setStatus(true);
    setProgress(progress + 1);
    setHits(hits + 1);
  } else {
    setStatus(false);
    setProgress(progress + 1);
  }

    setSelected('0');

    onOpen();
  }


  return (
    <Flex flexDirection='column' alignItems='center' marginTop='20px'>

    <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody display='flex' flexDirection='column' alignItems='center' backgroundColor={status === true ? 'green.400': 'red.300'}>

           {
             status === true ?  <FiCheckCircle  color='#fff' style={{maxWidth: '300', marginTop: '10%'}} size='40%'/> :  <FiXCircle color='#fff' style={{maxWidth: '300', marginTop: '10%'}} size='40%'/>
           }

           <Text textAlign='center' width='95%' marginTop='20px' fontWeight='semibold' color='white' fontSize='25px'>
           {
             status === true ? 'Parabéns você acertou 🚀' : 'Oops, resposta errada 😕'
           }
           </Text>


           <Text textAlign='center' width='95%' fontWeight='medium' color='white' fontSize='16px'>
           {
             status === true ? 'vamos para próxima?' : 'mas ainda dá para recuperar! Vamos para próxima'
           }
           </Text>
            
          </ModalBody>

          <ModalFooter backgroundColor={status === true ? 'green.400': 'red.300'}>
          
            <Button onClick={() => onClose()} width='100%' colorScheme={status === true ? 'green': 'red'}>{status === true ? 'Vamos lá': 'Ir para próxima'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {
        progress < 16 ? (
          <>
          <Flex borderRadius='10px' alignItems='center' padding='3px' border='1px solid' borderColor='gray.200' width='90%' flexDirection='row'>
        <Box width='80%'>
        <Progress borderRadius='10px' color='cyan' value={percent}/>
        </Box>
        <Text marginLeft='5%' fontSize='14px' fontWeight='semibold'>{progress}/{total}</Text>
      </Flex>

      <Text textAlign='center' width='85%' fontWeight='bold' fontSize='18px' marginTop='10%'>
      {questions[progress - 1].quest}
      </Text>

      <Flex flexDirection='column' marginTop='20%' width='90%'>

        <Button whiteSpace='normal'  marginBottom='10px' onClick={() => setSelected('a')} height='auto' padding='10px' fontWeight='medium' color={selected === 'a' ? 'white' : 'black'} border='1px solid' borderColor={selected === 'a' ? 'transparent' : 'gray.200'} colorScheme={selected === 'a' ? 'cyan': 'whiteAlpha'} display='flex' justifyContent='left' textAlign='left' width='100%'>
          <Tag marginRight='8px' borderRadius='full' background='blue.500' color='white'>A</Tag>
          {questions[progress - 1].a}
        </Button>

        <Button padding='10px'  whiteSpace='normal' marginBottom='10px' onClick={() => setSelected('b')} height='auto' fontWeight='medium' color={selected === 'b' ? 'white' : 'black'} border='1px solid' borderColor={selected === 'b' ? 'transparent' : 'gray.200'} colorScheme={selected === 'b' ? 'cyan': 'whiteAlpha'} display='flex' justifyContent='left' textAlign='left' width='100%'>
          <Tag marginRight='8px' borderRadius='full' background='blue.500' color='white'>B</Tag>
          {questions[progress - 1].b}
        </Button>

        <Button padding='10px'  whiteSpace='normal' marginBottom='10px' onClick={() => setSelected('c')} height='auto' fontWeight='medium' color={selected === 'c' ? 'white' : 'black'} border='1px solid' borderColor={selected === 'c' ? 'transparent' : 'gray.200'} colorScheme={selected === 'c' ? 'cyan': 'whiteAlpha'} display='flex' justifyContent='left' textAlign='left' width='100%'>
          <Tag marginRight='8px' borderRadius='full' background='blue.500' color='white'>C</Tag>
          {questions[progress - 1].c}
        </Button>

        <Button padding='10px'  whiteSpace='normal' marginBottom='10px' onClick={() => setSelected('d')} height='auto' fontWeight='medium' color={selected === 'd' ? 'white' : 'black'} border='1px solid' borderColor={selected === 'd' ? 'transparent' : 'gray.200'} colorScheme={selected === 'd' ? 'cyan': 'whiteAlpha'} display='flex' justifyContent='left' textAlign='left' width='100%'>
          <Tag marginRight='8px' borderRadius='full' background='blue.500' color='white'>D</Tag>
          {questions[progress - 1].d}
        </Button>

        <Button colorScheme='blue' marginTop='5%' onClick={() => validate(selected)}>Continuar <FiArrowRight style={{marginLeft: '10px'}}/></Button>

      </Flex>
      </>
        ): (
          <Flex width='100%' flexDirection='column' justifyContent='center' marginTop='30px' alignItems='center'>
            <CircularProgress marginLeft='25%' thickness='12px' size='60%' textAlign='center' value={Math.round(((hits / total) * 100) * 100) / 100} color='green.400'>
  <CircularProgressLabel textAlign='center' marginLeft='-60px' fontSize='22px' fontWeight='semibold'>{Math.round(((hits / total) * 100) * 100) / 100}%</CircularProgressLabel>
</CircularProgress>

          <Text marginTop='30px' fontSize='25px' fontWeight='bold'>{hits}/{total} corretas</Text>
          <Text marginTop='0px' fontSize='16px' fontWeight='medium' color='gray.500'>{hits < 7.5 ? 'foi bem mas pode melhorar': 'você é brabo(a)'}</Text>
          </Flex>
        )
      }

    </Flex>
  );
}

export default Quiz;