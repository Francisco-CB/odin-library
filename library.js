const Book = {
    // SE CREA FUNCIÓN INIT PARA PODER INSERTAR PROPIEDADES
    init: function(title, author, numberOfPages, readStatus, id) {
        this.title = title,
        this.author = author,
        this.numberOfPages = numberOfPages,
        this.id = id,
        this.readStatus = readStatus,
        this.readStatus===true ? this.readMessage = "Already read" : this.readMessage = "Not read yet"
    },

    info: function() {
        return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${this.readMessage}`;
    },

    updateReadStatus: function(){
        this.readStatus===true ? this.readStatus = false : this.readStatus = true
        this.readStatus===true ? this.readMessage = "Already read" : this.readMessage = "Not read yet"
    }
}

function changeBookReadStatus(event) {
    book = mainLibrary.find(element => element.id == event.target.parentElement.id);
    book.updateReadStatus();
    // TODO: MEJORAR ESTO
    bookCard = document.getElementById(book.id);
    bookCard.childNodes[3].textContent = book.readMessage
}

function createBook(title, author, pages, read, id) {
    let newBook = Object.create(Book);
    newBook.init(title, author, pages, read, id);
    return newBook
}

function createBookCard(book){
    // EVALUAR MEJORA
    bookDiv = document.createElement("div");
    bookDiv.id = book.id;
    bookDiv.classList.add("bookCard");

    bookTitleText = document.createElement("p");
    bookTitleText.textContent = book.title;
    bookDiv.appendChild(bookTitleText);
   
    bookAuthorText = document.createElement("p");
    bookAuthorText.textContent = book.author;
    bookDiv.appendChild(bookAuthorText);
    
    bookNumberOfPagesText = document.createElement("p")
    bookNumberOfPagesText.textContent = book.numberOfPages;
    bookDiv.appendChild(bookNumberOfPagesText);
    
    bookReadStatusText = document.createElement("p")
    bookReadStatusText.textContent = book.readMessage;
    bookDiv.appendChild(bookReadStatusText);
    
    bookReadStatusButton = document.createElement("button")
    bookReadStatusButton.textContent = "READ";
    bookReadStatusButton.addEventListener("click", changeBookReadStatus)
    bookDiv.appendChild(bookReadStatusButton);

    bookRemoveButton = document.createElement("button")
    bookRemoveButton.textContent = "REMOVE";
    bookRemoveButton.addEventListener("click", removeBook)
    bookDiv.appendChild(bookRemoveButton);

    return bookDiv
}

function addBookToLibrary(){
    // EVALUAR MEJORA
    // EVALUAR CHECKEO DE VALORES (NO ACEPTAR VACÍOS)
    title = bookTitle.value;
    author = bookAuthor.value;
    pages = numberOfPages.value;
    read = readStatus.checked;
    id = mainLibrary.length;

    newBook = createBook(title, author, pages, read, id);
    newBookCard = createBookCard(newBook);
    mainLibrary.push(newBook);
    addBookCardToDisplay(newBookCard);
}

function addBookCardToDisplay(card) {
    booksContainer.appendChild(card);
}

function removeBookFromLibrary(book) {
    indx = mainLibrary.indexOf(book)
    mainLibrary.splice(indx, 1)
}

function removeBookCard(book) {
    child = document.getElementById(book.id);
    booksContainer.removeChild(child);
}

function removeBook(event) {
    book = mainLibrary.find(element => element.id == event.target.parentElement.id);
    removeBookCard(book);
    removeBookFromLibrary(book);
}

function removeAllBooks() {
    // EVALUAR CAMBIO DE LOOP
    // NO DEBERÍA HABER UN LOOP SOBRE SU LARGO SI SE ELIMINAN ELEMENTOS
    for(let i=0; i<mainLibrary.length; i++){
        removeBook(mainLibrary[i]);
    }
}

function displayLibrary(){
    for (let i=0; i<mainLibrary.length; i++){
        card = createBookCard(mainLibrary[i])
        addBookCardToDisplay(card);
    }
}

const addBookButton = document.getElementById("addBook");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const numberOfPages = document.getElementById("numberOfPages");
const readStatus = document.getElementById("readStatus");
const booksContainer = document.getElementById("books-container");

let mainLibrary = [createBook("title1", "author1", 5, true, 0), 
    createBook("title2", "author2", 6, false, 1),
    createBook("title3", "author3", 7, true, 2)];

addBookButton.addEventListener("click", addBookToLibrary);
displayLibrary();