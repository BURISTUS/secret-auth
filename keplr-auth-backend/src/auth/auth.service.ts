import { Injectable } from '@nestjs/common';
import { AuthUtils } from 'lib/utils/auth.util';
import { CreateUserDto } from './dto';

@Injectable()
export class AuthService {
    authUtils = new AuthUtils();
    async login(authDto: CreateUserDto) {
        // if (authDto.signature) console.log(`Signature received`);
        // else console.log(`Signature not received`);
        // const uint8key = Uint8Array.from(authDto.publicKey);
        // const message = new Uint8Array([23, 65, 12, 87]);
        // const uint8signature = Uint8Array.from(authDto.signature.split(','));
        // const verified = verify(uint8key, message, uint8signature);
        // console.log(verified);
        console.log(authDto);
        if (
            !(await this.authUtils.checkSignature(
                authDto.signature,
                authDto.address,
            ))
        ) {
            console.log('Incorrect permit or mismatching address.');
            return;
        }
    }
}
