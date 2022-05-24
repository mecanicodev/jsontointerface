import React, { SetStateAction, useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import { 
  Flex, 
  SimpleGrid,
  Heading,
  useBreakpointValue, 
  Center, 
  Box, 
  useToast,
  Progress,
  Spinner,
} from '@chakra-ui/react';
import Code from './Code';
import testJson from './util/test'
import './monaco-override.css'
import './App.css'
import { VscSymbolInterface } from "react-icons/vsc";
import jsonToInterface from './util/JsonToInterface';

const App: React.FC = ()=> {
  const [jsonData, setjsonData] = useState<string>(testJson);
  const [codeContent, setcodeContent] = useState('');
  const [inProgress, setInProgress] = useState(false)

  const handleEditorChange = (value: string | undefined, event: unknown) => {
    setjsonData(value as SetStateAction<string>)
  }

  const editorHeight = useBreakpointValue<string>({base: '50vh', sm: '80vh'})
  const toast = useToast()

  useEffect(() => {

    let isInvalidJson: boolean;
    const progressTimeout = setTimeout(() => {
      setInProgress(true)
    }, 2000);
    const contentTimeout = setTimeout(() => {
      const content: string = jsonToInterface(jsonData)
      setcodeContent(content)
      setInProgress(false)
      isInvalidJson = (jsonData.length > 0 && content.length === 0);
    }, 3000)
    
    const toastTimeout = setTimeout(() => {
      if (isInvalidJson) {
        toast({
          title: 'Error',
          description: "Invalid JSON format",
          status: 'error',
          duration: 1900,
          isClosable: true,
          position: 'bottom-right',
          containerStyle: {
            marginBottom: '32px',
            marginRight: '40px'
          }
        })
      }
    }, 8000)

    return () => {
      clearTimeout(contentTimeout)
      clearTimeout(toastTimeout)
      clearTimeout(progressTimeout)
    }
  }, [jsonData, toast])
  

  return (
    <Box px={'20px'} className='container' height={{base: '100%', sm: '100vh'}}>
      <Flex align={'center'} height={'10vh'} mx={'auto'} maxW={'1200px'}>
        <VscSymbolInterface size='4em'/>
        <Heading size={'lg'}>JSON to Interface App</Heading>
      </Flex>
      <Box mx={'auto'} maxW={'1200px'}>
        <SimpleGrid
          background={'#3b3b3b'}
          className='window'
          columns={{base: 1, sm: 2}} 
          overflow={'hidden'}
          height={{base: 'auto', sm: '84vh'}}
          >
          <Flex direction={'column'}>
            <Center className='section-title' height={'4vh'} fontSize='md'>
              Input: JSON format
            </Center>
            <Editor
              loading={
                <Spinner
                thickness='6px'
                speed='0.65s'
                emptyColor='gray.400'
                color='blue.500'
                size='xl'
                />
              }
              height={editorHeight}
              width="100%"
              defaultLanguage="json"
              defaultValue=''
              theme='vs-dark'
              onChange={handleEditorChange}
              value={jsonData}
              />
          </Flex>
          <Flex direction={'column'}>
            <Center className='section-title' height={'4vh'} fontSize='md'>
              Output: Typescript interface
            </Center>
            <Code
              language='typescript' 
              height={editorHeight}
              content={codeContent}
            />
          </Flex>
        </SimpleGrid>
        <Progress 
          backgroundColor={'#1E1E1E'}
          border='1px solid #d4d4d429' 
          isIndeterminate={inProgress} 
          height={'1vh'}>
        </Progress>
      </Box>
      <Box height={'5vh'}>
        <Center fontSize={'xl'}>Created by @mecanicodev</Center>
      </Box>
    </Box>
  );
}

export default App;
