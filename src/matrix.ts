'use strict';

export default class Matrix<T> {

    readonly matrix: (T | undefined)[][];
    readonly rows: number;
    readonly cols: number;

    constructor(input: (T | undefined)[][]) {
        this.matrix = input;
        this.rows = input.length;
        this.cols = input[0].length;
    }

    get(
        row: number,
        col: number,
        defaultValue: T | undefined = undefined,
    ): T | undefined {
        if (row < 0 || row > this.rows - 1) {
            return defaultValue;
        }
        if (col < 0 || col > this.cols - 1) {
            return defaultValue;
        }
        return this.matrix[row][col];
    }

    set(
        row: number,
        col: number,
        value: T | undefined,
    ) {
        this.matrix[row][col] = value;
    }

    symetrical(): Matrix<T> {
        const symetrical = Matrix.empty<T>(this.cols, this.rows, undefined);
        for (let row = 0 ; row < this.cols ; row++) {
            for (let col = 0 ; col < this.rows ; col++) {
                symetrical.set(row, col, this.matrix[col][row]);
            }
        }
        return symetrical;
    }

    flipped(): Matrix<T> {
        const flipped = Matrix.empty<T>(this.rows, this.cols, undefined);
        for (let row = 0 ; row < this.rows ; row++) {
            for (let col = 0 ; col < this.cols ; col++) {
                flipped.set(row, col, this.matrix[this.rows - row - 1][col]);
            }
        }
        return flipped;
    }

    asPrettyString(): string {
        const rows = [];

        for (let row = 0 ; row < this.rows ; row++) {
            rows.push(this.matrix[row].join(''));
        }

        return rows.join('\n');
    }

    extract(
        row: number,
        col: number,
        rows: number,
        cols: number,
        defaultValue: T | undefined = undefined,
    ): Matrix<T> {
        const subMatrix: (T | undefined)[][] = [];
        for (let r = 0 ; r < rows ; r++) {
            subMatrix.push([]);
            for (let c = 0 ; c < cols ; c++) {
                const originalRow = r + row;
                const originalCol = c + col;

                if (
                    originalRow >= 0 &&
                    originalCol >= 0 &&
                    originalRow < this.rows &&
                    originalCol < this.cols
                ) {
                    subMatrix[r][c] = this.matrix[originalRow][originalCol];
                } else {
                    subMatrix[r][c] = defaultValue;
                }
            }
        }

        return new Matrix(subMatrix);
    }

    copy(): Matrix<T> {
        return this.extract(0, 0, this.rows, this.cols, undefined);
    }

    forEachCell(callback: (row: number, col: number, value: T | undefined) => void): void {
        for (let row = 0 ; row < this.rows ; row++) {
            for (let col = 0 ; col < this.cols ; col++) {
                callback(row, col, this.matrix[row][col]);
            }
        }
    }

    map<U>(mapper: (row: number, col: number, value: T | undefined) => U): Matrix<U> {
        const matrix = Matrix.empty<U>(this.rows, this.cols, undefined);
        for (let row = 0 ; row < this.rows ; row++) {
            for (let col = 0 ; col < this.cols ; col++) {
                const mappedValue = mapper(row, col, this.matrix[row][col]);
                matrix.set(row, col, mappedValue);
            }
        }
        return matrix;
    }

    flattened(): (T | undefined)[] {
        const list: (T | undefined)[] = [];
        this.forEachCell((_1, _2, value) => list.push(value));
        return list;
    }

    equals(otherMatrix: Matrix<T>): boolean {
        if (otherMatrix.rows !== this.rows || otherMatrix.cols !== this.cols) {
            return false;
        }

        for (let row = 0 ; row < this.rows ; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.matrix[row][col] !== otherMatrix.matrix[row][col]) {
                    return false;
                }
            }
        }

        return true;
    }

    static empty<T>(
        rows: number,
        cols: number,
        initialValue: T | undefined,
    ): Matrix<T> {
        const matrix: (T | undefined)[][] = [];
        for (let row = 0 ; row < rows ; row++) {
            matrix.push([]);
            for (let col = 0 ; col < cols ; col++) {
                matrix[row].push(initialValue);
            }
        }

        return new Matrix(matrix);
    }
}
