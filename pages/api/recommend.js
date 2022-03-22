// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const input = req.query;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'seqwa-api-key': 'e77a4fc42c20aab5827b61162be3a8dd779b1d1a', // Replace with your API Key
    },
  };
  const params = {
    index: 'cde1d8e5-f0af-4498-801d-3ff82acec9c6', // Replace with your Index Id
    fields: ['title', 'price', 'image', 'link'],
    context: input.context ? input.context : '', // In case of find recommendations for recordId make sure that you send an empty string. Since 'undefined' or 'null' will be converted into string
    recordId: parseInt(input.recordId),
    maxResults: 25,
  };
  const autocompleteResponse = await fetch(
    'https://www.seqwa.com/api/v1/recommend?' + new URLSearchParams(params),
    options
  );
  const response = await autocompleteResponse.json();
  res.status(200).json(response);
};
