import React, { useEffect, useState } from 'react'
import { allNfts } from './actions'
import Loading from './components/Loading'

import { Link } from 'react-router-dom'
import { Tag } from 'baseui/tag'

const Home = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    const getAllNfts = async () => {
      try {
        const res = await allNfts({
          status: 'all',
          category: 'all',
          page: 1,
          searchterm: 'null',
          sort: 'asc'
        })
        setNfts(res.data.data.list)
      } catch (e) {
        console.log(e)
      }
      setIsLoading(false)
    }
    getAllNfts()
  }, [])

  isLoading && <Loading />
  const renderNft = nfts.map(nft => (
    <div className="flex flex-col space-y-2 border p-3 text-lg rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">
          <Link to={`/nft/${nft._id}`}>{nft.name}</Link>
        </p>
        <Tag closeable={false}>{nft.category}</Tag>
      </div>
      <p className="text-base">Price : {nft.price}</p>
      <p className="text-sm">{nft.tags.toString()}</p>
      {nft.onSale && <p className="text-sm text-gray-400">For Sale</p>}
    </div>
  ))

  return (
    <div className="container m-auto">
      <h2 className="text-2xl my-10">NFTs</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">{renderNft}</div>
    </div>
  )
}

export default Home
