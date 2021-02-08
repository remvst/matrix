export default class Matrix<T> {
    readonly matrix: (T | undefined)[][];
    readonly rows: number;
    readonly cols: number;
    constructor(input: (T | undefined)[][]);
    get(row: number, col: number, defaultValue?: T | undefined): T | undefined;
    set(row: number, col: number, value: T | undefined): void;
    symetrical(): Matrix<T>;
    flipped(): Matrix<T>;
    asPrettyString(): string;
    extract(row: number, col: number, rows: number, cols: number, defaultValue?: T | undefined): Matrix<T>;
    copy(): Matrix<T>;
    forEachCell(callback: (row: number, col: number, value: T | undefined) => void): void;
    map<U>(mapper: (row: number, col: number, value: T | undefined) => U): Matrix<U>;
    flattened(): (T | undefined)[];
    equals(otherMatrix: Matrix<T>): boolean;
    static empty<T>(rows: number, cols: number, initialValue: T | undefined): Matrix<T>;
}
