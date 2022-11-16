import { SecretNetworkClient } from 'secretjs';
import { TEST_CHAIN_ID } from '../../global/chaindId';
import axios, {Axios} from 'axios'
async function secretJsKeplr() {
  if (!(window as any).keplr) {
    throw new Error('please install Keplr');
  }

  const keplrOfflineSigner = (window as any).keplr.getOfflineSignerOnlyAmino(TEST_CHAIN_ID);

  const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

  const grpcWebUrl = 'https://grpc.pulsar.scrttestnet.com';

  const secretjs = new SecretNetworkClient({
    url: grpcWebUrl,
    chainId: TEST_CHAIN_ID,
    wallet: keplrOfflineSigner,
    walletAddress: myAddress,
    encryptionUtils: (window as any).keplr.getEnigmaUtils(TEST_CHAIN_ID),
  });
  let owner = "secret1d8k0jzrv359fyrlw3z2748nm5qrjx5djeuayvg"

  const permit = await (window as any).keplr.signAmino(
        TEST_CHAIN_ID,
        myAddress,
        {
            chain_id: TEST_CHAIN_ID,
            account_number: "0",
            sequence: "0",
            fee: {
                amount: [{ denom: "uscrt", amount: "0" }],
                gas: "1",
            },
            msgs: [
                {
                    type: "Auth",
                    value: "This is a signature request. "
                },
            ],
            memo: "TEST",
        },
        {
            preferNoSetFee: true, // Fee must be 0, so hide it from the user
            preferNoSetMemo: false,
        }
    )
  // let permit = await secretjs.utils.accessControl.permit.sign(myAddress, TEST_CHAIN_ID, "AuthPermit", ["secret1epa0my9a7zmw2d0yu25jvh8udxx337dy3tw9ml"], ["owner"], true)



  console.log(permit)

  let url = "http://localhost:3001/auth/login"
  let reqObject = {
    signature: permit,
    address: myAddress,
  }
  console.log(myAddress)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqObject),
  })
  
  return secretjs;
}
export { secretJsKeplr };
