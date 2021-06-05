import { Keypair } from '@solana/web3.js'


interface createSolanaAccount {
    publicKey: string;
    secretKey: string;
}
/**
 * Creates a solana account
 * @returns account address and secret key
 */

const createSolanaAccount = async  () : Promise<{address: string, secretKey: string }> =>  {
    const keypair = new Keypair()

    const address: string = keypair.publicKey.toString()
    const secretKey: string = Buffer.from(keypair.secretKey.buffer).toString('hex');


    return {
        address: address,
        secretKey: secretKey
    }

}


export {createSolanaAccount}

