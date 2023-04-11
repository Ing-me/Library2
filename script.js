const add = document.querySelector('#add-button');
const close = document.querySelector('.close');
const modal = document.querySelector('.modal');
const addBook = document.querySelector('.add-book-form');
const cards = document.querySelector('.cards')
const addbutton = document.querySelector('.addButton')
let myLibrary = [];

function Book (title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
    this.id = Math.floor(Math.random() * 100000000);
}

function AddBookToLibrary (title, author, year, pages, read) {
    myLibrary.push(new Book(title, author, year, pages, read))
    displayData();
}

addBook.addEventListener('submit', (e) => {
    e.preventDefault();
    let newBook = {}
    const data = new FormData(e.target)
    for(let [name, value] of data){
        if(name === "read"){
            newBook["read"] = true;
        } else {
            newBook[name] = value;
        }
        if(!newBook["read"]){
            newBook["read"] = false
        }
    }
    if(document.querySelector('.form-title').textContent === "Edit Book"){
        let id = e.target.id
        let editBook = myLibrary.filter(book => book.id = id)[0];
        editBook.title = newBook["title"]
        editBook.author = newBook["author"]
        editBook.year = newBook["year"]
        editBook.pages = newBook["pages"]
        editBook.read = newBook["read"]
        addBook.removeEventListener('click',displayData())        
        
    } else{

        AddBookToLibrary(
            newBook["title"], 
            newBook["author"], 
            newBook["year"], 
            newBook["pages"], 
            newBook["read"]);
    }
    
   
    addBook.reset();    
    modal.style.display = "none";
    
    
})

add.addEventListener('click', () => {
   modal.style.display = "block"
});

close.addEventListener('click', () => {
    modal.style.display = "none"
})
function createElement(el, content, className){
    const elem = document.createElement(el);
    elem.textContent = content;
    elem.setAttribute('class', className)
    return elem;
}

function createElementInside(el, content){
    const elem = document.createElement(el);
    elem.textContent = content;
    return elem
}

function createBookItem(book, index){
  const card = document.createElement('div');
  card.setAttribute('id', index)
  card.setAttribute('key', index)
  card.setAttribute('class', "card")
  const cardTitle = createElement("div", null, "cardTitle")
  const cardBody = createElement("div", null, "cardBody")
  const cardFooter = createElement("div", null, "cardFooter")
  cardTitle.appendChild(createElementInside("h2", `${book.title}`))
  cardBody.appendChild(createElementInside("p", `Title: ${book.title}`))
  cardBody.appendChild(createElementInside("p", `Author: ${book.author}`))
  cardBody.appendChild(createElementInside("p", `Year: ${book.year}`))

  let read = "";
  if(book.read === true){
    read = "It's read"
  } else{
    read = "Not yet"
  }
  cardBody.appendChild(createElementInside("p", `Read: ${read}`))
  const btnEdit = createElement("button","Edit", "buttonEdit")
  btnEdit.setAttribute("type", "submit")
  btnEdit.setAttribute("id", "editBook")

  const btnDelete = createElement("button","Delete", "buttonEdit")
  btnDelete.setAttribute("type", "submit")
  btnDelete.setAttribute("id", "deleteBook")

  cardFooter.appendChild(btnEdit)
  cardFooter.appendChild(btnDelete)

  card.appendChild(cardTitle)
  card.appendChild(cardBody)
  card.appendChild(cardFooter)

  

  card.querySelector('#deleteBook').addEventListener('click', (e) => {
    if(e.target.textContent === 'Delete'){
        deleteBook(index)
    }
  })

  card.querySelector('#editBook').addEventListener("click", (e) => {
    if(e.target.textContent == 'Edit'){
        fillEditForm(book)
    }
  })


  cards.insertAdjacentElement("afterbegin", card)
}
function deleteBook(index){
    myLibrary.splice(index, 1)
    displayData()
} 
function fillEditForm(book){
    modal.style.display = "block";
    document.querySelector('.form-title').textContent = "Edit Book"
    document.querySelector('.addButton').textContent = "Edit"
    document.querySelector('.add-book-form').setAttribute("id", book.id);
    document.querySelector('#title').value = book.title
    document.querySelector('#author').value = book.author
    document.querySelector('#year').value = book.year
    document.querySelector('#pages').value = book.pages
    if(book.read == true){
        document.querySelector('#read').checked = true
    } else{
        document.querySelector('#read').checked = false
    }
}
addbutton.addEventListener('click', displayData())

function displayData (){
    cards.textContent = ""
    myLibrary.map((book, index) => createBookItem(book, index))
}





