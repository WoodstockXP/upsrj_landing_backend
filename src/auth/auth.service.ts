import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto, UpdateUserStatusDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id, isDeleted: false } });
        if (!user) {
        throw new NotFoundException(`User with ID ${id} not found or has been deleted`);
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async updateUserStatus(id: string, updateUserStatusDto: UpdateUserStatusDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id, isDeleted: false } });
        if (!user) {
        throw new NotFoundException(`User with ID ${id} not found or has been deleted`);
        }
        user.isActive = updateUserStatusDto.isActive;
        return this.userRepository.save(user);
    }

    async softDeleteUser(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id, isDeleted: false } });
        if (!user) {
        throw new NotFoundException(`User with ID ${id} not found or already deleted`);
        }
        user.isDeleted = true;
        return this.userRepository.save(user);
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
        }
        if (!user.isDeleted) {
        throw new BadRequestException(`User with ID ${id} must be soft deleted before permanent removal`);
        }
        await this.userRepository.delete(id);
    }

    async getUsers(filters: Partial<User>): Promise<User[]> {
        const query = this.userRepository.createQueryBuilder('user');

        if (filters.roles) {
        query.andWhere('user.roles = :roles', { role: filters.roles });
        }
        if (filters.isActive !== undefined) {
        query.andWhere('user.isActive = :isActive', { isActive: filters.isActive });
        }

        query.andWhere('user.isDeleted = :isDeleted', { isDeleted: false });

        return query.getMany();
    }
    }
