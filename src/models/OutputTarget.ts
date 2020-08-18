export interface OutputTarget<T> {

    print(report: T[]): void;
}
