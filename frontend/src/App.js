import Home from './components/pages/Home';
import About from './components/pages/About';
import { ThemeProvider } from 'styled-components';
import { lighTheme, darkTheme, GlobalStyle } from './theme';
import { ChakraProvider, Box, Switch, GridItem, Stack, Text, Flex, HStack, Spacer, Container } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { MoonIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import './App.css';

function App() {

  const [theme, setTheme] = useState("light");
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  //setting switch on or off

  const changeThemeSwitch = () => {

    let currSwitch = null;
    currSwitch = !isSwitchOn;

    setIsSwitchOn(currSwitch);
    
    !currSwitch ? setTheme('dark') : setTheme('light');
  }

  return (
    <ChakraProvider>
      <ThemeProvider theme={theme === 'light' ? lighTheme : darkTheme}>
        <BrowserRouter>
          <GlobalStyle/>
          <Box bg={theme === 'light' ? '#333' : '#fff'}
               borderBottom = {theme === 'light' ? 'solid 1px #333' : 'solid 1px #fff'}
               color={theme === 'light' ? '#fff' : '#333'} px='20px'>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
              <HStack spacing={16} alignItems={'left'}>
                <HStack as={'nav'}
                        spacing={6}
                        display={{ base: 'none', md: 'flex'}}>
                  <Link to="/">
                    Home
                  </Link>
                  <Link to="/about">
                    About
                  </Link>
                </HStack>
                </HStack>
                <Search2Icon></Search2Icon>
                <Flex alignItems={'center'}>
                  <Spacer></Spacer>
                  <Stack direction={'row'} spacing={7}>
                    <Switch onChange={changeThemeSwitch}>
                      {isSwitchOn ? (<MoonIcon mr="5"></MoonIcon>) : (<SunIcon mr="5"></SunIcon>)}
                    </Switch>
                  </Stack>
                </Flex>
            </Flex>
          </Box>
          <div className='App'>
            <Container>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
              </Routes>
            </Container>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ChakraProvider>
    
  );
}

export default App;
