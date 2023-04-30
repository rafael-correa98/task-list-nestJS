import { TaskEntity } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryColumn()
    id!: string;

    @Column({ unique: true })
    name!: string;

    @Column()
    password!: string;

    @OneToMany(() => TaskEntity, (task) => task.userEntity)
    tasksEntity?: TaskEntity[];
}
