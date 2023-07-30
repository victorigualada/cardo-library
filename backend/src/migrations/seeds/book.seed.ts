import { Book } from '../../app/book/entity/book.entity';

export const BookSeed: Array<Partial<Book>> = [
    {
        title: 'The lord of the rings',
        author: 'Ronald Tolkien',
        year: 1954,
        ISBN: '978-0-618-57498-5',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'The foundation',
        author: 'Isaac Asimov',
        year: 1951,
        ISBN: '978-0-553-29335-7',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'The hitchhiker\'s guide to the galaxy',
        author: 'Douglas Adams',
        year: 1979,
        ISBN: '978-0-330-25864-0',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
