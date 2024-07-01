const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read" : "not read yet"
  }`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const modal = document.getElementById("formModal");
const btn = document.getElementById("addBookBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const submitBtn = document.getElementsByClassName("submit-btn")[0];
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  displayBook(newBook);

  modal.style.display = "none";
});

function displayBook(book) {
  const bookLibrary = document.getElementsByClassName("book-library")[0];
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";

  bookCard.innerHTML = `
    <h3 class="book-title">Book Title: ${book.title}</h3>
    <p class="book-author">Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p class="book-read-status">${book.read ? "Read" : "Not read yet"}</p>
    <button class="toggle-read-btn">
      Toggle Read
     </button>
     <button class="delete-btn">Delete</button>
  `;

  bookLibrary.appendChild(bookCard);

  const toggleReadBtn = bookCard.getElementsByClassName("toggle-read-btn")[0];
  toggleReadBtn.addEventListener("click", () => {
    book.read = !book.read;
    const readStatus = bookCard.getElementsByClassName("book-read-status")[0];
    readStatus.textContent = book.read ? "Read" : "Not read yet";
  });

  const deleteBtn = bookCard.getElementsByClassName("delete-btn")[0];
  deleteBtn.addEventListener("click", () => {
    bookLibrary.removeChild(bookCard);
    const index = myLibrary.indexOf(book);
    if (index > -1) {
      myLibrary.splice(index, 1);
    }
  });
}
