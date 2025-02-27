import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config

const Author = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
  }
});

const Comment = defineTable({
  columns: {
    // A string of text.
    author: column.text(),
    authorId: column.number({ references: () => Author.columns.id }),
    body: column.text(),    
    // A whole integer value.
    likes: column.number(),
    // A true or false value.
    flagged: column.boolean(),
    // Date/time values queried as JavaScript Date objects.
    published: column.date(),
    // An untyped JSON object.
    metadata: column.json(),
  }
});



export default defineDb({
  tables: { Author, Comment },
})