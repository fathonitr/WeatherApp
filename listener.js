import { defaultFetch, perInputFetch } from "./fetcher.js";

export default function runner() {
  window.addEventListener("load", () => {
    defaultFetch();
    onSearchBar();
  });
}

const onSearchBar = () => {
  const input = document.querySelector(".search-bar");
  input.addEventListener("keypress", (e) => {
    perInputFetch(e, input);
  });
};
