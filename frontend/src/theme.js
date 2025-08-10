import { extendTheme, theme as base } from "@chakra-ui/react";

const fonts = {
  heading: `Work Sans, ${base.fonts?.heading || "system-ui"}`,
  body: `Inter, ${base.fonts?.body || "system-ui"}`,
};

const components = {
  Button: {
    baseStyle: { fontWeight: 600 },
    defaultProps: { colorScheme: "blue" },
    variants: {
      solid: {
        borderRadius: "md",
      },
    },
  },
  Tabs: {
    baseStyle: {
      tab: { _selected: { color: "blue.600", borderColor: "blue.500" } },
    },
  },
  Input: {
    defaultProps: { focusBorderColor: "blue.400" },
  },
};

const styles = {
  global: {
    body: {
      bg: "white",
      color: "gray.800",
    },
  },
};

const customTheme = extendTheme({ fonts, components, styles });

export default customTheme;


