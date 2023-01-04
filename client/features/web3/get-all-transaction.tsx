import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../../shared/kit';
import Web3 from 'web3';

interface Transaction {
  blockNumber: number;
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: number;
  gasPrice: string;
  input: string;
  nonce: number;
  r: string;
  s: string;
  v: number;
  transactionIndex: number;
}

const web3 = new Web3(
  new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/1ea64f9ee1864f8c952bf15187154089`),
);

export default function GetTransactionsByAddress() {
  const transactions: any = [];

  const getTransactions = async () => {
    const address = '0x2f318C334780961FB129D2a6c30D0763d9a5C970';

    let latestBlockNumber = await web3.eth.getBlockNumber();
    let transactionCount = await web3.eth.getTransactionCount(address);

    while (transactionCount > 0) {
      const block = await web3.eth.getBlock(latestBlockNumber, true);

      if (block.transactions.length > 0) {
        transactions.push(
          ...block.transactions.filter((tx: any) => tx.from === address || tx.to === address),
        );
        transactionCount -= block.transactions.length;
      }
      latestBlockNumber--;
    }
    return transactions;
  };
  getTransactions();


  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Block number</TableCell>
          <TableCell>Hash</TableCell>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell>Value</TableCell>
          <TableCell>Gas</TableCell>
          <TableCell>Gas price</TableCell>
          <TableCell>Input</TableCell>
          <TableCell>Nonce</TableCell>
          <TableCell>R</TableCell>
          <TableCell>S</TableCell>
          <TableCell>V</TableCell>
          <TableCell>Transaction index</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((transaction: Transaction) => (
          <TableRow key={transaction.hash}>
            <TableCell>{transaction.blockNumber}</TableCell>
            <TableCell>{transaction.hash}</TableCell>
            <TableCell>{transaction.from}</TableCell>
            <TableCell>{transaction.to}</TableCell>
            <TableCell>{transaction.value}</TableCell>
            <TableCell>{transaction.gas}</TableCell>
            <TableCell>{transaction.gasPrice}</TableCell>
            <TableCell>{transaction.input}</TableCell>
            <TableCell>{transaction.nonce}</TableCell>
            <TableCell>{transaction.r}</TableCell>
            <TableCell>{transaction.s}</TableCell>
            <TableCell>{transaction.v}</TableCell>
            <TableCell>{transaction.transactionIndex}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
