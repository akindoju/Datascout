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
  palette?: {
    mode: "dark" | "light";
    primary: PaletteSettings;
    secondary: PaletteSettings;
    neutral: PaletteSettings;
    action: { border: string };
    background: {
      default: string;
      alt: string;
    };
  };
  typography?: {
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

export interface LineChartData {
  id: string | number;
  color?: string;
  data: { x: string | number | Date; y: string | number | Date }[];
}
