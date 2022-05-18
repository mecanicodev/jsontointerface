import React from 'react'
import { Text ,Switch, useColorMode } from "@chakra-ui/react";

const Toogle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
    <Text>{colorMode === 'light' ? 'Dark' : 'Light'}</Text>
    <Switch onChange={toggleColorMode}/>
    </>
    // <div>Switch</div>
  )
}

export default Toogle;
