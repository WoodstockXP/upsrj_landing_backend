import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty} from '@nestjs/swagger'
import { Permission } from '../../permission/entities/permission.entity';

@Entity('users')
export class User {

    @ApiProperty({description: 'User id', type: String})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({description: 'User matricula', type: String})
    @Column({
        type: 'text',
        length: 9,
        unique: true
    })
    matricula: string;

    @ApiProperty({description: 'User full name', type: String})
    @Column({
        type: 'text'
    })
    fullName: string;
    
    @ApiProperty({description: 'User email', type: String})
    @Column({
        type: 'text',
        unique: true
    })
    email: string;
    
    @ApiProperty({description: 'User password', type: String})
    @Column({
        type: 'text',
        select: false
    })
    password: string;
    
    @ApiProperty({description: 'User Status', type: String})
    @Column({
        type: 'boolean',
        default: true
    })
    isActive: boolean;

    @ApiProperty({description: 'User roles: admin, super-user, user. Default is user', type: [String]})
    @Column({
        type: 'text',
        array:true,
        default:['user']
    })
    roles:string[];

    @ApiProperty({description: 'User isDeleted', type: String})
    @Column({
        type: 'boolean',
        default: false 
    })
    isDeleted: boolean;

    @OneToMany(() => Permission, 
    permission => permission.user, 
    {cascade: true, eager: true}
    )
    permissions: Permission[];
    
}