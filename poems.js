const searchInput = document.getElementById("poemSearch");
const cards = Array.from(document.querySelectorAll(".poem-card"));
const noResults = document.getElementById("noResults");

function applyFilter() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const haystack = card.dataset.search || "";
    const match = haystack.includes(query);
    card.style.display = match ? "" : "none";
    if (match) visibleCount += 1;
  });

  noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", applyFilter);
applyFilter();
