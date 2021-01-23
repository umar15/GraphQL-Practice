import React from "react";
import { useQuery, gql } from "@apollo/client";

const Get_Books = gql`
	{
		books {
			title
			author
		}
	}
`;

function Books() {
	const { loading, error, data } = useQuery(Get_Books);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return data.books.map(({ title, author }) => (
		<div key={title}>
			<p>
				{title}: {author}
			</p>
		</div>
	));
}

export default Books;
