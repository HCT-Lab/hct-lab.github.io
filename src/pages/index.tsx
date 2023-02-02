import * as React from "react";
import * as ReactDOM from "react-dom";

import banner from "images/banner.png";
import ubc from "images/ubc.png";

import yaml from "js-yaml";
import people from "data/people.yaml";
import projects from "data/projects.yaml";

import bibtexParse from "@orcid/bibtex-parse-js";
import refs from "data/refs.bib";

const authors = ["Mohapatra", "Gick", "Shamei", "Liu", "Easthope", "Gao"];

const Index = () => {
  const entry = (reference) => (
    <>
      <div>
        <div>{reference.entryTags.author.replace(/ and /g, "; ")}</div>
        <div>
          <strong>{reference.entryTags.title}</strong>
        </div>
        <div style={{ color: "#999" }}>
          {reference.entryTags.journal ||
            reference.entryTags.booktitle ||
            reference.entryTags.publisher}
          {reference.entryTags.journal ||
          reference.entryTags.booktitle ||
          reference.entryTags.publisher
            ? ", "
            : ""}
          {reference.entryTags.year}.{" "}
          {`[${reference.entryType[0].toUpperCase()}${reference.entryType.slice(
            1
          )}]`}
        </div>
        <div style={{ fontSize: "0.83em" }}>
          {reference.entryTags.doi ? (
            <a href={`https://doi.org/${reference.entryTags.doi}`}>link</a>
          ) : (
            <strike>link</strike>
          )}{" "}
          / <strike>bibtex</strike>
        </div>
        <div></div>
      </div>
      <br />
    </>
  );

  return (
    <>
      <div className="banner">
        <img src={banner} alt="HCT banner image"></img>
      </div>
      <main>
        <header>
          <img src={""} alt="HCT logo"></img>
          <div className="column">
            <h1>HCT Lab</h1>
            <h3>Human Communication Technologies Lab</h3>
            <div className="optional">
              Realizing effective communication of human experience using
              information technology.
            </div>
          </div>
        </header>
        <hr />
        <h2>People</h2>
        <div className="wrapper">
          {Object.entries(yaml.load(people)).map(([key, value]) => {
            return (
              <>
                <div className="person-tile">
                  <div className="photo">
                    <img alt={key} src={"/" + value.image} />
                  </div>
                  <div className="info">
                    <strong>{key}</strong>
                    <div>{value.title}</div>
                    <div style={{ fontSize: "0.83em" }}>
                      <a href={`mailto:${value.email}`}>{value.email}</a>
                    </div>
                  </div>
                </div>
                <br />
              </>
            );
          })}
        </div>
        <h2>Projects</h2>
        <div className="wrapper">
          {Object.entries(yaml.load(projects)).map(([key, value]) => {
            return (
              <a href={value.path}>
                <div className="research-tile">
                  <div className="photo">
                    <img alt={key} src={"/" + value.image} />
                  </div>
                  <div className="info">
                    <h3>{key !== "null" ? key : null}</h3>
                    <h4 className={key === "null" ? "bold" : ""}>
                      {value.subtitle ? value.subtitle : null}
                    </h4>
                    <div>{value.description}</div>
                  </div>
                </div>
                <br />
              </a>
            );
          })}
        </div>
        <h2>Publications</h2>
        <h3>2021</h3>
        {bibtexParse
          .toJSON(refs)
          .filter(
            (reference) =>
              authors.some((a) => reference.entryTags.author.includes(a)) &&
              reference.entryTags.year == "2021"
          )
          .map((reference) => entry(reference))}
        <h3>2020</h3>
        {bibtexParse
          .toJSON(refs)
          .filter(
            (reference) =>
              authors.some((a) => reference.entryTags.author.includes(a)) &&
              reference.entryTags.year == "2020"
          )
          .map((reference) => entry(reference))}
        <h2>Contact</h2>
        <div>
          <strong>Human Communication Technologies Lab</strong>
        </div>
        <div>x427/x509, ICICS X-Wing</div>
        <div>2366 Main Mall</div>
        <div>Vancouver, BC, Canada</div>
        <div>V6T 1Z4</div>
        <br />
        <div>Tel: +1 (604) 822-4583</div>
        <div>
          Website: <a href="https://hct.ece.ubc.ca">hct.ece.ubc.ca</a>
        </div>
        <div>
          Email: <a href="mailto:ssfels@ece.ubc.ca">ssfels at ece.ubc.ca</a>
        </div>
        <br />
        <footer>Copyright &copy; Human Communication Technologies Lab.</footer>
      </main>
    </>
  );
};

export default Index;
