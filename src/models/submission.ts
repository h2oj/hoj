import * as TypeORM from 'typeorm';
import Model from './model';
import { SubmissionStatus } from './status';
import User from './user';
import Problem from './problem';
import TestPoint from './test_point';

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

    @TypeORM.Column({ nullable: true, type: 'integer' })
    code_size: number;

    @TypeORM.Column({ nullable: true, type: 'integer' })
    submit_time: number;

    user?: User;

    problem?: Problem;

    test_points?: TestPoint[];

    async loadRelatives() {
        await this.loadUser();
        await this.loadProblem();
    }

    async loadUser() {
        if (!this.user && this.uid !== undefined) {
            this.user = await User.fromUid(this.uid);
        }
    }

    async loadProblem() {
        if (!this.problem && this.pid) {
            this.problem = await Problem.fromPid(this.pid);
        }
    }

    async loadTestPoints() {
        if (!this.test_points) {
            this.test_points = await TestPoint.fromSid(this.sid);
        }
    }

    /**
     * Find a record from sid.
     * @param {number} sid - Record id.
     * @return {Promise<Submission>} Record.
     */
    static async fromSid(sid: number) : Promise<Submission> {
        return Submission.findOne({
            where: { sid: sid }
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
