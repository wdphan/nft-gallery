import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import { BookOpenIcon, CodeIcon, ShareIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { NFTCard } from '../components/nftCard'

const Home = () => {
	const [wallet, setWalletAddress] = useState('')
	const [collection, setCollectionAddress] = useState('')
	const [NFTs, setNFTs] = useState([])
	const [fetchForCollection, setFetchForCollection] = useState(false)

	const fetchNFTs = async () => {
		let nfts
		console.log('fetching nfts')
		const api_key = 'A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM'
		const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`

		if (!collection.length) {
			var requestOptions = {
				method: 'GET',
			}

			const fetchURL = `${baseURL}?owner=${wallet}`

			nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
		} else {
			console.log('fetching nfts for collection owned by address')
			const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
			nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
		}

		if (nfts) {
			console.log('nfts:', nfts)
			setNFTs(nfts.ownedNfts)
		}
	}

	const fetchNFTsForCollection = async () => {
		if (collection.length) {
			var requestOptions = {
				method: 'GET',
			}
			const api_key = 'A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM'
			const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`
			const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${'true'}`
			const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
			if (nfts) {
				console.log('NFTs in collection:', nfts)
				setNFTs(nfts.nfts)
			}
		}
	}

	return (
		<div className="flex flex-col justify-center py-8 bg-[#0E0E0F] h-100vh items-center pt-32 pb-[100vh]">
			<div className="flex flex-col w-full justify-center items-center gap-y-2">
				<h1 className="text-5xl sm:text-5xl text-white font-bold">Search NFTs</h1>
				<input
					disabled={fetchForCollection}
					className="w-2/5 bg-[#232329] py-2 px-2 rounded-lg text-[#EFEFEF]focus:outline-blue-300 mt-4"
					onChange={e => {
						setWalletAddress(e.target.value)
					}}
					value={wallet}
					type={'text'}
					placeholder="Add your wallet address"
				></input>
				<input
					className="w-2/5 py-2 px-2 rounded-lg text-[#EFEFEF] focus:outline-blue-300 mt-4 bg-[#232329]"
					onChange={e => {
						setCollectionAddress(e.target.value)
					}}
					value={collection}
					type={'text'}
					placeholder="Add the collection address"
				></input>
				<label className="text-[#EFEFEF] mt-4">
					<input
						onChange={e => {
							setFetchForCollection(e.target.checked)
						}}
						type={'checkbox'}
						className="mr-2 bg-[#232329]"
					></input>
					Fetch for collection
				</label>
				<button
					className={
						'disabled:bg-slate-500 text-white bg-[#43B5F4] rounded-full px-4 py-2 mt-3  w-1/6 mb-3 font-bold text-lg'
					}
					onClick={() => {
						if (fetchForCollection) {
							fetchNFTsForCollection()
						} else fetchNFTs()
					}}
				>
					Search{' '}
				</button>
			</div>
			<div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-10 justify-center ">
				{NFTs.length &&
					NFTs.map(nft => {
						return <NFTCard key={NFTs.length} nft={nft}></NFTCard>
					})}
			</div>
		</div>
	)
}

export default Home
