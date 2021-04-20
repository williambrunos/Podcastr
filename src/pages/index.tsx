/*
  SPA
  SSR
  SPG
*/

import { useEffect } from "react"

export default function Home(props) {
    return (
      <h1>Index</h1>
    )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    // After 8 hours another requisition for the API is going to occur
    revalidate : 60 * 60 * 8,
  }
}

