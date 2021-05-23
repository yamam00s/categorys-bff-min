import React from 'react'
import logo from './logo.svg'
import './App.css'
import { useQuery } from '@apollo/client'
import { GET_CONTENTS } from './schema/app'

const App = () => {
  const { data, loading, error } = useQuery(GET_CONTENTS)

  if (loading) return <p>loading</p>
  if (error) return <p>ERROR: {error.message}</p>

  return (
    <>
      {data.contents &&
        data.contents.map((item: any) => (
          <p
            key={item.id}
          >{item.title}</p>
        ))}
    </>
  );
}

export default App;
