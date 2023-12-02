import { createGlobalStyle } from 'styled-components';

export const lighTheme = {
    body: "#fff",
    text: "#000",
    toggleBorder: "#FFF",
    gradient: 'linear-gradiant(#39588A, #79D7ED)'
}

export const darkTheme = {
    body: "#363537",
    text: "#FAFAFA",
    toggleBorder: "#688096",
    gradient: 'linear-gradiant(#091236, #1E215D)'
}

export const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
    box-sizing: border-box
}

body {
    aling-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    flex-direction: column;
    justify-content: center;
    font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, 
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    transition: all 0.25s linear;
}`;