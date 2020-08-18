export interface DataReader<T> {

    data: T[];
    read(): void;
}
