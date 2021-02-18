const myLibrary = [
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

function handleSubmit() {
  Book.fromForm(bookForm);

  return false;
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

function deleteBook() {}

function showBooks(library, libraryContainer) {
  libraryContainer.innerHTML = "";
  for (let book of library) {
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("class", "book-card");
    const bookTitle = document.createElement("p");
    bookTitle.innerText = book.title;
    bookDiv.appendChild(bookTitle);
    libraryContainer.appendChild(bookDiv);
  }
}

showBooks(myLibrary, libraryDiv);
bookForm.addEventListener("submit", handleSubmit);
