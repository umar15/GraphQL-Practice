const { ApolloServer, gql } = require("apollo-server");

const books = [
	{
		id: 1,
		title: "The Awakening",
		author: "Kate Chopin",
	},
	{
		id: 2,
		title: "City of Glass",
		author: "Paul Auster",
	},
];

const typeDefs = gql`
	type Book {
		id: Int
		title: String
		author: String
	}

	type Query {
		books: [Book]
	}

	input BookInput {
		id: Int
		title: String
		author: String
	}

	type Mutation {
		addBook(input: BookInput): Book
	}
`;

const resolvers = {
	Query: {
		books: () => books,
	},
	Mutation: {
		addBook: ({ input }) => {
			books.push({
				id: input.id,
				title: input.title,
				author: input.author,
			});
			return {
				id: input.id,
				title: input.title,
				author: input.author,
			};
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

// {
//   books{
//     title
//     author
//   }
// }
// mutation {
//   addBook(input: { id: 3, title: "new book", author: "xyz" }) {
//     id
//     title
//     author
//   }
// }
