---
---

document.addEventListener("DOMContentLoaded", () => {
  const poems = [
    {% assign poems_sorted = site.poems | sort: "date" | reverse %}
    {% for poem in poems_sorted %}
    {
      title: {{ poem.title | jsonify }},
      author: {{ poem.author | jsonify }},
      date: {{ poem.date | date: "%B %-d, %Y" | jsonify }},
      excerpt: {{ poem.excerpt | default: "" | jsonify }},
      warnings: {{ poem.warnings | jsonify }},
      url: {{ poem.url | relative_url | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  const searchInput = document.getElementById("poemSearch");
  const poemGrid = document.getElementById("poemGrid");
  const noResults = document.getElementById("noResults");

  function render(list) {
    poemGrid.innerHTML = list.map((poem) => {
      const warnings = Array.isArray(poem.warnings) ? poem.warnings : [];

      return `
        <article class="card poem-card" data-search="${[
          poem.title,
          poem.author,
          poem.date,
          poem.excerpt,
          ...(warnings || [])
        ].join(" ").toLowerCase()}">
          <h2>${poem.title}</h2>
          <div class="poem-meta">${poem.author} • ${poem.date}</div>
          ${poem.excerpt ? `<p class="poem-excerpt">${poem.excerpt}</p>` : ""}
          ${warnings.length ? `<div class="warning-list">${warnings.map(w => `<span class="warning-pill">${w}</span>`).join("")}</div>` : ""}
          <a class="poem-link" href="${poem.url}">Read poem</a>
        </article>
      `;
    }).join("");

    noResults.hidden = list.length !== 0;
  }

  function filterPoems() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      render(poems);
      return;
    }

    const filtered = poems.filter((poem) => {
      const haystack = [
        poem.title,
        poem.author,
        poem.date,
        poem.excerpt,
        ...(Array.isArray(poem.warnings) ? poem.warnings : [])
      ].join(" ").toLowerCase();

      return haystack.includes(query);
    });

    render(filtered);
  }

  searchInput.addEventListener("input", filterPoems);
  render(poems);
});