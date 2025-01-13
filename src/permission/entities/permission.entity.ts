import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SystemModule } from "./systemModule.entity";

@Entity('permissions')
export class Permission {

    @ApiProperty({description: 'Permission id', type: String})
    @PrimaryGeneratedColumn('uuid')
    id_permission: string;
    
    
    @Column({
        type: 'text'
    })
    module_name: string;
    
    @ApiProperty({description: 'CREATE permission', type: Boolean})
    @Column({
        type: 'boolean',
        default: false
    })
    create: boolean;

    @ApiProperty({description: 'READ permission', type: Boolean})
    @Column({
        type: 'boolean',
        default: false
    })
    read: boolean;

    @ApiProperty({description: 'UPDATE permission', type: Boolean})
    @Column({
        type: 'boolean',
        default: false
    }
    )
    update: boolean;

    @ApiProperty({description: 'DELETE permission', type: Boolean})
    @Column({
        type: 'boolean',
        default: false
    })
    delete: boolean;

    @ManyToOne(
        () => User, 
        (user) => user.permissions
    )
    user: User;
    
    @ManyToOne(
        () => SystemModule,
        (module) => module.permission,
        {eager: true}
    )
    module: SystemModule;
}
