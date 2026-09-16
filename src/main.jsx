import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { AboutPage } from "./AboutPage.jsx";
import { appPathname } from "./routes.js";
import "./styles.css";

const githubPagesRedirect = sessionStorage.getItem("github-pages-redirect");
if (githubPagesRedirect) {
  sessionStorage.removeItem("github-pages-redirect");
  window.history.replaceState(null, "", githubPagesRedirect);
}

const isAboutPage = appPathname().replace(/\/$/, "") === "/about";
document.title = isAboutPage ? "About Shoaib Mumtaz — Independent Designer" : "Shoaib Mumtaz — Independent Designer";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAboutPage ? <AboutPage /> : <App />}
  </React.StrictMode>,
);
