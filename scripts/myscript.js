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

// General Update Pattern 1
function bindStrong(svg, center, data, label, textElement) {
    const numNodes = data.length;
    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");
    const distance = Math.min(svgWidth, svgHeight) / 4;
    const angleIncrement = (2 * Math.PI) / numNodes;

    const nodes = new Array(numNodes).fill(null).map((_, i) => ({
        x:
            svgWidth / 2 +
            distance * Math.cos(i * angleIncrement) +
            Math.random() * 20,
        y:
            svgHeight / 2 +
            distance * Math.sin(i * angleIncrement) +
            Math.random() * 20,
        value: data[i],
    }));

    const links = nodes.map((node) => ({
        source: { x: svgWidth / 2, y: svgHeight / 2 },
        target: node,
    }));

    const simulation = d3
        .forceSimulation(nodes)
        .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
        .force("charge", d3.forceManyBody().strength(-200))
        .force(
            "link",
            d3
                .forceLink(links)
                .distance(distance * 1.5)
                .strength(0.5)
        )
        .force(
            "attractToCenter",
            d3.forceRadial(distance / 4, svgWidth / 2, svgHeight / 2)
        )
        .force(
            "collision",
            d3.forceCollide().radius((d) => (d === center ? 0 : 22))
        )
        .on("tick", tick);

    const link = svg
        .selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke", "black");

    const circle = svg
        .selectAll(".data-circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "data-circle")
        .attr("fill", "#e6b1f8")
        .attr("r", 20)
        .on("mouseover", function (event, attr) {
            textElement.text(label[data[attr["index"]]]);
        })
        .on("mouseout", function () {
            textElement.text("");
        });

    const centerCircle = svg
        .selectAll(".center-circle")
        .data([center])
        .enter()
        .append("circle")
        .attr("class", "center-circle")
        .attr("fill", "maroon")
        .attr("r", 20);

    function tick() {
        link.attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);
        circle.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        centerCircle.attr("cx", svgWidth / 2).attr("cy", svgHeight / 2);
    }
}

function bindWeak(svg, center, data, label, textElement) {
    const numNodes = data.length;
    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");
    const distance = Math.min(svgWidth, svgHeight) / 4;
    const angleIncrement = (2 * Math.PI) / numNodes;

    const nodes = new Array(numNodes).fill(null).map((_, i) => ({
        x:
            svgWidth / 2 +
            distance * Math.cos(i * angleIncrement) +
            Math.random() * 30,
        y:
            svgHeight / 2 +
            distance * Math.sin(i * angleIncrement) +
            Math.random() * 30,
        value: data[i],
    }));

    const links = nodes.map((node) => ({
        source: { x: svgWidth / 2, y: svgHeight / 2 },
        target: node,
    }));

    const simulation = d3
        .forceSimulation(nodes)
        .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
        .force("charge", d3.forceManyBody().strength(-200))
        .force(
            "link",
            d3
                .forceLink(links)
                .distance(distance * 1.5)
                .strength(0.5)
        )
        .force(
            "attractToCenter",
            d3.forceRadial(distance / 4, svgWidth / 2, svgHeight / 2)
        )
        .force(
            "collision",
            d3.forceCollide().radius((d) => (d === center ? 0 : 22))
        )
        .on("tick", tick);

    const link = svg
        .selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("stroke", "black")
        .attr("stroke-dasharray", "5,5");

    const circle = svg
        .selectAll(".data-circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "data-circle")
        .attr("fill", "#c3b1ca")
        .attr("r", 20)
        .on("mouseover", function (event, attr) {
            textElement.text(label[data[attr["index"]]]);
        })
        .on("mouseout", function () {
            textElement.text("");
        });

    const centerCircle = svg
        .selectAll(".center-circle")
        .data([center])
        .enter()
        .append("circle")
        .attr("class", "center-circle")
        .attr("fill", "maroon")
        .attr("r", 20);

    function tick() {
        link.attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);
        circle.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        centerCircle.attr("cx", svgWidth / 2).attr("cy", svgHeight / 2);
    }
}

function drawDependencyGraph(
    givenWord,
    svg,
    binder,
    textElementO,
    textElementE
) {
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

    textElementO.text(closestMatch);
    console.log(closestMatch);
    console.log(closestIndex);

    svg.selectAll("circle").remove();
    svg.selectAll(".link").remove();

    // Center
    center = svg
        .append("circle")
        .attr("cx", svg.attr("width") / 2)
        .attr("cy", svg.attr("height") / 2)
        .attr("r", 20)
        .attr("fill", "maroon");

    binder(
        svg,
        center,
        dependency[closestIndex]["strong"],
        label,
        textElementE
    );
}

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

const textGroup1 = svg1
    .append("g")
    .attr("transform", `translate(${svg1.attr("width") - 10}, 20)`)
    .attr("text-anchor", "end");

const textElement1 = textGroup1
    .append("text")
    .attr("id", "p1")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .text("");

const textGroup2 = svg1
    .append("g")
    .attr("transform", `translate(10, 20)`)
    .attr("text-anchor", "start");

const textElement2 = textGroup2
    .append("text")
    .attr("id", "p1")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .text("");

document.getElementById("submitBtn1").addEventListener("click", function () {
    const inputWord = document.getElementById("textbox1").value.trim();

    if (inputWord !== null && inputWord !== "") {
        drawDependencyGraph(
            inputWord,
            svg1,
            bindStrong,
            textElement1,
            textElement2
        );
    } else {
        drawDependencyGraph(
            "ggplot2",
            svg1,
            bindStrong,
            textElement1,
            textElement2
        );
    }
});

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

const textGroup3 = svg2
    .append("g")
    .attr("transform", `translate(${svg1.attr("width") - 10}, 20)`)
    .attr("text-anchor", "end");

const textElement3 = textGroup3
    .append("text")
    .attr("id", "p1")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .text("");

const textGroup4 = svg2
    .append("g")
    .attr("transform", `translate(10, 20)`)
    .attr("text-anchor", "start");

const textElement4 = textGroup4
    .append("text")
    .attr("id", "p1")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .text("");

document.getElementById("submitBtn2").addEventListener("click", function () {
    const inputWord = document.getElementById("textbox2").value.trim();

    if (inputWord !== null && inputWord !== "") {
        drawDependencyGraph(
            inputWord,
            svg2,
            bindWeak,
            textElement3,
            textElement4
        );
    } else {
        drawDependencyGraph(
            "ggplot2",
            svg2,
            bindWeak,
            textElement3,
            textElement4
        );
    }
});

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

const textGroup5 = svg3
    .append("g")
    .attr("transform", `translate(${svg1.attr("width") - 10}, 20)`)
    .attr("text-anchor", "end");

const textElement5 = textGroup5
    .append("text")
    .attr("id", "p1")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .text("");

const textGroup6 = svg3
    .append("g")
    .attr("transform", `translate(10, 20)`)
    .attr("text-anchor", "start");

const textElement6 = textGroup6
    .append("text")
    .attr("id", "p1")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .text("");

document.getElementById("submitBtn3").addEventListener("click", function () {
    const inputWord = document.getElementById("textbox3").value.trim();

    if (inputWord !== null && inputWord !== "") {
        drawDependencyGraph(
            inputWord,
            svg3,
            bindStrong,
            textElement5,
            textElement6
        );
    } else {
        drawDependencyGraph(
            "ggplot2",
            svg3,
            bindStrong,
            textElement5,
            textElement6
        );
    }
});
