import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const Get_Books = gql`
	{
		books {
			id
			title
			author
		}
	}
`;

const Add_Book = gql`
	mutation AddBook($id: Int!, $title: String!, $author: String!) {
		addBook(input: { id: $id, title: $title, author: $author }) {
			id
			title
			author
		}
	}
`;

function Books() {
	const { loading, error, data } = useQuery(Get_Books);
	const [AddBooks] = useMutation(Add_Book);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			{data.books.map(({ id, title, author }) => (
				<div key={id}>
					<p>
						{title}: {author}
					</p>
				</div>
			))}
			<button
				onClick={() =>
					AddBooks({
						variables: {
							id: 4,
							title: "abc",
							author: "umar",
						},
						refetchQueries: [{ query: Get_Books }],
					})
				}
			>
				Add Book
			</button>
		</div>
	);
}

export default Books;
