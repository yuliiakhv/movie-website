import { Box, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


export default function MovieList(props) {

    const slugify = str =>
        str
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    
        
    

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius={'lg'} overflow='hidden' m={15}>
            <Link to={slugify(props.title)} state={props.id}>
                <img src={props.image} alt={props.title}/>
                <Box p={6}>
                    <Box slugify={props.title}
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight={'tight'}> 
                        {props.title}
                    </Box>
                    <hr/>
                    <Box display={'flex'} alignItems='baseline'>
                        <Badge borderRadius={'full'} px='2'>
                            User:
                        </Badge>
                        <Box color={'grey.500'}
                            fontWeight='semibold'
                            fontSize='xs'
                            ml={'2'}>
                            {props.userId}
                        </Box>
                    </Box>
                </Box>
            </Link>
        </Box>
    )
}