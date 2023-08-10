import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  ...config,
  fonts: {
    heading: `'Poppins', sans-serif`,
  },
});
