import type { NextPage } from 'next'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { apiKey } from '../api-key'

const Home: NextPage = () => {
  useEffect(() => {
    const init = async () => {
      const headers = { 'X-MICROCMS-API-KEY': apiKey }
      const endpoints = ['status', 'recommend', 'pickup']
      const fetchData = endpoints.map(endpoint =>
        axios.get(`https://categorys-bff-min.microcms.io/api/v1/${endpoint}`, { headers }))
      const [status, recommend, pickup] = await Promise.all([...fetchData])
    }
    init()
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          プレミアムユーザーへのコンテンツ
        </h1>

        <div>
          <h2>おすすめ</h2>
          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </div>
        </div>

        <div>
          <h2>ピックアップ</h2>
          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
