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
