const hre = require("hardhat")
const ethers = hre.ethers;

async function main() {
	const NAME = 'Boom Token'
	const SYMBOL = 'BMTK'
	const MAX_SUPPLY = '10000000'
	const PRICE = ethers.utils.parseUnits('0.025', 'ether')


	const Token = await hre.ethers.getContractFactory('Token')
	let token = await Token.deploy('Boom Token', 'BMTK', '10000000')

	await token.deployed()
	console.log(`Token deployed to: ${token.address}\n`)

	const Crowdsale = await hre.ethers.getContractFactory('Crowdsale')
	const crowdsale = await Crowdsale.deploy(token.address, PRICE, ethers.utils.parseUnits(MAX_SUPPLY, 'ether'))
	await crowdsale.deployed();

	console.log(`Crowdsale deployed to : ${crowdsale.address}\n`)

	const transaction = await token.transfer(crowdsale.address, ethers.utils.parseUnits(MAX_SUPPLY, 'ether'))
	await transaction.wait()

	console.log(`Tokens transferred to Crowdsale\n`)
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
})	
