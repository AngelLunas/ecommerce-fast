import Head from 'next/head'
import Nav from 'Components/Nav'
import Carousel from 'Components/Carousel'
import styles from '@/styles/main.module.css';
import useSWR from 'swr';
import { Oval } from 'react-loading-icons';
import Load from 'Components/Load';

const fetcher = (url) => fetch(url).then(res => res.json());


export default function Home() {

  const { data, error } = useSWR('/api/products/', fetcher);
  if (!data) return <Load />
  if (error) return <div>Ha ocurrido un error</div>

  return (
    <>
      <Head>
        <title>Fast buy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Nav/>
        <Carousel dataProducts={data} />
      </main>
    </>
  )
}
