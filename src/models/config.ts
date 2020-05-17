import * as TypeORM from 'typeorm';
import Model from './model';
import { PrimaryColumn, Column } from 'typeorm';

@TypeORM.Entity('config')
export default class Config extends Model {
    @PrimaryColumn({ type: 'varchar', length: '64' })
    key: string;

    @Column({ nullable: true, type: 'varchar', length: '64' })
    value: string;

    static async fromKey(key) : Promise<Config> {
        return Config.findOne({
            where: { key: key }
        });
    }
}
