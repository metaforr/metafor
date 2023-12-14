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

// General
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Calculate Levenshtein distance
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = a.charAt(j - 1) === b.charAt(i - 1) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return matrix[b.length][a.length];
}

// General Update Pattern
function bindStrong(svg, data) {
    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("fill", "#e6b1f8")
        .attr("cx", (d) => d * 80)
        .attr("cy", (d) => d * 80)
        .attr("r", (d) => 20);
}

function bindWeak(svg, data) {
    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("fill", "#e6b1f8")
        .attr("cx", (d) => d * 80)
        .attr("cy", (d) => d * 80)
        .attr("r", (d) => 20);
}

function drawDependencyGraph(givenWord) {
    let closestMatch = null;
    let minDistance = Infinity;
    let closestIndex = null;

    Object.keys(index).forEach((word) => {
        const distance = levenshteinDistance(givenWord, word);
        if (distance < minDistance) {
            minDistance = distance;
            closestMatch = word;
            closestIndex = index[word];
        }
    });

    console.log(closestMatch);
    console.log(closestIndex);
    // bindStrong(svg1);
    // bindWeak(svg1);
}

document.getElementById("submitBtn").addEventListener("click", function () {
    const inputWord = document.getElementById("textbox").value.trim();

    if (inputWord !== null && inputWord !== "") {
        drawDependencyGraph(inputWord);
    } else {
        alert("Please enter a valid package!");
    }
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

bindData(svg1, [1, 2, 3, 4, 5, 6]);

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
