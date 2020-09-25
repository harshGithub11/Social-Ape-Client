const theme = {
    palette: {
      primary: {
        light: "#80e27e",
        main: "#4caf50",
        dark: "#087f23",
        contrastText: "#fff"
      },
      secondary: {
        light: "#ff5a36",
        main: "#ff0000",
        dark: "#c20000",
        contrastText: "#fff"
      }
    },
    spreadThis: {
      form: {
        textAlign: "center"
      },
      appIcon: {
        height: 50,
        width: 50,
        margin: "10px auto 10px auto"
      },
      pageTitle: {
        margin: "10px auto 10px auto"
      },
      textField: {
        margin: "10px auto 10px auto"
      },
      button: {
        margin: 10,
      },
      customError: {
        color: "red",
        fontSize: "0.8rem",
        margin: 10
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: 20
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      paper: {
        marginTop: 20,
        marginRight: 20,
        padding: 20,
      },
      buttons: {
        textAlign: "center",
        margin: 10,
        "& : hover": {
          margin: "0 0 10px 0",
        },
      },
      profile: {
        "& .image-wrapper": {
          textAlign: "center",
          position: "relative",
          "& button": {
            position: "absolute",
            top: "80%",
            left: "70%",
          },
        },
        "& .profile-image": {
          width: 200,
          height: 200,
          objectFit: "cover",
          maxWidth: "100%",
          borderRadius: "50%",
        },
        "& .profile-details": {
          textAlign: "center",
          "& span, svg": {
            verticalAlign: "middle",
          },
          "& a": {
            color: "#4caf50",
          },
        },
        "& hr": {
          border: "none",
          margin: "0 0 10px 0",
        },
        "& svg.button": {
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    }
};

export default theme;
