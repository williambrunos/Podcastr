# About this project

- This project is a web application that the community is developing on the event "Next Level Week" made by Rocketseat, using ReactJS, Next.js and using important concepts in the web front end development, like Single Page Applications, Server Side Rendering, Static Site Generation and good practices for SEO.

### Consuming the API with SPA

- useEffect is a react hook that is going to execute a function when a value of a variable(given on an array) changes. In case of executing the function when a component is rendering on the screen, we give an empty array as argument. This strategy still bad for SEO, because web crawlers will not wait until the requisition responds for indexing the webpage, and we still have the problem of the indexers robots with disabled java script.


```JS
useEffect(() => {
  fetch('http://localhost:3333/episodes')
  .then(response => response.json())
  .then(data => console.log(data));
}, [])
```


### Consuming an API with SSR

- We can consume an API with next.js using the SSR strategy adding a function in any archive of "pages" folder. The requisition for the data is made on the next.js layer, not by the browser. The getServerSideProps executes every time someone access the home of our application.


```JS
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    }
  }
}
```


### Consuming the API with SSG

- As we explained previously, with the SSR strategy for rendering the data of the API, the data will be rendered every time someone access our application. But we really need that going on? No, we don't! We don't need to update the data for our application every time someone access it, and because of this we are going to use the SSG strategy for rendering the data of the API. Which means that we are going to do a requisition for the API when some user access the web app, and for the following users that access the Home after the first one, we will not do a lot of requisitions for each one, we will return the same data for all of them.

- OBS: We just need to set a revalidate value on the return of the function and change it's name for "getStaticProps". Otherwise, the SSG strategy only works when the project is on production, and because of this is important to make a build of the project to consume the API,
Using yarn build command and yarn start after build the page.


```JS
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
```

### Using HTTP requisitions 

- In this project, we used Axios for HTTP requisitions. Type the command on the terminal:

```
  yarn add axios
```

- After that, we now can change the SSG function using api.get instead of fetch(). For this, create an archive named api.ts and configure the route of the api:

```JS
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/'
}); 
```

- After that, we now can write the fetch function above on the index.tsx archive like this:

```JS
// Import the types(parameters and return) of getStaticProps function
import { GetStaticProps } from 'next';
import { api } from '../services/api';

type Episode = {
  id: string;
  title: string;
  members: string;
}

type HomeProps = {
  episodes: Episode[];
}

export default function Home(props: HomeProps) {
    // . . .
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', 
  {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  return {
    props: {
      episodes: data,
    },
    // After 8 hours another requisition for the API is going to occur
    revalidate : 60 * 60 * 8,
  }
}
```

### Good Practice using React

- It's a bad practice on ReactJS format our data in the return of the function. Why? Because this formatted data is going to happen whenever the component is rendered in the application. And because of that is a good practice format the data at the moment after receiving it from the API.

```JS
const episodes = data.map(episode => {
  return {
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
    description: episode.description,
    url: episode.file.url, 
  };
})
```

### File System Rooting with Next.js

- Every component created in the "pages" folder that does not begins with underline(_) and ends with .tsx are the archives that forms the routes of the application. 

### Dynamic SSG

- To lead with dynamic SSG, you have to export a function from next.js

```JS
import { GetStaticPaths, GetStaticProps } from 'next';

// . . .

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
```

