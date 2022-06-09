import { networkInterfaces } from 'os'

export const NFTCard = ({ nft }) => {
	return (
		<div className="w-1/4 flex flex-col">
			<div className="rounded-lg">
				<img className="object-cover w-full rounded-t-lg" src={nft.media[0].gateway}></img>
			</div>
			<div className="flex flex-col y-gap-2 px-2 py-3 bg-[#232329] rounded-b-lg ">
				<div className="">
					<h2 className="text-xl text-[#EFEFEF] font-bold mt-5">{nft.title}</h2>
					<p className="text-[#EFEFEF]">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
					<p className="text-[#EFEFEF]">{`${nft.contract.address.substr(
						0,
						4
					)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
				</div>

				<div className="flex justify-center mb-1">
					<a
						target={'noopener noreferrer'}
						href={`https://etherscan.io/token/${nft.contract.address}`}
						className="py-2 px-4 bg-[#43B5F4] w-3/4 text-center rounded-m text-white cursor-pointer rounded-full h-10 mt-7 mb-5 font-bold "
					>
						View on Etherscan
					</a>
				</div>
			</div>
		</div>
	)
}
