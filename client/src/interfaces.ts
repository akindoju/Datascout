interface PaletteSettings {
  main: string;
  light?: string;
  [key: number]: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string | null;
  country: string;
  occupation: string;
  phoneNumber: number;
  transactions: string[];
  role: string;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IThemeSettings {
  palette: {
    mode: "dark" | "light";
    primary: PaletteSettings;
    secondary: PaletteSettings;
    neutral: PaletteSettings;
    background: {
      default: string;
      alt: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
    h2: {
      fontFamily: string;
      fontSize: number;
    };
    h3: {
      fontFamily: string;
      fontSize: number;
    };
    h4: {
      fontFamily: string;
      fontSize: number;
    };
    h5: {
      fontFamily: string;
      fontSize: number;
    };
    h6: {
      fontFamily: string;
      fontSize: number;
    };
  };
}