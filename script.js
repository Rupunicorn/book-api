const API_URL = "https://book-api-production-0b17.up.railway.app";

async function loadBooks(query="",filterType="title") {
  try {
    url = `${API_URL}/books`;
    if (query) url += `?${filterType}=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const books = await res.json();
    displayBooks(books);
  } catch (err) {
    document.getElementById("books").innerHTML = "❌ Failed to load books";
  }
}

function displayBooks(books) {
  const container = document.getElementById("books");
  container.innerHTML = books.map(book => `
    <div class="book">
      <h3>${book.title}</h3>
      <p>Genre: ${book.genre} | Rating: ⭐${book.rating}</p>
    </div>
  `).join("");
}

// Load books when text is entered and Enter key is pressed
document.getElementById("search").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const query = e.target.value.trim();
    const filterType = document.getElementById("filter-type").value;
    loadBooks(query,filterType);  // Pass query to loadBooks
} 
});

