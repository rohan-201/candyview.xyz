// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchCandyMachine, mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
// @ts-ignore
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { network },
      } = req;

    const { id } = req.query;
    const umi = createUmi(network && network.includes("mainnet") ? "https://solana-mainnet.g.alchemy.com/v2/DBttxukNil1Us0M605rbiUwEnG9zRW4G" : "https://api.devnet.solana.com").use(mplCandyMachine());

    const candyMachine = await fetchCandyMachine(umi, id);
    console.log(candyMachine)

    res.status(200).json({
        PublicKey: candyMachine.publicKey,
        NFTsLoaded: candyMachine.itemsLoaded.toString(),
        NFTsMinted: candyMachine.itemsRedeemed.toString(),
        Authority: candyMachine.authority,
        Royalty: `${Number(candyMachine.data.sellerFeeBasisPoints.basisPoints.toString()) / 100}%`,
        CollectionMint: candyMachine.collectionMint,
        IsMutable: candyMachine.data.isMutable,
        CreatorCount: candyMachine.data.creators.length,
        TokenStandard: candyMachine.tokenStandard
    })
}