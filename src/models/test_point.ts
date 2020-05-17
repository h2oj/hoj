import * as TypeORM from 'typeorm';
import Model from './model';
import { TestPointStatus } from './status';

/**
 * Record point model.
 * @member {number} rpid - Record point id.
 * @member {number} tpid - Test point id of current record.
 * @member {number} rid - Record id of current record.
 * @member {number} time - Time usage.
 * @member {number} space - Space usage.
 * @member {RecordStatus} status - Result of current point.
 */
@TypeORM.Entity('test_point')
export default class TestPoint extends Model {
    @TypeORM.PrimaryGeneratedColumn()
    spid: number;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    tpid: number;

    @TypeORM.Column({ nullable: false, type: 'integer' })
    sid: number;

    @TypeORM.Column({ nullable: true, type: 'integer' })
    time: number;

    @TypeORM.Column({ nullable: true, type: 'integer' })
    space: number;

    @TypeORM.Column({ nullable: false, type: 'integer' })
    status: TestPointStatus;

    /**
     * Find a record point from id.
     * @param {number} spid - Record point id.
     * @return {Promise<TestPoint>} Record.
     */
    static async fromSpid(spid: number) : Promise<TestPoint> {
        return TestPoint.findOne({
            where: { spid: spid }
        });
    }

    /**
     * Find record points from record id.
     * @param {number} sid - Record id.
     * @return {Promise<TestPoint[]>} Record points.
     */
    static async fromSid(sid: number) : Promise<TestPoint[]> {
        let queryBuilder = TestPoint.createQueryBuilder();
        queryBuilder.where({ sid : sid });
        queryBuilder.orderBy('tpid');
        return queryBuilder.getMany();
    }
}
