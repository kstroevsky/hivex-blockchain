import { Button } from '@mui/material';
import React, { useState } from 'react';
import { FormControl, Box, TextField, Typography } from '../../shared/kit';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { utils } from 'ethers';

export const SendTransaction = () => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const { config } = usePrepareSendTransaction({
    request: {
      to: to,
      value: amount ? utils.parseEther(amount) : undefined,
    },
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <FormControl
      fullWidth
      onSubmit={(e) => {
        e.preventDefault();
        sendTransaction?.();
      }}
      sx={{ display: 'flex', flexDirection: 'column', gap: '20px', py: '20px' }}
    >
      <Typography variant="h4">Send Transaction</Typography>
      <TextField
        label="Recipient"
        variant="outlined"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <TextField
        label="Amount (ether)"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.05"
        value={amount}
      />

      <Button disabled={!to || !amount} variant="contained" type="submit">
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
      {isSuccess && (
        <Box>
          <Typography variant="h5" color={'green'}>
            Successfully sent {amount} ether to {to}
          </Typography>
          <Typography
            variant="body1"
            component={'a'}
            href={`https://etherscan.io/tx/${data?.hash}`}
          >
            Etherscan
          </Typography>
        </Box>
      )}
      {isError && (
        <Typography variant="h5" color={'red'}>
          Something went wrong ...
        </Typography>
      )}
    </FormControl>
  );
};
