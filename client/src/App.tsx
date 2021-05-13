import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql
} from '@apollo/client'


const App = () => {
  const cache = new InMemoryCache();
  const link = new HttpLink({
    uri: 'http://localhost:4000/'
  })

  const client = new ApolloClient({
    cache,
    link
  })

  client
  .query({
    query: gql`
      query {
        contents {
          id
        }
      }
    `
  })
  .then(result => console.log(result))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
