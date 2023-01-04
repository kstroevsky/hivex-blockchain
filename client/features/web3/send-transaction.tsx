import React from 'react';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { useWalletAuth } from '../../hooks/useWalletAuth';

interface Transaction {
  to: string;
  value: string;
  gas: number;
  gasPrice: string;
  from: `0x${string}` | undefined;
}

const web3 = new Web3(
  new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/1ea64f9ee1864f8c952bf15187154089`),
);

const SendTransactionWithWeb3 = () => {
  const router = useRouter();
  const { useAccount } = useWalletAuth();
  const { address } = useAccount();
  console.log(address);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as any);
    const to = formData.get('to') as string;
    const value = formData.get('value') as string;

    const tx: Transaction = {
      to,
      from: address,
      value: web3.utils.toWei(value, 'ether'),
      gas: 21000,
      gasPrice: web3.utils.toWei('10', 'gwei'),
    };

    web3.eth
      .sendTransaction(tx)
      .then((receipt) => {
        console.log(receipt);
        router.push('/transaction-status', `/transaction-status/${receipt.transactionHash}`);
      })
      .catch((error) => {
        console.error(error);
        alert('Error sending transaction');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="to">To:</label>
      <input type="text" name="to" id="to" />
      <br />
      <label htmlFor="value">Value (ETH):</label>
      <input type="text" name="value" id="value" />
      <br />
      <button type="submit">Send Transaction</button>
    </form>
  );
};

export default SendTransactionWithWeb3;
