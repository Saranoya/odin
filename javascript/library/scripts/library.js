// GLOBAL VARIABLES
let myLibrary = [];

// GLOBAL CONSTANTS
const addToLibrary = () => {
    let book = new Book(
        document.querySelector('#title input').value,
        document.querySelector('#author input').value,
        document.querySelector('#cover-url input').value,
        document.querySelector('#description textarea').value,
        document.querySelector('#pages input').value,
        document.querySelector('#pages-read input').value,
        document.querySelector('#tracked').checked ? undefined : false,
        new Date()
    ); myLibrary.push(book); updateLocalStorage();
}

const newBookTitle = document.getElementById('new-book-title');
const addNewBookButton = document.getElementById('add-button');
const addNewBookForm = document.getElementById('new-book-form');
const shelf = document.getElementById('shelf');

// BOOK CONSTRUCTOR + METHODS
function Book(title, author, cover, description, pages, pagesRead, read, added) {
    this.title = title;
    this.author = author;
    this.cover = cover;
    description != '' ? this.description = description : this.description = 'No description yet.';
    this.pages = pages;
    this.pagesRead = parseInt(pagesRead) > parseInt(pages) ? pages : pagesRead;
    this.read = read;
    this.added = added;
}
Book.prototype.stringifyRead = function() {
    let percentageRead = Math.floor((this.pagesRead/this.pages)*100);
    let output = parseInt(this.pagesRead) < parseInt(this.pages) 
        ? `${this.pagesRead} of ${this.pages} pages read (${percentageRead}%)`
        : 'read';
    return output
}
Book.prototype.toggleRead = function() { this.read = !this.read; }

// LOCAL STORAGE
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let test = '__storage_test__';
        storage.setItem(test, test);
        storage.removeItem(test);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function updateLocalStorage() {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('library').value = myLibrary;
      }
      else {
        // Implement graceful error message
      }
}

// RENDERING
function render() {
    shelf.innerHTML = '';
    if (myLibrary.length == 0) { // there are no books in the library
        shelf.style.backgroundColor = ''; 
        let startMessage = document.createElement('div');
        startMessage.setAttribute('id', 'start-message');
        startMessage.style.dispaly = 'block';
        startMessage.textContent = 
            'The library is currently empty. ' + 
            'Type the title of a book you want to add into the input field above, then press "ENTER" or tap "+". ';
        shelf.appendChild(startMessage);
    } // there are books in the library 
    for (let i = 0; i < myLibrary.length; i++) {
        const bookDiv = document.createElement('div');
        bookDiv.setAttribute('class', 'book');
        bookDiv.setAttribute('data-id', i);
        const initialButtons = document.createElement('div');
        initialButtons.setAttribute('class', 'buttons');
        const infoButton = document.createElement('input');
        infoButton.setAttribute('type', 'button');
        infoButton.setAttribute('class', 'left-button info');
        infoButton.setAttribute('value', 'info'); 
        const deleteButton = document.createElement('input');
        deleteButton.setAttribute('type', 'button');
        deleteButton.setAttribute('class', 'right-button delete');
        deleteButton.setAttribute('value', '\u00d7');
        deleteButton.setAttribute('alt', `delete ${myLibrary[i].title} by ${myLibrary[i].author}`);
        deleteButton.setAttribute('data-id', i);
        initialButtons.appendChild(infoButton); 
        initialButtons.appendChild(deleteButton);
        bookDiv.appendChild(initialButtons);
        const emptyCover = generateDummyCover(myLibrary[i].title, myLibrary[i].author);  
        const coverImg = generateCoverImg(myLibrary[i].cover); 
        myLibrary[i].cover == '' ? bookDiv.appendChild(emptyCover) : bookDiv.appendChild(coverImg); 
        const changeCoverButton = document.createElement('input');  
        changeCoverButton.setAttribute('type', 'button');
        changeCoverButton.setAttribute('class', 'change-cover');
        changeCoverButton.setAttribute('value', 'change cover');
        changeCoverButton.setAttribute('data-id', i);
        bookDiv.appendChild(changeCoverButton);
        const readDiv = myLibrary[i].read === undefined ? generateProgressBar(i, withButton = true) : generateReadToggle(i);
        bookDiv.appendChild(readDiv);
        readDiv.firstChild.style.backgroundColor = myLibrary[i].read == false ? 'rgb(169,3,41)' : 'rgb(4, 74, 77)';
        const descriptionDiv = document.createElement('div');  
        descriptionDiv.setAttribute('class', 'description');  
        const hudButtons = document.createElement('div');
        hudButtons.setAttribute('class', 'buttons'); 
        const backButton = document.createElement('input');
        backButton.setAttribute('type', 'button');
        backButton.setAttribute('class', 'left-button back');
        backButton.setAttribute('value', 'back');
        const editButton = document.createElement('input'); 
        editButton.setAttribute('type', 'button');
        editButton.setAttribute('class', 'right-button edit');
        editButton.setAttribute('value', 'edit');
        editButton.setAttribute('data-id', i);
        hudButtons.appendChild(backButton); 
        hudButtons.appendChild(editButton);
        descriptionDiv.appendChild(hudButtons);  
        textDiv = document.createElement('div'); 
        textDiv.setAttribute('class', 'text');
        textDiv.textContent = myLibrary[i].description;
        descriptionDiv.appendChild(textDiv); 
        bookDiv.appendChild(descriptionDiv);
        shelf.appendChild(bookDiv);
    }
}

