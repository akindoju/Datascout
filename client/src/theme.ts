import { IThemeSettings } from "./interfaces";

interface TokenColors {
  [key: number]: string;
}

interface TokensDark {
  grey: TokenColors;
  primary: TokenColors;
  secondary: TokenColors;
  action: { border: string };
}

// color design tokens export from Tailwind Shades
export const tokensDark: TokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually adjusted
  },
  primary: {
    // blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45", // Manually adjusted
    700: "#101624", // Manually adjusted
    800: "#0D1025",
    900: "#0B101A", //Manually adjusted
  },
  secondary: {
    50: "#E4F7F8",
    100: "#CCEEF2",
    200: "#9CD7E5",
    300: "#248cd6", //Manually adjusted
    400: "#3B94CB",
    500: "#2A669F",
    600: "#234B83",
    700: "#1B3366",
    800: "#14204A",
    900: "#0C102E",
    0.5: "rgba(36, 140, 214, 0.25)", //Reduced Opacity, manually added
  },
  action: { border: "rgba(255, 255, 255, 0.08)" },
};

// function that reverses the color palette
const reverseTokens = (tokensDark: TokensDark) => {
  const reversedTokens: Record<string, Record<number, string>> = {};

  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;

    const reversedObj: Record<number, string> = {};

    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      reversedObj[keys[i]] = values[length - i - 1];
    }

    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
};

export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode: "dark" | "light"): IThemeSettings => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[900],
              alt: tokensDark.primary[700],
            },
            action: {
              ...tokensDark.action,
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
            action: {
              ...tokensDark.action,
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
