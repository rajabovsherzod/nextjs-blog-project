// src/lib/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#141414", // Asosiy rang
    },
    secondary: {
      main: "#dc004e", // Ikkilamchi rang
    },
    background: {
      default: "#0a0a0a", // Qora fon
      paper: "#1a1a1a", // Qog'oz uchun to'q kulrang fon
    },
    text: {
      primary: "#ffffff", // Asosiy matn rangi (oq)
      secondary: "#b0b0b0", // Ikkilamchi matn rangi (och kulrang)
    },
    divider: "#333333", // Ajratuvchi chiziq rangi
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#141414", // Navbar fon rangi
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#141414", // Toolbar fon rangi
        },
      },
    },
  },
});

export default lightTheme;
