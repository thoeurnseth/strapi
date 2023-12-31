export default {
    config: {
      // Override or extend the theme
      theme: {
        colors: {
          alternative100: "#f6ecfc",
          alternative200: "#e0c1f4",
          alternative500: "#ac73e6",
          alternative600: "#9736e8",
          alternative700: "#8312d1",
          danger700: "#b72b1a",
        },
      },
      // // Extend the translations
      translations: {
        en: {
          "app.components.LeftMenu.navbrand.title": "ELECTRONIC",
          "app.components.LeftMenu.navbrand.workplace": "Dashboard",
          "Auth.form.welcome.title": "Welcome to Electronic!)",
        },
        fr: {
          "Auth.form.email.label": "test",
          Users: "Utilisateurs",
          City: "CITY (FRENCH)",
          // Customize the label of the Content Manager table.
          Id: "ID french",
        },
      },
      // Disable video tutorials
      tutorials: false,
      // Disable notifications about new Strapi releases
      // notifications: { release: false },
    },
  
    bootstrap() {},
  };