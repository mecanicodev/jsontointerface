import React from 'react';
import Editor from "@monaco-editor/react";
// import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { Flex, SimpleGrid, Heading, useBreakpointValue, Center, Box} from '@chakra-ui/react';
import Code from './Code';
import testJson from './util/test'
import './monaco-override.css'
import './App.css'
import { VscSymbolInterface } from "react-icons/vsc";

const App: React.FC = ()=> {
  const height = useBreakpointValue<string>({base: '43vh', sm: '81vh'})
  return (
    <Box className='container'>
      <Flex align={'center'} height={'14vh'} >
        <VscSymbolInterface size='4em'/>
        <Heading size={'md'}>JSON to Interface App</Heading>
      </Flex>
      <SimpleGrid
        background={'#3b3b3b'}
        className='window'
        columns={{base: 1, sm: 2}} 
        overflow={'hidden'}
        >
        <Flex direction={'column'}>
        <Center 
        className='section-title'
        height={'5vh'}
        >
          Input: JSON format
        </Center>
        <Editor
          height={height}
          width="100%"
          defaultLanguage="json"
          defaultValue={testJson}
          theme='vs-dark'
          />
        </Flex>
        <Flex direction={'column'}>
          <Center
            className='section-title'
            height={'5vh'}  
          >
            Output: Typescript interface
          </Center>
          <Code language='typescript' height={height}/>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}

export default App;
