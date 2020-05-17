import * as TypeORM from 'typeorm';
import Model from './model';

@TypeORM.Entity('user')
export default class User extends Model {
    @TypeORM.PrimaryGeneratedColumn()
    uid: number;

    @TypeORM.Column({ nullable: false, type: 'varchar', length: 32 })
    username: string;

    @TypeORM.Column({ nullable: false, type: 'char', length: 16 })
    crypto_salt: string;

    @TypeORM.Column({ nullable: false, type: 'char', length: 32 })
    password: string;

    @TypeORM.Column({ nullable: true, type: 'integer' })
    reg_time: number;

    @TypeORM.Column({ nullable: true, type: 'integer' })
    last_login: number;

    @TypeORM.Column({ nullable: true, type: 'varchar', length: 32 })
    nickname: string;

    @TypeORM.Column({ nullable: true, type: 'varchar', length: 256 })
    avatar: string;

    @TypeORM.Column({ nullable: true, type: 'varchar', length: 256 })
    email: string;

    @TypeORM.Column({ nullable: true, type: 'varchar', length: 64 })
    description: string;

    @TypeORM.Column({ nullable: true, type: 'text' })
    information: string;

    @TypeORM.Column({ nullable: false, type: 'tinyint', default: 0 })
    sex: number;

    @TypeORM.Column({ nullable: false, type: 'integer', default: 0 })
    rating: number;

    @TypeORM.Column({ nullable: false, type: 'integer', default: 0 })
    ac_count: number;

    @TypeORM.Column({ nullable: false, type: 'integer', default: 0 })
    submit_count: number;

    @TypeORM.Column({ nullable: false, type: 'integer', default: 0 })
    following: number;

    @TypeORM.Column({ nullable: false, type: 'integer', default: 0 })
    follower: number;

    static async fromUid(uid) : Promise<User> {
        return User.findOne({
            where: { uid: uid }
        });
    }

    static async fromName(name) : Promise<User> {
        return User.findOne({
            where: { username: name }
        });
    }

    static async fromEmail(email) : Promise<User> {
        return User.findOne({
            where: { email: email }
        });
    }
}

