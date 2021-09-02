const setSpinner = (displaySpinner) =>{
    document.getElementById('loading-spinner').style.display = displaySpinner;
}

const getBookName = () => {
    const inputBook = document.getElementById('input-books');
    const inputBookValue = inputBook.value;
    inputBook.value = '';
    getBooksData(inputBookValue)
    setSpinner('block');
};

const getBooksData = (inputBookValue) => {
    // console.log(inputBookValue);

    const booksUrl = `https://openlibrary.org/search.json?q=${inputBookValue}`;
    fetch(booksUrl)
        .then(res => res.json())
        .then(data => getBooks(data.docs));
};


const getBooks = (books) => {
    console.log(books);
    const booksDisplay = document.getElementById('books-display');
    booksDisplay.textContent = '';

    books.forEach(book => {
        console.log(book);
        const createDiv = document.createElement('div');
        createDiv.classList.add('book-card');
        createDiv.innerHTML = `
        <img class= "book-img" src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"  alt="Image Not Found">
        <div class="card-body">
          <h5 >${book.title}</h5>
          <h6 >By ${book.author_name}</h6>
          <p >Publish: ${book.first_publish_year}</p>         
        `;
        booksDisplay.appendChild(createDiv);
       

    });
    
    const totalFound = document.getElementById('total-found');
    totalFound.innerHTML = `Total Found Result: ${books.length}`;
    setSpinner('none');


};