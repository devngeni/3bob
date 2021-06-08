import { Keypair, PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js'


interface createSolanaAccount {
    publicKey: string;
    secretKey: string;
}
/**
 * Creates a solana account
 * @returns account address and secret key
 */

const createSolanaAccount = async (): Promise<{ address: string, secretKey: string }> => {
    const keypair = new Keypair()

    const address: string = keypair.publicKey.toString()
    const secretKey: string = Buffer.from(keypair.secretKey.buffer).toString('hex');


    return {
        address: address,
        secretKey: secretKey
    }

}

interface TransferParams {
    /** Account that will transfer lamports */
    fromPubkey: string;
    /** Account that will receive transferred lamports */
    toPubkey: string;
    /** Amount of lamports to transfer */
    lamports: number;
};

/**
 *  Transfers lamports from one account to another
 * @param params TransferParams
 */
const transferLamports = async (params: TransferParams) => {

    const txnInst: TransactionInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(params.fromPubkey),
        lamports: params.lamports,
        toPubkey: new PublicKey(params.toPubkey),
    })
}

export { createSolanaAccount, transferLamports }

