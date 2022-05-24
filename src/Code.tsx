import React, { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript' // Language
import './prism-vsc-dark-plus.css' // Theme
import { Flex } from '@chakra-ui/react'



interface Props {
  language: string
  content?: string
  height?: string
}

const defaultContet: string = 
  `
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: Array<>;
    categoryId: number;
  }`.repeat(4)

const Code:React.FC<Props> = ({
  language,
  content = defaultContet, 
  height = '100%'
}) => {

  useEffect(() => {
    Prism.languages['typescript'] = Prism.languages.extend('typescript', {
      'interface': {
        pattern: /(?<=\s)[A-Z]{1}[a-z]*/,
        alias: 'class-name',
        lookbehind: true
      }
    });
  }, [])

  useEffect(() => {
    Prism.highlightAll();
  }, [content])

 
  
  const wrapperStyles = {
    margin: '0 auto',
    width: '100%',
  } as React.CSSProperties
  const preStyles  = {
    height: height,
    margin: 0,
    overflowY: 'scroll',
    flexGrow: 1
  } as React.CSSProperties


  

  return (
     <Flex 
      mt='-8px'
      style={wrapperStyles}
     >
        <pre style={preStyles}>
          <code className={`language-${language}`}>
            {content}
          </code>
        </pre>
     </Flex>
  )
}

export default Code;


