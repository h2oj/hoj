import * as TypeORM from 'typeorm';
import Model from './model';
import User from './user';

@TypeORM.Entity('problem')
export default class Problem extends Model {
    @TypeORM.PrimaryColumn({ nullable: false, type: 'varchar', length: 16 })
    pid: string;

    @TypeORM.Column({ nullable: false, type: 'tinyint' })
    type: number;

    @TypeORM.Column({ nullable: false, type: 'varchar', length: 64 })
    title: string;

    @TypeORM.Column({ nullable: false, type: 'tinyint' })
    difficulty: number;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    ac_count: number;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    submit_count: number;

    @TypeORM.Column({ nullable: false, type: 'boolean' })
    is_public: boolean;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    uid: number;

    publisher?: User;

    async loadRelatives() {
        await this.loadPublisher();
    }

    async loadPublisher() {
        if (!this.publisher && this.uid !== undefined) {
            this.publisher = await User.fromUid(this.uid);
        }
    }

    static async fromPid(pid) : Promise<Problem> {
        return Problem.findOne({
            where: { pid: pid }
        });
    }

    static async findPublic() : Promise<Problem[]> {
        return Problem.find({
            where: { is_public: true }
        });
    }
}