function buildEditForm(id) {
    const editForm = document.createElement('form');
    editForm.setAttribute('onsubmit', 'return false');
    editForm.setAttribute('class', 'edit-form'); 
    const editDescription = document.createElement('textarea');
    editDescription.setAttribute('placeholder', 'Description');
    if (myLibrary[id].description !== 'No description yet.') {
        editDescription.innerText = myLibrary[id].description;
    } editForm.appendChild(editDescription);
    return editForm;
} 

function buildURLChangeForm(id) {
    const form = document.createElement('form');
    form.setAttribute('class', 'change-cover-url');
    form.setAttribute('onsubmit', 'return false');
    form.setAttribute('data-id', id);
    let urlField = document.createElement('input');
    urlField.setAttribute('type', 'text');
    urlField.setAttribute('class', 'change-url');
    urlField.setAttribute('placeholder', 'New cover image URL');
    urlField.setAttribute('data-id', id);
    form.appendChild(urlField);
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerText = 'Save new cover';
    form.appendChild(submitButton);
    return form;
}

function buildChangePagesReadForm(id) {
    const form = document.createElement('form');
    form.setAttribute('onsubmit', 'return false');
    const changePagesReadLabel = document.createElement('label');
    changePagesReadLabel.setAttribute('for', 'change-pages-read');
    changePagesReadLabel.textContent = 'Now on page: ';
    form.appendChild(changePagesReadLabel);
    const changePagesRead = document.createElement('input');
    changePagesRead.setAttribute('type', 'number');
    changePagesRead.setAttribute('id', 'change-pages-read');
    changePagesRead.setAttribute('class', 'change-pages-read');
    changePagesRead.setAttribute('min', '0');
    changePagesRead.setAttribute('max', myLibrary[id].pages);
    form.appendChild(changePagesRead);
    return form;
}

function generateProgressBar(id, withButton) {
    const readDiv = document.createElement('div');
    readDiv.setAttribute('class', 'read');
    const progressBar = document.createElement('div');
    progressBar.setAttribute('class', 'progress-bar');
    progressBar.style.width = `${Math.floor((myLibrary[id].pagesRead/myLibrary[id].pages)*170)}px`;
    readDiv.appendChild(progressBar);
    const textSpan = document.createElement('div');
    textSpan.setAttribute('class', 'text-span');
    textSpan.textContent = myLibrary[id].stringifyRead();
    readDiv.appendChild(textSpan);
    const pagesButton = document.createElement('input');
    pagesButton.setAttribute('type', 'button');
    pagesButton.setAttribute('data-id', id);
    pagesButton.setAttribute('class', 'change-pages');
    pagesButton.value = myLibrary[id].read ? '\u00d7' : '\u203a';
    readDiv.appendChild(pagesButton);
    return withButton ? readDiv : new Array(progressBar, textSpan);
}

function generateReadToggle(id) {
    const readDiv = document.createElement('div');  
    readDiv.setAttribute('class', 'read');
    const textSpan = document.createElement('div');
    textSpan.setAttribute('class', 'text-span');
    textSpan.textContent = myLibrary[id].read ? 'read' : 'unread';
    readDiv.appendChild(textSpan);
    const readButton = document.createElement('input');
    readButton.setAttribute('type', 'button');
    readButton.setAttribute('data-id', id);
    readButton.setAttribute('class', 'read-toggle');
    readButton.value = myLibrary[id].read ? '\u00d7' : '\u2713';
    readDiv.appendChild(readButton);
    return readDiv;
}

