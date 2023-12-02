import React, {useState, useEffect} from 'react';
import { Paginator, Container, PageGroup, usePaginator } from 'chakra-paginator';
import { Grid } from '@chakra-ui/react';
import MovieList from '../movieComponents/MovieList';



export default function Home() {

    const [moviesTotal, setMoviesTotal] = useState(undefined);
    const [movies, setMovies] = useState([]);

    const {
        pagesQuantity,
        offset,
        currentPage,
        setCurrentPage,
        pageSize,
    } = usePaginator({
        total: moviesTotal,
        initialState: {
            pageSize: 10,
            isDisabled: false,
            currentPage: 1
        }
    });

    const normalStyles = {
        w: 10,
        h: 10,
        bg: "#333",
        color: "#fff",
        fontSize: 'lg',
        _hover: {
            bg: 'red',
            color: '#fff'
        }
    };

    const activeStyles = {
        w: 10,
        h: 10,
        bg: "green",
        color: "#fff",
        fontSize: 'lg',
        _hover: {
            bg: 'blue',
        }
    };

   // Getting data from db
   
   const fetchMovies = async (pageSize, offset) => {
       const respond = await fetch(`http://localhost/movie-website/?limit=${pageSize}&offset=${offset}`);

       return await respond.json();
   }
    
    useEffect(() => {

        fetchMovies(pageSize, offset).then((movies) => {
           setMoviesTotal(movies.count);
           setMovies(movies.movies);
        })
    }, [currentPage, pageSize, offset])

    return (
            <Paginator
            pagesQuantity={pagesQuantity}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            normalStyles={normalStyles}
            activeStyles={activeStyles}>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {movies.map(function({id, title, body, userId, image}){
                    return <MovieList key={id} id={id} title={title} body={body}
                    userId={userId} image={image}/>
                })}
            </Grid>
            <Container align='center' justify="space-between" w='full' p={4} marginTop="50px">
                <PageGroup isInline align="center"></PageGroup>
            </Container>
        </Paginator>
        
    )
}