import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2574fb",
      light: "#d0e1ff",
      dark: "#303f9f",
    },
    secondary: {
      // main: "#ff9900",
      main: "#6e19ce",
    },
    green: {
      main: "#26c738",
      dark: "#079417",
    },
    text: {
      secondary: "#898b8f",
    },
  },
  typography: {
    fontFamily: ["Lato"].join(","),
    h1: {
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.5,
      letterSpacing: "0.0075em",
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.4,
      letterSpacing: "0.00714em",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.4,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.4,
      letterSpacing: "0.01071em",
    },
    button: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.4,
      letterSpacing: "0.00214em",
      textTransform: "none",
    },
    caption: {
      fontWeight: 500,
      fontSize: "0.75rem",
      // lineHeight: 1.43,
      letterSpacing: "0.02em",
    },
    overline: {
      fontWeight: 400,
      fontSize: "0.625rem",
      lineHeight: 1.4,
      letterSpacing: "0.008333em",
      textTransform: "uppercase",
    },
  },

  overrides: {
    // Applied to the <ul> element

    MuiCheckbox: {
      root: {
        color: "#2574fb",
        "&$disabled": {
          color: "#d0e1ff",
        },
      },
    },

    MuiTooltip: {
      arrow: {
        color: "#000",
      },
      tooltip: {
        backgroundColor: "#000",
        // color: "rgba(0, 0, 0, 0.87)",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        fontSize: "0.75rem",
      },
    },
    MuiMenu: {
      list: {
        backgroundColor: "#fffff",
        padding: 0,
      },
    },
    // Applied to the <li> elements
    MuiMenuItem: {
      root: {
        fontSize: "0.875rem",
        padding: "0px 10px",
        // "&$selected": {
        //   backgroundColor: "transparent",
        // },
      },
    },
    label: {
      marginTop: 12,
    },
    MuiInput: {
      formControl: {
        marginTop: "12px!",
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: "0.875rem",
      },
    },
    MuiInputLabel: {
      formControl: {
        transform: "translate(0,20px) scale(1)",
      },
    },
    MuiInputBase: {
      root: {
        fontSize: "0.875rem",
      },
      input: {
        padding: "0px 0px 4px",
      },
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiListItemText: {
      primary: {
        fontSize: "0.875rem",
      },
      multiline: {
        marginTop: 3,
        marginBottom: 3,
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
