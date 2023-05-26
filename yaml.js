(function () {
  "use strict";

  $(document).ready(function () {
    const people = document.getElementById("people");
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
              <div style="white-space: nowrap">${value.position.position}${
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
          const el = document.createElement("div");
          el.classList.add("research-tile");
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
  });
})();
