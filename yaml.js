(function () {
  "use strict";

  $(document).ready(function () {
    const people = document.getElementById("people");
    $.get("data/people.yaml").done(function (data) {
      Object.entries(jsyaml.load(data)).map(([key, value]) => {
        if (!value.alumnus) {
          const el = document.createElement("div");
          el.classList.add("person-tile");
          el.innerHTML = `
            <div class="photo">
              <img alt=${key} src=${"images/" + value.image} />
            </div>
            <div class="info">
              <strong>${key}</strong>
              <div style="white-space: nowrap">${value.title}</div>
              <div class="email">
                <a href="mailto:${value.email}">${value.email}</a>
              </div>
            </div>
          `;
          el.appendChild(document.createElement("br"));
          people.appendChild(el);
        }
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
              <h3>${key !== "null" ? key : null}</h3>
              <h4 class=${key === "null" ? "bold" : ""}>
                ${value.subtitle ? value.subtitle : null}
              </h4>
            </div>
          `;
          research.appendChild(el);
        }
      });
    });
  });
})();
