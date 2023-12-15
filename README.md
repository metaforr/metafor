# MetaFoR

Metadata for R packages: This is our final project submission for GR5702: Exploratory Data Analysis and Visualization course at Columbia University.

![Network of Packages](./assets/dependency_graph.gif)

---

## Introduction

Finding a good R library is demanding. _ggplot2_ is might not be the answer for everything. So, we have tasked ourselves to use statistical methods to explore and visualize entirety of [CRAN](https://cran.r-project.org/) packages using what we learnt from [STATGR5702](https://edav.info/) at Columbia University.

---

## Outcome

Results (our findings) will influence our builds.

* Data: Find appropriate parameters to judge a package.
    1. Clean the `available` package's data.
    2. Retain features that well describe a package's relevance.
* Results: Research the data.
    1. Relevance is measure via trending usage data and a package usage history available via `pkgsearch` package.
    2. Provide a comprehensive understanding of factors influencing a package's popularity and characteristics within the ecosystem.
* Interactive Graphs:
    1. Build a keystroke animation using `d3` which animates dependency graph of queried package.
    2. Build a package suggester by `tokenizing` keywords associated with each package's metadata.
    3. Build a package _backlink_ tracer, which shows how many times another package found this package useful.

### Where?

* Data Cleaning is in [Data](https://metaforr.github.io/metafor/data.html)  section.
* Research Results are in [Results](https://metaforr.github.io/metafor/results.html) section.
* Playable Graphs are in [Interactive Graph](https://metaforr.github.io/metafor/d3graph.html) section.

---

## Authors

- Bhargav Kantheti (bk2899)
- Ryuichiro Sonoda (rs4493)

---

## Credits

We are using data from two R packages:

- **available** [CRAN](https://cran.r-project.org/web/packages/available/index.html): This package let us "Check if the Title of a Package is Available, Appropriate and Interesting".
- **pkgsearch** [CRAN](https://cran.r-project.org/web/packages/pkgsearch/index.html): This package helped us "Search CRAN metadata about packages by keyword, popularity, recent activity, package name and more. Uses the 'R-hub' search server, see <https://r-pkg.org> and the CRAN metadata database, that contains information about CRAN packages."
