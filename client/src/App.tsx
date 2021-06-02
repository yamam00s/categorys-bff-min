import React from 'react'
import logo from './logo.svg'
import './App.css'
import { useQuery } from '@apollo/client'
import { GET_CONTENTS } from './operations/queries/GetContents'
import { GetContents } from './operations/queries/__generated__/GetContents'

const App = () => {
  const { data, loading, error } = useQuery<GetContents>(GET_CONTENTS)

  if (loading) return <p>loading</p>
  if (error) return <p>ERROR: {error.message}</p>
  if (!data || data.contents === null) return <p>none</p>

  return (
    <>
      {/* {data.contents.map(item => (
        item && (
          <p
            key={item.id}
          >{item.title}</p>
        )
      ))} */}
    </>
  );
}

export default App
