import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
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
  const statusName = query?.memberStatus
  const [status, setStatus] = useState<Status>(blankStatus)
  const [topContents, setTopContents] = useState<ContentsList[]>([])

  // ステータスに該当するコンテンツを取得
  const filterStatusContents = useCallback((contents: ContentsList[], status: Status) =>
    contents.filter(contentsItem => contentsItem.contents.status.some(listStatus => listStatus.id === status.id)),[])

  // queryのステータスからステータスを取得
  const findStatus = useCallback((statusList: Status[]) => {
    const selected = statusList.find(status => statusName === status.name)
    selected && setStatus(selected)
    return selected
  }, [statusName])

  // fetchとsetState
  const homeInitialize = useCallback(async() => {
    const headers = { 'X-MICROCMS-API-KEY': apiKey }
    const endpoints = ['status', 'recommend', 'pickup']
    const fetchData = endpoints.map(endpoint =>
      axios.get<MicroCmsItem<Status[] | ContentsList[]>>(`https://categorys-bff-min.microcms.io/api/v1/${endpoint}`, { headers }))
    const [statusResponse, recommendResponse, pickupResponse] = await Promise.all(fetchData)
    const statusList = statusResponse.data.contents as Status[]
    const status = findStatus(statusList)
    // ステータスが存在しない場合後続の処理を実施しない
    if (!status) return
    const topContents = ([recommendResponse.data.contents, pickupResponse.data.contents] as ContentsList[][])
      .map(contents => filterStatusContents(contents, status))
      .sort((a, b) => b.length - a.length)[0]
    setTopContents(topContents)
  }, [findStatus, filterStatusContents])

  useEffect(() => {
    if (!isReady) return
    homeInitialize()
  }, [isReady, homeInitialize])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {`${status.name}ユーザーへのコンテンツ`}
        </h1>

        <div>
          <h2>TOPコンテンツ</h2>
          <div className={styles.grid}>
            {topContents.map((item, id) =>(
              <a href="https://nextjs.org/docs" className={styles.card} key={`recommend${id}`} >
                <h3>{item.contents.title}</h3>
                <p>{item.contents.description}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
