const API_URL = "https://book-api-production-0b17.up.railway.app";

async function loadBooks() {
  try {
    const res = await fetch(`${API_URL}/books`);
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

// Load books when page opens
loadBooks();
