import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApolloProvider } from '@apollo/client'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql
} from '@apollo/client'
import { createStore } from 'redux'
import { counterReducer, initialState } from './reducer'
import { Provider } from 'react-redux'

const store = createStore(counterReducer, initialState )
const cache = new InMemoryCache()
const link = new HttpLink({
  // uri: 'http://localhost:4000/'
  uri: 'https://aiah43ed9l.execute-api.ap-northeast-1.amazonaws.com/dev/graphql'
})

const client = new ApolloClient({
  cache,
  link
})

// client
// .query({
//   query: gql`
//     query contents {
//       contents {
//         id
//       }
//     }
//   `
// })
// .then(result => console.log(result))

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
