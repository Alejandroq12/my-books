// eslint-disable-next-line max-classes-per-file
document.addEventListener('DOMContentLoaded', () => {
  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }

  class BookList {
    constructor() {
      this.booksInfo = JSON.parse(localStorage.getItem('books') || '[]');
    }

    renderBooks(renderFn) {
      this.booksInfo.forEach((book, index) => {
        renderFn(book, () => {
          this.removeBook(index);
        });
      });
    }

    removeBook(index) {
      this.booksInfo.splice(index, 1);
      this.updateStorage();
    }

    addBook(book) {
      this.booksInfo.push(book);
      this.updateStorage();
    }

    updateStorage() {
      localStorage.setItem('books', JSON.stringify(this.booksInfo));
    }
  }

  class BooksListUI {
    constructor(bookList) {
      this.bookList = bookList;
      this.bookTemplate = document.getElementById('bookInfoTemplate');
      this.booksContainer = document.querySelector('.booksContainer');
    }

    render() {
      this.booksContainer.innerHTML = '';
      this.bookList.renderBooks((book, removeBookFn) => {
        const bookInstance = this.bookTemplate.content.cloneNode(true);
        bookInstance.querySelector('h4').textContent = book.title;
        bookInstance.querySelector('p').textContent = book.author;
        bookInstance.querySelector('.removeButton').addEventListener('click', () => {
          removeBookFn();
          this.render();
        });
        this.booksContainer.appendChild(bookInstance);
      });
    }
  }

  const bookList = new BookList();
  const booksListUI = new BooksListUI(bookList);

  document.getElementById('addBookButton').addEventListener('click', (event) => {
    event.preventDefault();

    const bookTitleInput = document.getElementById('bookTitle');
    const authorNameInput = document.getElementById('bookAuthor');
    const bookTitle = document.getElementById('bookTitle').value;
    const authorName = document.getElementById('bookAuthor').value;
    const newBook = new Book(bookTitle, authorName);
    bookList.addBook(newBook);
    booksListUI.render();
    // Clear the input fields after adding the book
    bookTitleInput.value = '';
    authorNameInput.value = '';
  });

  booksListUI.render();

  const navBooks = document.getElementById('navBooks');
  const navAddBook = document.getElementById('navAddBook');
  const navContact = document.getElementById('navContact');

  const booksSection = document.getElementById('booksSection');
  const addBookSection = document.getElementById('addBookSection');
  const contactSection = document.getElementById('contactSection');

  function showSection(section) {
    booksSection.classList.add('hidden');
    addBookSection.classList.add('hidden');
    contactSection.classList.add('hidden');
    section.classList.remove('hidden');
  }
});
