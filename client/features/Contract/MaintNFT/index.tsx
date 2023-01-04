import * as React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { Box, Button, Typography } from '../../../shared/kit';

export const MintNFT = () => {
  const { config } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Box>
      <Typography variant="h5">Contract Write</Typography>
      <Button disabled={!write || isLoading} onClick={write} variant="contained">
        {isLoading ? 'Minting...' : 'Mint'}
      </Button>
      {isSuccess && (
        <Box>
          <Typography variant="h5" color={'green'}>
            Successfully minted your NFT!
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
    </Box>
  );
};
