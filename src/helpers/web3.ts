import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import abi from './abi';

export async function getBalance(
  web3: Web3Provider,
  tokenAddress: string,
  accountAddress: string
): Promise<BigNumber> {
  const signer = web3.getSigner();

  const erc20Contract = new Contract(getAddress(tokenAddress), abi.ERC20, web3);
  const contractWithSigner = erc20Contract.connect(signer);

  return contractWithSigner.balanceOf(getAddress(accountAddress));
}
