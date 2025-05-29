// 2. Basic CRUD operations

//switched to db plp_bookstore

//use plp_bookstore

// finding all books
db.books.find()

//finding books by a specific author
db.books.find({author:"Paulo Coelho"})

//finding books published after 1950
db.books.find({  published_year: { $gt: 1950 }})

//finding books by a specific genre
db.books.find({genre:"Fiction"})

//finding in_stock books
db.books.find({in_stock: true})

//updating the price of a book
db.books.updateOne({_id: ObjectId('68370d1db93417a61c70d372')},{$set:{price: 10.99}})

//deleting a book using its title
db.books.deleteOne({title: "The Hobbit"})


// 3. Advanced queries
//finding a book publiched after 2010 and is in_stock
db.books.find({$and: [{in_stock: true}, { published_year: {$gt : 2010}}]})


//using projections and specific query
db.books.find({in_stock: true}, {_id: false, title:true, author:true, price:true})


//sorting books in ascending order using price
db.books.find().sort({price: 1})

//sorting in descending order using price
db.books.find().sort({price: -1})

// using limit and skip methods
let page =2
let pageSize =5
let skipCount = (page -1) * pageSize
db.books.find().skip(skipCount).limit(pageSize).pretty()


// 4. Aggregation pipeline
// calculating average price of books by genre
db.books.aggregate([{$group: {_id: "$genre", averagePrice: {$avg: "$price"}}}])

// find the author with most books in the collection
db.books.aggregate([{$group: {_id: "$author", bookCount: {$sum:1}}},{$sort: {bookCount: -1}},{$limit: 1}])

// grouping books by publication decade and counting them
db.books.aggregate([{$group: {_id: {$concat: [{ $toString: {$multiply: [{$floor: {$divide: ["$published_year", 10]}}, 10]}},"s"]},count: {$sum: 1}}},{$sort: {decade : 1}}])


// 5. INDEXING
// creating an index on the title field
db.books.createIndex({title: 1})

// creating a compound index on `author` and `published_year`
db.books.createIndex({author:1, published_year: 1})

//using explain() method 
db.books.find({author: "George Orwell"}).explain("executionStats")