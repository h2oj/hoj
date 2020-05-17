import * as TypeORM from 'typeorm';
import Model from './model';
import TestPoint from './test_point';
import { SubmissionStatus } from './status';

/**
 * Record model.
 * @member {number} rid - Record id.
 * @member {number} uid - User id of current record.
 * @member {string} pid - Problem id of current record.
 */
@TypeORM.Entity('submission')
export default class Submission extends Model {
    @TypeORM.PrimaryGeneratedColumn()
    sid: number;

    @TypeORM.Column({ nullable: false, type: 'integer' })
    uid: number;

    @TypeORM.Column({ nullable: false, type: 'varchar', length: 16 })
    pid: string;

    @TypeORM.Column({ nullable: false, type: 'varchar', length: 16 })
    language: string;

    @TypeORM.Column({ nullable: true, type: 'integer' })
    status: SubmissionStatus;

    @TypeORM.Column({ nullable: true, type: 'integer' })
    total_time: number;

    @TypeORM.Column({ nullable: true, type: 'integer' })
    total_space: number;

    /**
     * Find a record from rid.
     * @param {number} rid - Record id.
     * @return {Promise<Submission>} Record.
     */
    static async fromRid(rid: number) : Promise<Submission> {
        return Submission.findOne({
            where: { rid: rid }
        });
    }

    /**
     * Find records from uid.
     * @param {number} uid - User id.
     * @return {Promise<Record[]>} Records.
     */
    static async fromUid(uid) : Promise<Submission[]> {
        return Submission.find({
            where: { uid: uid }
        });
    }
}
