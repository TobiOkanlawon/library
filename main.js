let myLibrary = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 708,
    hasRead: false,
  },
  {
    title: "Dude",
    author: "Jane Austen",
    pages: 100,
    hasRead: false,
  },
];
const libraryDiv = document.getElementById("library");
const bookForm = document.getElementById("add-book-form");

function addBookToLibrary(book) {
  // Variable book is of type Book
  myLibrary.push(book);
}

function handleNewBook(e) {
  e.preventDefault();
  Book.fromForm(bookForm);
  clearForm();
}

function clearForm() {
  bookForm.title.value = "";
  bookForm.author.value = "";
  bookForm.pages.value = "";
  bookForm["has-read"].checked = false;
}

class Book {
  constructor(title, author, pages, hasRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }
  info() {
    return `The title of the book is ${this.title}, the author is ${this.author} 
    and it has ${this.pages} pages.`;
  }

  static fromForm(form) {
    myLibrary.push(
      new Book(
        form.title.value,
        form.author.value,
        Number(form.pages.value),
        form["has-read"].value == "on" ? true : false
      )
    );
    showBooks(myLibrary, libraryDiv);
  }
}

function toggleReadFunction(id, library) {
  const newLibrary = library.map((book, index) => {
    if (index == id) book.hasRead = !book.hasRead;
    return book;
  });

  // change this to not mutate a global variable.
  myLibrary = newLibrary;
  showBooks(myLibrary, libraryDiv);
}

function deleteBookFunction(id, library) {
  const newLibrary = library.filter((_, index) => index !== id);

  // change this to not mutate a global variable.
  myLibrary = newLibrary;
  showBooks(myLibrary, libraryDiv);
}

function showBooks(library, libraryContainer) {
  libraryContainer.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    const book = library[i];

    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("class", "book-card");
    bookDiv.setAttribute("data-index", i);

    const bookTitle = document.createElement("p");
    bookTitle.innerText = book.title;

    bookDiv.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = book.author;

    bookDiv.appendChild(bookAuthor);

    const hasRead = document.createElement("p");
    hasRead.innerText = book.hasRead
      ? "This book has been read"
      : "This book has yet to be read";

    bookDiv.appendChild(hasRead);

    const toggleReadButton = document.createElement("button");
    toggleReadButton.innerText = book.hasRead ? "Has not read" : "Has read";
    toggleReadButton.addEventListener("click", () => {
      toggleReadFunction(i, library);
    });

    bookDiv.appendChild(toggleReadButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteBookFunction(i, library);
    });

    bookDiv.appendChild(deleteButton);

    libraryContainer.appendChild(bookDiv);
  }
}

showBooks(myLibrary, libraryDiv);
bookForm.addEventListener("submit", handleNewBook);
