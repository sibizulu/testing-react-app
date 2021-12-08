import React, { useEffect, useState } from 'react'
import Process from './components/Process'
import { useParams } from 'react-router-dom'
import { nftDetails } from './actions'
import Loading from './components/Loading'
import { Link } from 'react-router-dom'
import NoResult from './components/NoResult'

const Details = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const handlePopup = popupState => setIsOpen(popupState)
  let { id } = useParams()

  useEffect(() => {
    const getNftDetails = async id => {
      try {
        const res = await nftDetails(id)
        setData(res.data.data.asset)
      } catch (e) {
        console.log(e)
      }
      setIsLoading(false)
    }

    getNftDetails(id)
  }, [id])

  if (isLoading) return <Loading />

  if (Object.keys(data).length === 0) return <NoResult />

  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          {data.asset.mimeType.startsWith('image') ? (
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={data.asset.path}
            />
          ) : (
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          )}

          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest uppercase">
              {data.category}
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
              {data.name}
            </h1>

            <p class="leading-relaxed">{data.description}</p>
            <div class="my-5">
              <p>
                <b>Item left</b> {data.numberOfCopy}
              </p>
              <p>
                <b>Asset type</b> {data.assetType}
              </p>
              <p>
                <b>Royalty</b> {data.royalty}%
              </p>
            </div>

            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900">
                {data.price}
              </span>
              {data.numberOfCopy > 0 && (
                <button
                  class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                  onClick={() => handlePopup(true)}>
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Process {...{ handlePopup, isOpen, data }} />
      <div className="container m-auto">
        <Link to="/">Back to home</Link>
      </div>
    </section>
  )
}

export default Details
