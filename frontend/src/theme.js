import { extendTheme, theme as base } from "@chakra-ui/react";

const fonts = {
  heading: `Work Sans, ${base.fonts?.heading || "system-ui"}`,
  body: `Inter, ${base.fonts?.body || "system-ui"}`,
};

// Calm & Professional (WhatsApp-like)
const colors = {
  brand: {
    primary: "#25D366", // fresh green
    secondary: "#075E54", // deep teal
    background: "#F5F6FA", // soft light gray (light mode)
    text: "#202C33", // dark charcoal
    surface: "#FFFFFF",
  },
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const components = {
  Button: {
    baseStyle: { fontWeight: 600 },
    variants: {
      solid: {
        borderRadius: "md",
        bg: colors.brand.primary,
        color: "white",
        _hover: { bg: "#1EB85A" },
        _active: { bg: "#197F40" },
      },
      ghost: {
        color: colors.brand.secondary,
        _hover: { bg: "rgba(7,94,84,0.08)" },
      },
    },
    defaultProps: { variant: "solid" },
  },
  Tabs: {
    baseStyle: {
      tab: { _selected: { color: colors.brand.secondary, borderColor: colors.brand.secondary } },
    },
  },
  Accordion: {
    baseStyle: {
      button: {
        _focus: { boxShadow: "none", outline: "none" },
        _focusVisible: { boxShadow: "none", outline: "none" },
      },
    },
  },
  Input: {
    defaultProps: { focusBorderColor: colors.brand.secondary },
  },
};

const styles = {
  global: {
    body: {
      bg: colors.brand.background,
      color: colors.brand.text,
    },
  },
};

const customTheme = extendTheme({ fonts, components, styles, colors, config });

export default customTheme;