function generateDummyCover(title, author) {
    const emptyCover = document.createElement('div');
    emptyCover.setAttribute('class', 'empty-cover');
    const coverT = document.createElement('p');
    coverT.setAttribute('class', 'title');
    coverT.innerText = title;
    emptyCover.appendChild(coverT);
    const coverA = document.createElement('p');
    coverA.setAttribute('class', 'author');
    coverA.innerText = author;
    emptyCover.appendChild(coverA);
    return emptyCover;
}

function generateCoverImg(url) {
    const imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'cover');
    const coverImg = document.createElement('img');
    coverImg.addEventListener('error', function() {  
        if (url.length > 0) {
            this.setAttribute('alt', 'Cover image did not load correctly.');
            url = '';   
        }
    });
    coverImg.setAttribute('src', url);
    imgDiv.appendChild(coverImg);
    return imgDiv;
}

function sortBooks() {
    let sortCriterion = document.getElementById('sort-options').value;
    if (sortCriterion == 'title') myLibrary.sort((a, b) => (a.title > b.title ? 1 : -1));
    else if (sortCriterion == 'author') myLibrary.sort((a, b) => (a.author).match(/(\S)*$/) > (b.author).match(/(\S)*$/) ? 1 : -1)
    else myLibrary.sort((a, b) => (a.added > b.added ? -1 : 1)); 
    render();
}

function filterBooks() {
    render();
    for (let book of document.querySelectorAll('.book')) {
        switch (document.getElementById('display-options').value) {
            case 'read':
                if (
                    myLibrary[book.dataset.id].read == false 
                    || (myLibrary[book.dataset.id].read == undefined 
                        && parseInt(myLibrary[book.dataset.id].pagesRead) < parseInt(myLibrary[book.dataset.id].pages))
                ) book.style.display = 'none';
                break; 
            case 'unread':
                if (
                    myLibrary[book.dataset.id].read 
                    || (myLibrary[book.dataset.id].read == undefined && myLibrary[book.dataset.id].pagesRead == myLibrary[book.dataset.id].pages)
                ) book.style.display = 'none';
                break;
            case 'current':
                if (
                    myLibrary[book.dataset.id].read !== undefined
                    || myLibrary[book.dataset.id].pagesRead == myLibrary[book.dataset.id].pages
                    || myLibrary[book.dataset.id].pagesRead == '0'
                ) book.style.display = 'none';
                break;
            default:
                book.style.display = 'block';
                break;
        }
    }
}

// EVENT HANDLER HELPERS
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
  }

function triggerForm() { 
    if (addNewBookButton.value == '+' && addNewBookForm.style.display == 'grid') { 
        addNewBookButton.value = '-'; 
        shelf.style.display = 'none';
        if (newBookTitle.value.length > 0) {
            document.querySelector('#title input').value = newBookTitle.value;
            document.querySelector('#author input').focus();
        } else {
            document.querySelector('#title input').focus();
        }
    } else { 
        addNewBookButton.value = '+'; 
        shelf.style.display = 'grid';
    }
}

function hideNewBookForm() {
    addNewBookForm.reset();
    document.querySelector('#description textarea').textContent = '';
    for (let div of document.querySelectorAll('.warning')) { div.style.display = 'none'; }
    document.getElementById('cover').removeChild(document.getElementById('cover').lastElementChild);
    document.getElementById('cover').appendChild(document.createElement('div'));
    addNewBookForm.style.display = 'none';
    triggerForm();
    newBookTitle.value = '';
    newBookTitle.focus();
}

