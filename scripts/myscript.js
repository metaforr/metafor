// * Global Resources

let H = window.innerHeight * 0.65;
let W = window.innerWidth * 0.75;

// * Code for Dependency Graph

// Fetching Data

let dependency;

fetch("../d3-data/dependency.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        dependency = data;
        console.log(dependency["4"]);
    })
    .catch((error) => {
        console.error("There was a problem fetching the JSON file:", error);
    });

let index;

fetch("../d3-data/indices.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        index = data;
        console.log(index["abacus"]);
    })
    .catch((error) => {
        console.error("There was a problem fetching the JSON file:", error);
    });

let label;

fetch("../d3-data/labels.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        label = data;
        console.log(label[4]);
    })
    .catch((error) => {
        console.error("There was a problem fetching the JSON file:", error);
    });

// Creating Play Pen 1
const svg1 = d3
    .select("div#plot1")
    .append("svg")
    .attr("width", W)
    .attr("height", H);

const pen1 = svg1
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#d3e4cd");

// Creating Play Pen 2
const svg2 = d3
    .select("div#plot2")
    .append("svg")
    .attr("width", W)
    .attr("height", H);

const pen2 = svg2
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#d3e4cd");

// Creating Play Pen 3
const svg3 = d3
    .select("div#plot3")
    .append("svg")
    .attr("width", W)
    .attr("height", H);

const pen3 = svg3
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#d3e4cd");
