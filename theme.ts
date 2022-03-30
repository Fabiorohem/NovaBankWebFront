import { extendTheme, ThemeConfig, theme as base, withDefaultVariant } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode:'dark',
    useSystemColorMode: false,
};

export const theme = extendTheme({
    config,
    colors: {
        "gray.dark": "#1C1C1C",
        "gray.light": "#646464",
        "brand.red": "#E14949",
				"green.light":"#48BB78",
    },
    fonts: {
        heading: `Circular Std Bold, ${base.fonts?.heading}`,
        body: `Circular Std Book, ${base.fonts?.body}`,
    },
    textStyles: {
    },

});