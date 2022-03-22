# Seqwa Recommend API Implementation

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/seqwa-recommend-nextjs)

## About Seqwa

Seqwa is a low-cost, easy-to-use, hosted search platform for solving your critical search requirements. It supports three uniquely beneficial functions: Autocomplete (query suggestions and top Full-text Search results), Search (Full-text Search with Semantic Ranking for intent), and Recommend (Intent-driven Semantic Search). Work with one or all the functions based on your needs. Set up a functional search utility in minutes: upload your data, generate API keys, publish a demo user interface, and search. Enjoy a seamless search experience supported by a highly available and scalable cloud infrastructure.

To learn more, please visit: https://www.seqwa.com/

## Tech Stack

- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [HeadlessUI](https://headlessui.dev/)
- [Seqwa](https://www.seqwa.com/)

## Recommend

Recommend function searches based on semantic similarity, also called semantic search, including finding similar documents for a given document or recommending documents based on the context. For instance, you can suggest similar products on the current product page or create a list of recommended products based on user browsing or purchase history.

### Request URL

https://www.seqwa.com/api/v1/recommend

### Method

GET

### Headers

| Header        | Description                         |
| ------------- | ----------------------------------- |
| Content-Type  | application/json                    |
| seqwa-api-key | API KEY generated for the Recommend |

### Function

### Params

| Param      | Description                                              | Required    |
| ---------- | -------------------------------------------------------- | ----------- |
| index      | Index Id                                                 | required    |
| recordId   | Id of the record to search for its recommendations.      | conditional |
| context    | Contextual text for finding the recommendations.         | conditional |
| fields     | Array of fields                                          | optional    |
| maxResults | Maximum results to be returned. (Default: 10, Limit: 25) | optional    |

### Request URL Structure

```
https://www.seqwa.com/api/v1/recommend?index=
INDEX_ID&recordId=RECORD_ID&context=CONTEXT
&fields=FIELDS&maxResults=MAX_RESULTS
```

### Response

| Object          | Description                                                                                                                                                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| recommendations | Contains an array of suggestions for queries based on the query text. Each element of the array is an object with subject and displaySubject parameters. The suggest param is plain text and displaySuggest has highlighted words with the html '<b>' element. |
| error           | Returns an error message if any error occurs on the server.                                                                                                                                                                                                    |

### Response JSON Structure

```
{
  "recommendations": [
    {
      "recordId": "##",
      "field1": ".....",
      "field2": ".....",
      "field3": "....."
    },
    {
      "recordId": "##",
      "field1": ".....",
      "field2": ".....",
      "field3": "....."
    }
  ],
  "error": "....."
}
```
