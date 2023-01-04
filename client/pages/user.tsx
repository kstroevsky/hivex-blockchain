import React, { useEffect } from 'react';
import Moralis from 'moralis';
import { Box, Tab, TabContext, TabList, TabPanel, Button } from '../shared/kit';
import { getSession, GetSessionParams, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Gallery } from '../widgets/Gallery';
import { SendTransaction } from '../features/SendTransaction';
import { MintNFT } from '../features/Contract';
import { getAuth } from '@firebase/auth';
import SendTransactionWithWeb3 from '../features/web3/send-transaction';
import GetTransactionsByAddress from '../features/web3/get-all-transaction';

const tabs = ['Profile', 'Swap', 'NFT-gallery', 'NFT-marketplace'];
// gets a prop from getServerSideProps
export default function Main({ user }: any) {
  const [currentTab, setCurrentTab] = React.useState(tabs[0]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <TabContext value={currentTab}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <TabList
              onChange={(e: React.SyntheticEvent, tab: string) => setCurrentTab(tab)}
              orientation="vertical"
              sx={{
                alignItems: 'flex-start',
                height: '100vh',
                minWidth: 180,
                backgroundColor: 'white',
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  sx={{ alignSelf: 'flex-start', minWidth: 0 }}
                  key={tab}
                  value={tab}
                  label={tab}
                />
              ))}
            </TabList>
          </Box>

          <TabPanel value="Profile" sx={{ width: '100%' }}>
            <Box>
              <h4>User session:</h4>
              <pre>{JSON.stringify(user, null, 2)}</pre>
              <SendTransaction />
              <MintNFT />
            </Box>
          </TabPanel>
          <TabPanel value="Swap">Swap</TabPanel>
          <TabPanel value="NFT-gallery" sx={{ width: '100%' }}>
            <Gallery />
          </TabPanel>
          <TabPanel value="NFT-marketplace">NFT-marketplace</TabPanel>
          <Button
            sx={{ position: 'absolute', bottom: 25, left: 20 }}
            variant="outlined"
            color="error"
            onClick={() => signOut()}
          >
            Log out
          </Button>
        </TabContext>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  //This logic give us a user balance
  // await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  // const response = await Moralis.EvmApi.balance.getNativeBalance({
  //   address: session.user.address,
  //   chain: 0x1,
  // });

  return {
    props: { user: session.user },
  };
}
