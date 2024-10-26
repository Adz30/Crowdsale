 
 import { useEffect, useState } from 'react'
 import { Container } from 'react-bootstrap'
 import { ethers } from 'ethers'

 import Navigation from './Navigation';
 import Info from './Info';
 import Loading from './Loading';
 import Progress from './Progress';
 import Buy from './Buy';

 import TOKEN_ABI from '../abis/Token.json'
 import CROWDSALE_ABI from '../abis/Crowdsale.json'

 import config from '../config.json';

 function App () {

 	const [provider, setProvider] = useState(null)
 	const [crowdsale, setCrowdsale] = useState(null)

 	const [account, setAccount] = useState(null)
 	const [accountBalance, setAccountBalance] = useState(0)

	const [price, setPrice] = useState(0)
	const[maxTokens, setMaxTokens] = useState(0)
	const [tokensSold, setTokensSold] = useState(0)

 	const [isLoading, setIsLoading] = useState(true)


	const loadBlockchainData = async () => {

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(provider)
	
		const token = new ethers.Contract(config[31337].token.address, TOKEN_ABI,  provider)
		const crowdsale = new ethers.Contract(config[31337].crowdsale.address, CROWDSALE_ABI,  provider)
		setCrowdsale(crowdsale)	

		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
		const account = ethers.utils.getAddress(accounts[0])
		setAccount(account)
		console.log(account)

		const accountBalance = ethers.utils.formatUnits(await token.balanceOf(account))
		setAccountBalance(accountBalance)
		console.log(accountBalance)
		
		const price = ethers.utils.formatUnits(await crowdsale.price())
		setPrice(price)

		const maxTokens = ethers.utils.formatUnits (await crowdsale.maxTokens())
		setMaxTokens(maxTokens)

		const tokensSold = ethers.utils.formatUnits (await crowdsale.tokensSold())
		setTokensSold(tokensSold)




	

	setIsLoading(false)

	}	
	
	useEffect(() => {
		if(isLoading) {
		loadBlockchainData()
		}
	}, [isLoading] )

	return (
		<Container>
			<Navigation />

			<h1 className='my-4 text-center'>Introducing Boom Token! </h1>

			{isLoading ? (
				<Loading />
				) : (
				<>
				<p className= 'text-center'><strong>Current Price:</strong> {price} ETH</p>
				<Buy provider={provider} price={price} crowdsale={crowdsale} setIsLoading={setIsLoading} />
				<Progress maxTokens={maxTokens} tokensSold={tokensSold} />
				</>
				)}

			<hr />
			{account && (
				<Info account={account}  accountBalance={accountBalance} />
			)}
			</Container>
	);
}

export default App;