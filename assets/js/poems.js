document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("poemSearch");
  const cards = Array.from(document.querySelectorAll(".poem-card"));
  const noResults = document.getElementById("noResults");

  function filterCards() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    for (const card of cards) {
      const haystack = (card.dataset.search || "").toLowerCase();
      const match = query === "" || haystack.includes(query);
      card.style.display = match ? "" : "none";
      if (match) visibleCount += 1;
    }

    noResults.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener("input", filterCards);
  filterCards();
});