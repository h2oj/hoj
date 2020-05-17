export enum SubmissionStatus {
    ACCEPTED = 1,
    COMPILE_ERROR = 2,
    UNACCEPTED = 3,
    WAITING = 0
}

export enum TestPointStatus {
    ACCEPTED = 1,
    COMPILE_ERROR = 2,
    FILE_ERROR = 11,
    JUDGEMENT_ERROR = 10,
    OUTPUT_LIMIT_EXCEEDED = 3,
    PARTIALLY_CORRECT = 9,
    RUNTIME_ERROR = 4,
    SYSTEM_ERROR = 5,
    TESTDATA_ERROR = 12,
    TIME_LIMIT_EXCEEDED = 6,
    UNKNOWN_ERROR = 7,
    WRONG_ANSWER = 8,
    WAITING = 0
}
