import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";

@Entity({ name: "tasks" })
export class TaskEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    description!: string;

    @Column()
    detail!: string;

    @Column()
    archived!: boolean;

    @Column({ name: "create_at" })
    createAt!: Date;

    @Column({ name: "update_at" })
    updateAt!: Date;

    @Column({ name: "fk_id_user" })
    userId!: string;

    @ManyToOne(() => UserEntity, (user) => user.tasksEntity)
    @JoinColumn({ name: "fk_id_user", referencedColumnName: 'id'})
    userEntity!: UserEntity;
}
