import axios from 'axios';
import { useState } from 'react';
import logo from '../../assets/metamask.svg';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '../../shared/kit';

const chains = [
  {
    value: '0x1',
    label: 'Ethereum',
  },
  {
    value: '0x38',
    label: 'Bsc',
  },
  {
    value: '0x89',
    label: 'Polygon',
  },
  {
    value: '0xa86a',
    label: 'Avalanche',
  },
];
interface NFTs {
  amount: string;
  block_number_minted: string | string;
  contract_type: null | string;
  last_metadata_sync: string;
  last_token_uri_sync: null | string;
  metadata: string;
  minter_address: null | string;
  name: string;
  symbol: string;
  token_address: string;
  token_hash: string;
  token_id: string;
  token_uri: string;
  updated_at: null | string;
}
export const Gallery = () => {
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('0x1');
  const [cursor, setCursor] = useState(null);
  const [NFTs, setNFTs] = useState<NFTs[]>([]);

  function getImgUrl(metadata: string) {
    if (!metadata) return logo;

    let meta = JSON.parse(metadata);

    if (!meta.image) return logo;

    if (!meta.image.includes('ipfs://')) {
      return meta.image;
    } else {
      return 'https://ipfs.io/ipfs/' + meta.image.substring(7);
    }
  }

  async function fetchNFTs() {
    const options = {
      method: 'GET',
      url: `https://deep-index.moralis.io/api/v2/nft/${address}`,
      params: { chain: 'eth', format: 'decimal', normalizeMetadata: 'false', limit: 50 },
      headers: {
        accept: 'application/json',
        'X-API-Key': '1hhqT9QjDMgwooJGpOTLEuK2mYcoIYkJBlWz4MzBIZ5DYfA4kuwJnYP1CbLGl02e',
      },
    };

    let res = await axios
      .request(options)
      .then((res) => res.data)
      .catch((error) => console.error(error));
    console.log('res', res);
    let n = NFTs;
    setNFTs(n.concat(res.result));
    setCursor(res.result.cursor);
  }

  function addressChange(e: any) {
    setAddress(e.target.value);
    setCursor(null);
    setNFTs([]);
  }

  function chainChange(e: any) {
    setChain(e.target.value);
    setCursor(null);
    setNFTs([]);
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h2">Gallery</Typography>

      <Typography variant="h6">Cool Cats (ETH)</Typography>
      <Typography variant="body2">0x1A92f7381B9F03921564a437210bB9396471050C</Typography>

      <Typography variant="h6">Smol Apas (AVAX) </Typography>
      <Typography variant="body2">0x3DD5e0f0659cA8b52925E504FE9f0250bFe68301</Typography>

      <Box sx={{ py: 2 }}>
        <Typography variant="h6">Example</Typography>
        <Typography variant="body2">0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px', py: '10px', width: '60%' }}>
          <TextField
            label="Contract"
            variant="standard"
            value={address}
            onChange={(e) => addressChange(e)}
          />
          <TextField label="Chain" select defaultValue="0x1" onChange={(e) => chainChange(e)}>
            {chains.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button variant="contained" onClick={fetchNFTs} sx={{ mb: 4 }}>
          Get NFT's
        </Button>

        {NFTs.length > 0 && (
          <Box sx={{ maxHeight: '55vh', overflow: 'auto' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {NFTs?.map((e, i) => (
                <Grid item xs={2} sm={4} md={4} key={i}>
                  <Card sx={{ maxWidth: 170 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      // image="/static/images/cards/contemplative-reptile.jpg"
                      src={getImgUrl(e.metadata)}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {`${e.name}\n${e.token_id}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {cursor && (
              <>
                <button className="bu" onClick={fetchNFTs}>
                  Load More
                </button>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
