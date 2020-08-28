import * as TypeORM from 'typeorm';
import Model from './model';
import User from './user';

@TypeORM.Entity('contest')
export default class Contest extends Model {
    @TypeORM.PrimaryColumn({ nullable: false, type: 'varchar', length: 16 })
    cid: string; //比赛id

    @TypeORM.Column({ nullable: false, type: 'tinyint' })
    type: number; //比赛类型 0=个人公开赛 1=团队公开赛 2=个人邀请赛 3=团队邀请赛 4=团队内部赛

    @TypeORM.Column({ nullable: false, type: 'varchar', length: 64 })
    title: string; //比赛标题

    @TypeORM.Column({ nullable: false, type: 'tinyint' })
    difficulty: number; //比赛难度 参考题目难度范围

    @TypeORM.Column({ nullable: false, type: 'integer'})
    uid: number; //创建者uid //TODO: 团队比赛则为tid

    @TypeORM.PrimaryColumn({ nullable: false, type: 'varchar', length: 64 })
    class: string; //分类

    @TypeORM.Column({ nullable: false, type: 'boolean' })
    is_public: boolean;

    publisher?: User;

    async loadRelatives() {
        await this.loadPublisher();
    }

    async loadPublisher() {
        if (!this.publisher && this.uid !== undefined) {
            this.publisher = await User.fromUid(this.uid);
        }
    }

    static async fromCid(cid) : Promise<Contest> {
        return Contest.findOne({
            where: { cid: cid }
        });
    }
    static async findPublic() : Promise<Contest[]> {
        return Contest.find({
            where: { is_public: true }
        });
    }
}