function searchGBooks(title, author) {
    if (document.getElementById('no-gbooks-warning').style.display == 'block') document.getElementById('no-gbooks-warning').style.display = 'none';
    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`)
        .then(function(result) { return result.json(); })
        .then(function(fetch) {        
            if (fetch.items !== undefined) {
                document.querySelector('#description textarea').textContent = fetch.items[0].volumeInfo.description;
                document.querySelector('#cover-url input').value = fetch.items[0].volumeInfo.imageLinks.thumbnail;
                document.querySelector('#pages input').value = fetch.items[0].volumeInfo.pageCount;
                document.querySelector('#pages input').focus(); setTimeout(() => document.querySelector('#cover-url input').focus(), 1);
            } else { 
                document.getElementById('no-gbooks-warning').style.display = 'block';
                return 0 
            }
    }),
    function(error) { return 0 };
}

// EVENT HANDLERS
function handleNewURL(e) {
    let book = getEventTarget(e).parentNode.parentNode;
    let cover = book.childNodes[1];
    let newCover = generateCoverImg(getEventTarget(e).value);
    if (newCover.getAttribute('alt') == 'Cover image did not load correctly.') {
        newCover = generateDummyCover(myLibrary[getEventTarget(e).dataset.id].author, myLibrary[getEventTarget(e).dataset.id].title) 
    }
    book.removeChild(cover);
    book.insertBefore(newCover, book.childNodes[1]);
}

function saveURL(e) {
    myLibrary[getEventTarget(e).dataset.id].cover = getEventTarget(e).firstChild.value;
    updateLocalStorage(); render();
}

function handlePagesRead(e) {
    if (getEventTarget(e).value == '\u203a') { 
        getEventTarget(e).setAttribute('value', '\u2713');
        getEventTarget(e).setAttribute('alt', 'save');
        getEventTarget(e).parentNode.removeChild(getEventTarget(e).parentNode.childNodes[0]);
        getEventTarget(e).parentNode.removeChild(getEventTarget(e).parentNode.childNodes[0]);
        getEventTarget(e).parentNode.insertBefore(buildChangePagesReadForm(getEventTarget(e).dataset.id), getEventTarget(e));
        getEventTarget(e).parentNode.firstChild.addEventListener('submit', handlePagesRead);
        const changeField = document.getElementById('change-pages-read');
        changeField.focus();
        changeField.addEventListener('keyup', function() {
            if (!/[0-9]/.test(this.value.substr(-1))) this.value = this.value.slice(0, this.value.length-1);
            if (parseInt(this.value) > this.max) this.value = this.max;
        });
    } else if (getEventTarget(e). value == '\u2713') {
        let input = getEventTarget(e).parentNode.firstChild.lastChild.value, id = getEventTarget(e).dataset.id;
        myLibrary[id].pagesRead = input === '' ? myLibrary[id].pagesRead : input;
        getEventTarget(e).parentNode.removeChild(getEventTarget(e).parentNode.childNodes[0]);
        const progressBar = generateProgressBar(id, withButton = false);
        getEventTarget(e).parentNode.insertBefore(progressBar[0], getEventTarget(e));
        getEventTarget(e).parentNode.insertBefore(progressBar[1], getEventTarget(e));
        getEventTarget(e).setAttribute('value', '\u203a');
        getEventTarget(e).setAttribute('alt', 'change pages read');
        filterBooks();
    }
}

function handleReadToggle(e) {
    myLibrary[getEventTarget(e).dataset.id].toggleRead();
    if (myLibrary[getEventTarget(e).dataset.id].read) {
        getEventTarget(e).value = '\u00d7'; // mult. sign
        getEventTarget(e).parentNode.firstChild.style.backgroundColor = 'rgba(4, 74, 77, 0.9)'; // green
        getEventTarget(e).parentNode.firstChild.textContent = 'read';
    } else {
        getEventTarget(e).value = '\u2713'; // checkmark
        getEventTarget(e).parentNode.firstChild.style.backgroundColor = 'rgba(169,3,41,0.9)'; // red
        getEventTarget(e).parentNode.firstChild.textContent = 'unread'; 
    }
}

function handleInfo(e) {
    getEventTarget(e).parentNode.parentNode.lastChild.style.visibility = 'visible'; 
}

function handleChangeCover(e) {
    getEventTarget(e).style.visibility = 'hidden';
    getEventTarget(e).parentNode.appendChild(buildURLChangeForm(getEventTarget(e).dataset.id));
    getEventTarget(e).parentNode.lastChild.firstChild.focus();
    getEventTarget(e).parentNode.lastChild.firstChild.addEventListener('keyup', handleNewURL);
    getEventTarget(e).parentNode.lastChild.addEventListener('submit', saveURL);
}

function handleBack(e) {
    getEventTarget(e).parentNode.parentNode.style.visibility = 'hidden';
    getEventTarget(e).parentNode.parentNode.parentNode.childNodes[1].style.visibility = 'visible';
    getEventTarget(e).parentNode.parentNode.parentNode.childNodes[2].style.visibility = 'visible';
}

function handleDelete(e) {
    myLibrary.splice(getEventTarget(e).dataset.id, 1);
    updateLocalStorage(); render();
}

function handleEdit(e) {
    if (getEventTarget(e).value == 'edit') {
        getEventTarget(e).value = 'save';
        getEventTarget(e).parentNode.parentNode.childNodes[1].style.display = 'none';
        getEventTarget(e).parentNode.parentNode.appendChild(buildEditForm(getEventTarget(e).dataset.id));
    } else {
        getEventTarget(e).value = 'edit';
        getEventTarget(e).parentNode.parentNode.childNodes[1].textContent = getEventTarget(e).parentNode.parentNode.childNodes[2].firstChild.value;
        getEventTarget(e).parentNode.parentNode.childNodes[1].style.display = 'block';
        myLibrary[getEventTarget(e).dataset.id].description = getEventTarget(e).parentNode.parentNode.childNodes[2].firstChild.value;
        getEventTarget(e).parentNode.parentNode.removeChild(getEventTarget(e).parentNode.parentNode.childNodes[2]); 
    }
}

function handleBookButtons(e) {
    if (getEventTarget(e).classList.contains('info')) return handleInfo(e);
    if (getEventTarget(e).classList.contains('delete')) return handleDelete(e);
    if (getEventTarget(e).classList.contains('change-pages')) return handlePagesRead(e);
    if (getEventTarget(e).classList.contains('back')) return handleBack(e);
    if (getEventTarget(e).classList.contains('edit')) return handleEdit(e);
    if (getEventTarget(e).classList.contains('change-cover')) return handleChangeCover(e);
    if (getEventTarget(e).classList.contains('read-toggle')) return handleReadToggle(e);
}
  
// EVENT LISTENERS
shelf.addEventListener('click', e => handleBookButtons(e));

addNewBookButton.addEventListener('click', () => {
    addNewBookForm.style.display == 'grid' ? addNewBookForm.style.display = 'none' 
        : addNewBookForm.style.display = 'grid';
    triggerForm();
});

newBookTitle.addEventListener('keydown', (e) => {
    if (!e.repeat && e.key == 'Enter') {
        addNewBookForm.style.display = 'grid';
        triggerForm();
    }
});

window.addEventListener('keypress', function(e) {
    if (e.key == 'Escape' && addNewBookForm.style.display == 'grid') {
        e.preventDefault();
        hideNewBookForm();
    }
});

addNewBookForm.addEventListener('submit', () => { 
    document.querySelector('#display-options').value = 'all';
    document.querySelector('#sort-options').value = 'latest';
    document.querySelector('#cover-url input').focus();
    addToLibrary(); hideNewBookForm(); render();
});

document.querySelector('#author input').addEventListener('focusout', function() {
    if (document.getElementById('no-gbooks-warning').style.display == 'block') { document.getElementById('no-gbooks-warning').style.display == 'none'; }
    if (searchGBooks(document.querySelector('#title input').value, this.value) == 0) {
        document.getElementById('cover').removeChild(document.querySelector('#cover div'));
        document.getElementById('cover').appendChild(generateDummyCover(document.querySelector('#title input').value, this.value));
    }
});

document.querySelector('#cover-url input').addEventListener('focusout', function() {
    document.getElementById('no-gbooks-warning').style.display = 'none';
    if(document.querySelector('#cover-url input').value !== '') {
        document.getElementById('cover').removeChild(document.getElementById('cover').lastElementChild);
        document.getElementById('cover').appendChild(generateCoverImg(this.value));
    }
}); 

document.querySelector('#tracked').addEventListener('change', function() {
    document.querySelector('#pages input').required = this.checked; 
});

document.querySelector('#pages-read input').addEventListener( 'keyup', function() {
    if (!/[0-9]/.test(this.value.substr(-1))) this.value = this.value.slice(0, this.value.length-1);
    if (parseInt(this.value) > parseInt(document.querySelector('#pages input').value)) this.value = document.querySelector('#pages input').value;
    document.getElementById('tracked').checked = this.value == '' ? false : true;
});

document.getElementById('display-options').addEventListener('change', filterBooks);
document.getElementById('sort-options').addEventListener('change', sortBooks);
