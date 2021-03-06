import Head from 'next/head'
import CoinList from '../components/CoinList/coin-list'
import SearchBar from '../components/SearchBar/search-bar'
import Layout from '../components/Layout/layout'
import {useState} from 'react'

export default function Home({ filteredCoins }) {
  const [search, setSearch] = useState('')

  const allCoins = filteredCoins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) || search == ""
  )

  const handleChange = e => {
    e.preventDefault()
    debugger

    setSearch(e.target.value.toLowerCase())

    console.log(search)
  }

  console.log(filteredCoins)
  return (
    <Layout>
      {search}
      <div className="coin_app">
        <SearchBar type="text" placeholder='Search' onChange={handleChange} />
        <CoinList filteredCoins={allCoins}/>
      </div>
      
      
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')

  const filteredCoins = await res.json()

  return {
    props: {
      filteredCoins
    }
  }
}
