export default async function fetcher(url, token) {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      "Content-Type": "application/json",
      token
    }),
    credentials: 'same-origin'
  });
  return res.json();
}

// export async function fetchData(url, data) {
//   const res = await fetch(url, {
//     method: 'GET',
//     body: JSON.stringify(data),
//     credentials: 'same-origin'
//   })
//   return res.json();
// }




