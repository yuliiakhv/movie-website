import Home from './components/pages/Home';
import About from './components/pages/About';
import MoviePost from './components/movieComponents/MoviePost';
import NotFound from './components/movieComponents/NotFound';
import { ThemeProvider } from 'styled-components';
import { lighTheme, darkTheme, GlobalStyle } from './theme';
import { ChakraProvider, Box, Switch, Stack, Flex, HStack, 
  Spacer, Container, useDisclosure, Modal, ModalOverlay,
  ModalBody, ModalContent, ModalHeader, FormControl, Input,
  ModalFooter, Button, UnorderedList, ListItem } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { MoonIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import './App.css';

function App() {

  const [theme, setTheme] = useState("light");
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResItems, setSearchResItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  const slugify = str =>
        str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');

  //setting switch on or off

  const changeThemeSwitch = () => {

    let currSwitch = null;
    currSwitch = !isSwitchOn;

    setIsSwitchOn(currSwitch);
    
    !currSwitch ? setTheme('dark') : setTheme('light');
  }

  //get search result from DB

  const fetchSearchResults = async(searchTerm) => {
    
    const respond = await fetch(
      `http://localhost/movie-website/searchResult?keyword=${searchTerm}`,
    /* {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Content-Type' : 'application/json'
      }
    } */);
       return await respond.json();
  }
  
  //fetch data while searching

  useEffect(()=>{

    const getUserInput = setTimeout(()=>{
      fetchSearchResults(searchTerm).then((items)=> {
       
        setSearchResItems(items.movies);
      });
    },100)

    return () => clearTimeout(getUserInput);

  }, [searchTerm])

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
                <Search2Icon onClick={onOpen}></Search2Icon>
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
          <Modal
          initialFocusRef={initialRef}
          isCentered
          isOpen={isOpen}
          onClose={onClose}
          motionPreset='slideInBottom'
          bg='blue'>
            <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'>
              <ModalContent>
          <ModalHeader
          color='#333'
          >Type keyword to search</ModalHeader>
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <Input 
              ref={initialRef} 
              placeholder='' 
              color='#333'
              onChange={(e)=> setSearchTerm(e.target.value)}/>
            </FormControl>
            <br/>
            {searchResItems && 
            <UnorderedList>
              {searchResItems.map(function(item){
                return (<Link to={slugify(item.title)} key={item.id} state={item.id}>
                  <ListItem key={item.id}>{item.title}</ListItem></Link>)
              })}
            </UnorderedList>}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
            </ModalOverlay>
          </Modal>
          <div className='App'>
            <Container>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path=':movie' element={<MoviePost />}></Route>
                <Route path='/404' element={<NotFound />}></Route>
              </Routes>
            </Container>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ChakraProvider>
    
  );
}

export default App;
