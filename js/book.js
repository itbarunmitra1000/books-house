// set spinner function 
const setNewSpinner = (displaySpinner) => {
    document.getElementById('loading-spinner').style.display = displaySpinner;
};
const setDisplayResult = (displaySpinner) => {
    document.getElementById('disply-result').style.display = displaySpinner;
};

//  get search box input value
const getBookName = () => {
    const inputBook = document.getElementById('input-books');
    const inputBookValue = inputBook.value;
    inputBook.value = '';
    getBooksData(inputBookValue)
    setNewSpinner('block');
    setDisplayResult('none');
};

// fetch books json link 
const getBooksData = (inputBookValue) => {
    // console.log(inputBookValue);
    const booksUrl = `https://openlibrary.org/search.json?q=${inputBookValue}`;
    fetch(booksUrl)
        .then(res => res.json())
        .then(data => getBooks(data.docs));

};

// get books data name  image author title 
const getBooks = (books) => {
    // console.log(books);
    const booksDisplay = document.getElementById('books-display');
    booksDisplay.textContent = '';
    const errorMessage = document.getElementById('error-message');
    if (books.length === 0) {
        errorMessage.classList.remove('d-none');
        setNewSpinner('none');

    } else {
        books.forEach(book => {
            // console.log(book);
            errorMessage.textContent = '';
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
            setNewSpinner('none');
            setDisplayResult('block');


        });

    }
    // total result found 
    const totalFound = document.getElementById('total-found');
    totalFound.innerHTML = `Total Found Result: ${books.length}`;

};