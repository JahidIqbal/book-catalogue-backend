# book-catalogue-backend

<h2 id="endpoints">Endpoints</h2>

Here are the available API endpoints for the Book Catalogue Backend:

<details>
<summary><strong>GET</strong> `/books`</summary>
<p>Fetches a list of all books.</p>
</details>

<details>
<summary><strong>POST</strong> `/books`</summary>
<p>Adds a new book to the collection. Requires the book details in the request body.</p>
</details>

<details>
<summary><strong>GET</strong> `/books/:id`</summary>
<p>Fetches a single book by its unique ID.</p>
</details>

<details>
<summary><strong>PUT</strong> `/books/:id`</summary>
<p>Updates the details of a book by its ID. Requires the updated book details in the request body.</p>
</details>

<details>
<summary><strong>POST</strong> `/books/:id/reviews`</summary>
<p>Adds a review to a specific book. Requires the review content in the request body.</p>
</details>

<details>
<summary><strong>GET</strong> `/books/:id/reviews`</summary>
<p>Fetches reviews for a specific book by its ID.</p>
</details>

<details>
<summary><strong>DELETE</strong> `/books/:id`</summary>
<p>Deletes a book by its ID.</p>
</details>
