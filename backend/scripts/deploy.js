const {ethers ,run , network}  = require ("hardhat");


async function main(){
  const LotteryFactory = await ethers.getContractFactory("Lottery");
  console.log("Deploying contract ...");
  const Lottery = await LotteryFactory.deploy();
  await Lottery.deployed();
  console.log(`Deployed Contract to  ${Lottery.address}`)

  if(network.config.chainId === 5  && process.env.Etherscan_Api)
  {
    await Lottery.deployTransaction.wait(6)
    await verify(Lottery.address,[])
  }
}

async function verify(contractAddress, args)
{
  console.log("Verifying ...")
  try{
   await run("verify:verify",{
    address : contractAddress,
    constructorArguments : args,
  })
}
catch(e)
{
  if(e.message.toLowerCase().includes("already verified"))
  {
    console.log("already verified");
  }
  else{
    console.log(e)
  }
}
}

main().then(()=>process.exit(0)).catch((error) => {
  console.log(error);
  process.exit(1);
});