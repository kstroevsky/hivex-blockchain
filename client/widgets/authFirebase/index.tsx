import { useEffect, useState } from 'react';
import { initFirebase } from '../../firebase';
import { getAuth } from '@firebase/auth';
import { getMoralisAuth } from '@moralisweb3/client-firebase-auth-utils';
import { signInWithMoralis } from '@moralisweb3/client-firebase-evm-auth';
import { Box, Button, Typography } from '../../shared/kit';
import { useRouter } from 'next/router';

export default function Login({ user1 }: any) {
  initFirebase();
  const [user, setUser] = useState<string>('');
  const auth = getAuth();
  const { push } = useRouter();

  async function login() {
    const moralisAuth = getMoralisAuth(initFirebase());
    const res = await signInWithMoralis(moralisAuth);
    setUser(res.credentials.user.uid);
  }

  async function logout() {
    await auth.signOut();
    setUser('');
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>Firebase Moralis Auth Extension 🔐</Typography>
        {!user ? (
          <Button className="searchButton" onClick={login}>
            Login
          </Button>
        ) : (
          <>
            <Typography>User:{user}</Typography>
            <Button className="searchButton" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Box>
    </>
  );
}
