import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue('dark', 'light');
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (<IconButton
        size="lg"
        fontSize="20px"
        variant="outline"
        color="current"
        aria-label="Switch color mode"
        onClick={toggleColorMode}
        icon={<SwitchIcon/>}
        {...props}
    />);
}