(function () {
  "use strict";

  $(document).ready(function () {
    const sheets = document.getElementById("sheets");

    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6hHSydoaDN8ZSb_pJSi7zAKe4Vo5EUbAMy13hAUtDmG3e6hBdbQT0r5prnH1JxV7w3bDxwW2-qk_D/pub?output=csv"
    )
      .then((json) => json.text())
      .then((r) => {
        CSVToArray(r)
          .slice(1)
          .map((row) => {
            const el = document.createElement("div");
            const [name, title, project] = row;
            el.innerHTML = `
            <div class="photo">
              <p>${title} ${name}, <strong>${project}</strong></p>
            `;
            sheets.appendChild(el);
          });
      });
  });
})();

/*
$.get("data/profiles.yaml").done(function (data) {
  Object.entries(jsyaml.load(data)).map(([key, value]) => {
    const el = document.createElement("div");
    el.classList.add("person-tile");
    el.innerHTML = `
        <div class="photo">
          <img alt=${value.name.first + value.name.last} src=${
      value.image.src ? "images/" + value.image.src : "images/person.png"
    } />
        </div>
        <div class="info">
          <strong>${value.name.salutations} ${value.name.first} ${
      value.name.last
    }</strong>
          <div class="project" style="white-space: nowrap">${
            value.position.position
          }${
      value.position.project ? ", " + value.position.project : ""
    }</div>
          <div class="email">
            <a href="mailto:${value.email.email.replace(" [at] ", "@")}">${
      value.email.email
    }</a>
          </div>
        </div>
      `;
    el.appendChild(document.createElement("br"));
    people.appendChild(el);
  });
});
});

$(document).ready(function () {
const research = document.getElementById("research");
$.get("data/research.yaml").done(function (data) {
  Object.entries(jsyaml.load(data)).map(([key, value]) => {
    // console.log(key, value);
    if (!value.archived) {
      const el = document.createElement("a");
      el.classList.add("research-tile");
      el.href = value.url;
      el.innerHTML = `
          <div class="photo">
            <img alt=${key} src=${"images/" + value.image} />
          </div>
          <div class="info">
            <h3>${value.name ? value.name : key ? key : ""}</h3>
            <h4 class=${key === "null" ? "bold" : ""}>
              ${value.subtitle ? value.subtitle : ""}
            </h4>
          </div>
      `;
      research.appendChild(el);
    }
  });
});
*/
