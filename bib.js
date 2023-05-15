(function () {
  "use strict";

  $(document).ready(function () {
    const publications = document.getElementById("publications");
    $.get("data/publications.bib").done(function (data) {
      // DEV: get and create year elements from data
      let years = bibtexParse
        .toJSON(data)
        .filter((ref) => ref.entryTags.year)
        .map((ref) => Number(ref.entryTags.year));

      [...new Set(years)].reverse().map((y) => {
        const year = document.createElement("div");
        year.id = y;
        year.innerHTML = `<h3 class="year">${y}</h3>`;

        const bibtex = bibtexParse
          .toJSON(data)
          .filter((ref) => ref.entryTags.year == y);

        bibtex.map((ref) => {
          const el = document.createElement("div");
          el.innerHTML = `
            <div>${ref.entryTags.author.replace(/ and /g, "; ")}</div>
            <div>
              <strong>${ref.entryTags.title}</strong>
            </div>
            <div style="color: #888">
              ${
                ref.entryTags.journal ||
                ref.entryTags.booktitle ||
                ref.entryTags.publisher
              }${""}${
            ref.entryTags.journal ||
            ref.entryTags.booktitle ||
            ref.entryTags.publisher
              ? ", "
              : ""
          }
              ${ref.entryTags.year}${"."}
              ${`[${ref.entryType[0].toUpperCase()}${ref.entryType.slice(1)}]`}
            </div>
            <div style="font-size: 0.83em">
            ${
              ref.entryTags.doi
                ? `<a href="https://doi.org/${ref.entryTags.doi}">link</a>`
                : `<strike>link</strike>`
            }${" "}
              / <strike>bibtex</strike>
              </div>
              <br/>
          `;
          year.appendChild(el);
        });

        if (bibtex.length) publications.after(year);
      });
      document.getElementsByClassName("year")[0].style.marginTop = 0;
    });
  });
})();
