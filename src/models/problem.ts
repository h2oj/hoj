import * as TypeORM from 'typeorm';
import Model from './model';

export enum ProblemType {
    PUBLIC = 'public',
    USER = 'user',
    TEAM = 'team'
}

@TypeORM.Entity('problem')
export default class Problem extends Model {
    @TypeORM.PrimaryColumn({ nullable: false, type: 'varchar', length: 10 })
    pid: string;

    @TypeORM.Column({ nullable: false, type: 'varchar', length: 64 })
    title: string;

    @TypeORM.Column({ nullable: false, type: 'enum', enum: ProblemType })
    type: ProblemType;

    @TypeORM.Column({ nullable: false, type: 'tinyint' })
    difficulty: number;

    @TypeORM.Column({ nullable: true, type: 'text' })
    description: string;

    @TypeORM.Column({ nullable: true, type: 'text' })
    input: string;

    @TypeORM.Column({ nullable: true, type: 'text' })
    output: string;

    @TypeORM.Column({ nullable: true, type: 'text' })
    example: string;

    @TypeORM.Column({ nullable: true, type: 'text' })
    data_limit: string;

    @TypeORM.Column({ nullable: true, type: 'text' })
    hint: string;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    ac_count: number;

    @TypeORM.Column({ nullable: false, type: 'integer'})
    submit_count: number;

    @TypeORM.Column({ nullable: false, type: 'boolean' })
    is_public: boolean;
}

