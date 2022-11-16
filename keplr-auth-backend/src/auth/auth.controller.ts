import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('login')
    async login(@Body() permit: CreateUserDto){
        return await this.authService.login(permit);
    }
}
