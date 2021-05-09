import React from 'react'
import Layout from '../../components/Layout/layout'
import styles from './Coin.module.css'

const Coin = ({coin}) => {
    return (
        coin && <Layout>
            <div className={styles.coin_page}>
                <div className={styles.coin_container}>
                    <img className={styles.coin_image} src={coin.image?.large}/>
                    <h1 className={styles.coin_name}></h1>
                    <p className={styles.coin_ticker}>{coin.symbol}</p>
                    <p className={styles.coin_current}>{coin.market_data?.current_price.usd}</p>
                </div>
            </div>
        </Layout>
    )
}

export default Coin

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    id: "bitcoin"
                }
            },
            {
                params: {
                    id: "ethereum"
                }
            }, 
        ],
        fallback: false
    }
}

export async function getStaticProps(context) {
    const {id} = context.params
    

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)

    const data = await res.json()

    return {
        props: {
            coin: data
        }
    }
}
