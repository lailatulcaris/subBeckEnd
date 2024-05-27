/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const { addBook, getAllBooks, getBookById, updateBook, deleteBook } = require('./books');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });

    // Kriteria 3: Menyimpan buku
    server.route({
        method: 'POST',
        path: '/books',
        handler: (request, h) => {
            const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

            if (!name) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal menambahkan buku. Mohon isi nama buku',
                }).code(400);
            }

            if (readPage > pageCount) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
                }).code(400);
            }

            const bookId = addBook({ name, year, author, summary, publisher, pageCount, readPage, reading });

            return h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId,
                },
            }).code(201);
        },
    });

    // Kriteria 4: Menampilkan seluruh buku
    server.route({
        method: 'GET',
        path: '/books',
        handler: (request, h) => {
            const books = getAllBooks();
            return h.response({
                status: 'success',
                data: {
                    books,
                },
            }).code(200);
        },
    });

    // Kriteria 5: Menampilkan detail buku
    server.route({
        method: 'GET',
        path: '/books/{bookId}',
        handler: (request, h) => {
            const { bookId } = request.params;
            const book = getBookById(bookId);

            if (!book) {
                return h.response({
                    status: 'fail',
                    message: 'Buku tidak ditemukan',
                }).code(404);
            }

            return h.response({
                status: 'success',
                data: {
                    book,
                },
            }).code(200);
        },
    });

    // Kriteria 6: Mengubah data buku
    server.route({
        method: 'PUT',
        path: '/books/{bookId}',
        handler: (request, h) => {
            const { bookId } = request.params;
            const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

            if (!name) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal memperbarui buku. Mohon isi nama buku',
                }).code(400);
            }

            if (readPage > pageCount) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
                }).code(400);
            }

            const updated = updateBook(bookId, { name, year, author, summary, publisher, pageCount, readPage, reading });

            if (!updated) {
                return h.response({
                    status: 'fail',
                    message: 'Gagal memperbarui buku. Id tidak ditemukan',
                }).code(404);
            }

            return h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            }).code(200);
        },
    });

    // Kriteria 7: Menghapus buku
    server.route({
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: (request, h) => {
            const { bookId } = request.params;
            const deleted = deleteBook(bookId);

            if (!deleted) {
                return h.response({
                    status: 'fail',
                    message: 'Buku gagal dihapus. Id tidak ditemukan',
                }).code(404);
            }

            return h.response({
                status: 'success',
                message: 'Buku berhasil dihapus',
            }).code(200);
        },
    });

    await server.start();
    console.log('Server berjalan pada http://localhost:9000');
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
