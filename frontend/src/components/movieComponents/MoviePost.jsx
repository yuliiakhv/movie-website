import { Container, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviePost() {

    const location = useLocation();
    const [movieDataId, setMovieData] = useState({});
    const [movieData, setCurrentData] = useState(null);

    const fetchCurrentMovie = async(id) => {

        const respond = await fetch(
            `http://localhost/movie-website/getMovie?id=${id}`, 
            /* {
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Content-Type": "application/json"
                  }
            } */
            );
    
           return await respond.json();
    }
    
    
    useEffect(()=>{
        setMovieData(location.state);

        //get data from DB

        fetchCurrentMovie(location.state).then((item)=>{
            setCurrentData(item);
        });

        setTimeout(()=> {
            if(location.state == null) {
                window.location.href='/404';
            }
        })


    }, [location.state]);

    return (
        <>
            {movieData !=null && <Container maxW={'1200px'} marginTop={'50px'}>
                <Heading 
                size='lg'
                textAlign={'center'}
                color='gray.700'
                >
                    {movieData.title}
                </Heading>
                <br/>
                <br/>
                <img src={movieData.image} width='300px' height='100px'/>
                <br/>
                <br/>
                <br/>
                <p>
                    {movieData.body}
                </p>
                </Container>}
        </>
    )
}