import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('system_module')
export class SystemModule {
    
    @ApiProperty({description: 'Module id', type: String})
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({description: 'Module name', type: String})
    @Column({
        type: 'text',
    })
    module_name: string;
    
    @ApiProperty({description: 'Is Active Module', type: Boolean})
    @Column({
        type: 'boolean',
        default: true
    })
    isActive: boolean;

    @OneToMany(
        () => Permission,
        permission => permission.module
    )
    permission: Permission[];
}