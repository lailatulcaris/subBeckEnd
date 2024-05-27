/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');

const books = [];

const addBook = (book) => {
    const id = nanoid(16);
    const finished = book.pageCount === book.readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        ...book,
        finished,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);
    return id;
};

const getAllBooks = () => books.map(({ id, name, publisher }) => ({ id, name, publisher }));

const getBookById = (id) => books.find((book) => book.id === id);

const updateBook = (id, updatedBook) => {
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books[index] = {
            ...books[index],
            ...updatedBook,
            finished: updatedBook.pageCount === updatedBook.readPage,
            updatedAt: new Date().toISOString(),
        };
        return true;
    }
    return false;
};

const deleteBook = (id) => {
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        return true;
    }
    return false;
};

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
