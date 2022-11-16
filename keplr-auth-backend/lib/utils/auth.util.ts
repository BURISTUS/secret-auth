import { toUtf8, fromBase64 } from '@cosmjs/encoding';
import { bech32 } from 'bech32';
import { sha256 } from '@noble/hashes/sha256';
import * as secp256k1 from '@noble/secp256k1';
import { ripemd160 } from '@noble/hashes/ripemd160';

export class AuthUtils {
    sortedObject(obj: any) {
        console.log(obj);
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(this.sortedObject);
        }
        const sortedKeys = Object.keys(obj).sort();
        const result = {};
        sortedKeys.forEach((key) => {
            result[key] = this.sortedObject(obj[key]);
        });
        console.log(result);
        return result;
    }

    jsonSortedStringify(obj) {
        return JSON.stringify(this.sortedObject);
    }

    serializeStdSignDoc(signDoc) {
        return toUtf8(this.jsonSortedStringify(signDoc));
    }

    async checkSignature(permit: any, address: string) {
        const signature = permit.signature.signature;
        const pubkey = permit.signature.pub_key.value;
        const signed = permit.signed;

        const derivedAddress = bech32.encode(
            'secret',
            bech32.toWords(ripemd160(sha256(fromBase64(pubkey)))),
        );

        if (address !== derivedAddress) {
            return false;
        }

        try {
            const messageHash = sha256(this.serializeStdSignDoc(signed));

            const sig = secp256k1.Signature.fromCompact(fromBase64(signature));

            return secp256k1.verify(sig, messageHash, fromBase64(pubkey));
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
