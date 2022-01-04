class Book {
    constructor(title, author, numberOfPages, readStatus, id) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.id = id;
        readStatus === true ? this.readMessage = "Already read" : this.readMessage = "Not read yet";
    }
    
    updateReadStatus (){
        this.readStatus === true ? this.readStatus = false : this.readStatus = true
        this.readStatus === true ? this.readMessage = "Already read" : this.readMessage = "Not read yet"
    }
}

libraryController = (() => {
    const booksContainer = document.querySelector(".books-container");

    const bookTitle = document.getElementById("bookTitle");
    const bookAuthor = document.getElementById("bookAuthor");
    const numberOfPages = document.getElementById("numberOfPages");
    const readStatus = document.querySelector("#toggle-read input[name='readToggle']");

    const mainLibrary = [createBook("title1", "author1", 5, true, 0), 
        createBook("title2", "author2", 6, false, 1),
        createBook("title3", "author3", 7, true, 2)];

    function createBook(title, author, pages, read, id) {
        let newBook = new Book(title, author, pages, read, id);
        return newBook
    }

    function createBookCard(book){
        bookDiv = document.createElement("div");
        bookDiv.id = book.id;
        bookDiv.classList.add("bookCard");
    
        bookTitleText = document.createElement("div");
        bookTitleText.textContent = book.title;
        bookDiv.appendChild(bookTitleText);
       
        bookAuthorText = document.createElement("div");
        bookAuthorText.textContent = book.author;
        bookDiv.appendChild(bookAuthorText);
        
        bookNumberOfPagesText = document.createElement("div")
        bookNumberOfPagesText.textContent = book.numberOfPages;
        bookDiv.appendChild(bookNumberOfPagesText);
        
        bookReadStatusText = document.createElement("div")
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
    
    function changeBookReadStatus(event) {
        let book = mainLibrary.find(element => element.id == event.target.parentElement.id);
        book.updateReadStatus();
        // TODO: MEJORAR ESTO
        let bookCard = document.getElementById(book.id);
        bookCard.childNodes[3].textContent = book.readMessage
    }

    function displayLibrary(){
        for (let i = 0; i < mainLibrary.length; i++){
            card = createBookCard(mainLibrary[i])
            addBookCardToDisplay(card);
        }
    }

    return {addBookToLibrary, displayLibrary}
})();

const modalController = (() => {
    function displayModal() {
        modal.classList.replace("modal-closed", "modal-open");
    }
    
    function hideModal(event) {
        if (event.target === modal || event.target === closeModal) {
            modal.classList.replace("modal-open", "modal-closed");
        }
    }
    return {displayModal, hideModal}
})();


const modal = document.getElementById("modal");
const addBook = document.getElementById("addBook");
const showModal = document.getElementById("showModal");
const closeModal = document.getElementById("closeModal");

modal.addEventListener("click", modalController.hideModal);
showModal.addEventListener("click", modalController.displayModal);
closeModal.addEventListener("click", modalController.hideModal);
addBook.addEventListener("click", libraryController.addBookToLibrary);

libraryController.displayLibrary();