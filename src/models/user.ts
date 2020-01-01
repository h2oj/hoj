import * as TypeORM from 'typeorm';
import Model from './model';

@TypeORM.Entity('user')
export default class User extends Model {
    @TypeORM.PrimaryGeneratedColumn()
    uid: number;

    @TypeORM.Column({ nullable: false, type: 'varchar', length: 32 })
    username: string;

    @TypeORM.Column({ nullable: false, type: 'char', length: 32 })
    password: string;

    @TypeORM.Column({ nullable: true, type: 'datetime' })
    reg_time: Date;

    @TypeORM.Column({ nullable: true, type: 'datetime' })
    last_login: Date;

    @TypeORM.Column({ nullable: true, type: 'varchar', length: 32 })
    nickname: string;

    @TypeORM.Column({ nullable: true, type: 'varchar', length: 256 })
    avatar: string;

    @TypeORM.Column({ nullable: true, type: 'varchar', length: 64 })
    description: string;

    @TypeORM.Column({ nullable: true, type: 'text' })
    infomation: string;

    @TypeORM.Column({ nullable: true, type: 'varchar', length: 256 })
    tag: string;

    @TypeORM.Column({ nullable: false, type: 'tinyint' })
    sex: number;

    @TypeORM.Column({ nullable: true, type: 'integer' })
    rating: number;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    ac_count: number;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    submit_count: number;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    following: number;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    follower: number;
}

