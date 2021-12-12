import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Status, ContentsList, MicroCmsItem } from '../types/index'
import { apiKey } from '../api-key'

const Home: NextPage = () => {
  const blankStatus = {
    id: '',
    name: ''
  }
  const { query, isReady } = useRouter()
  const [status, setStatus] = useState<Status>(blankStatus)
  const [recommend, setRecommend] = useState<ContentsList[]>([])
  const [pickup, setPickup] = useState<ContentsList[]>([])



  useEffect(() => {
    if (!isReady) return
    const init = async () => {
      const headers = { 'X-MICROCMS-API-KEY': apiKey }
      const endpoints = ['status', 'recommend', 'pickup']
      const fetchData = endpoints.map(endpoint =>
        axios.get<MicroCmsItem<Status[] | ContentsList[]>>(`https://categorys-bff-min.microcms.io/api/v1/${endpoint}`, { headers }))
      const [statusResponse, recommendResponse, pickupResponse] = await Promise.all([...fetchData])
      const statusList = statusResponse.data.contents as Status[]
      const recommend = recommendResponse.data.contents as ContentsList[]
      const pickup = pickupResponse.data.contents as ContentsList[]

      // queryのステータスからステータスを取得
      const findStatus = (statusList: Status[]) => {
        const { memberStatus } = query
        const selected = statusList.find(status => memberStatus === status.name)
        selected && setStatus(selected)
        return selected
      }
      const status = findStatus(statusList)
      if (!status) return

      // 自身のステータスに該当するコンテンツを取得
      const filteredRecommend = recommend.filter(recommendItem =>
        recommendItem.contents.status.some(listStatus => listStatus.id === status.id))
      setRecommend(filteredRecommend)

    }
    init()
  }, [isReady, query,])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {`${status.name}ユーザーへのコンテンツ`}
        </h1>

        <div>
          <h2>おすすめ</h2>
          <div className={styles.grid}>
            {recommend.map((item, id) =>(
              <a href="https://nextjs.org/docs" className={styles.card} key={`recommend${id}`} >
                <h3>{item.contents.title}</h3>
                <p>{item.contents.description}</p>
              </a>
            ))}
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
