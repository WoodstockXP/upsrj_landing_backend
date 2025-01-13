import { Controller, Patch, Body, Param, Delete, Get, Query, ParseUUIDPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateUserDto, UpdateUserStatusDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @Patch(':id')
    async updateUser(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.authService.updateUser(id, updateUserDto);
    }

    @ApiResponse({ status: 200, description: 'User status updated successfully' })
    @Patch(':id/status')
    async updateUserStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserStatusDto: UpdateUserStatusDto,
    ) {
        return this.authService.updateUserStatus(id, updateUserStatusDto);
    }

    @ApiResponse({ status: 200, description: 'User soft deleted successfully' })
    @Patch(':id/soft-delete')
    async softDeleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.authService.softDeleteUser(id);
    }

    @ApiResponse({ status: 200, description: 'User permanently deleted successfully' })
    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        await this.authService.deleteUser(id);
        return { message: 'User permanently deleted successfully' };
    }

    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    @Get()
    async getUsers(
        @Query('role') role: string,
        @Query('isActive') isActive: string,
    ) {
        const filters: any = {};
        if (role) filters.role = role;
        if (isActive !== undefined) filters.isActive = isActive === 'true';
        return this.authService.getUsers(filters);
    }
}  