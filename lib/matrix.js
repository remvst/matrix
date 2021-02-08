'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Matrix {
    constructor(input) {
        this.matrix = input;
        this.rows = input.length;
        this.cols = input[0].length;
    }
    get(row, col, defaultValue = undefined) {
        if (row < 0 || row > this.rows - 1) {
            return defaultValue;
        }
        if (col < 0 || col > this.cols - 1) {
            return defaultValue;
        }
        return this.matrix[row][col];
    }
    set(row, col, value) {
        this.matrix[row][col] = value;
    }
    symetrical() {
        const symetrical = Matrix.empty(this.cols, this.rows, undefined);
        for (let row = 0; row < this.cols; row++) {
            for (let col = 0; col < this.rows; col++) {
                symetrical.set(row, col, this.matrix[col][row]);
            }
        }
        return symetrical;
    }
    flipped() {
        const flipped = Matrix.empty(this.rows, this.cols, undefined);
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                flipped.set(row, col, this.matrix[this.rows - row - 1][col]);
            }
        }
        return flipped;
    }
    asPrettyString() {
        const rows = [];
        for (let row = 0; row < this.rows; row++) {
            rows.push(this.matrix[row].join(''));
        }
        return rows.join('\n');
    }
    extract(row, col, rows, cols, defaultValue = undefined) {
        const subMatrix = [];
        for (let r = 0; r < rows; r++) {
            subMatrix.push([]);
            for (let c = 0; c < cols; c++) {
                const originalRow = r + row;
                const originalCol = c + col;
                if (originalRow >= 0 &&
                    originalCol >= 0 &&
                    originalRow < this.rows &&
                    originalCol < this.cols) {
                    subMatrix[r][c] = this.matrix[originalRow][originalCol];
                }
                else {
                    subMatrix[r][c] = defaultValue;
                }
            }
        }
        return new Matrix(subMatrix);
    }
    copy() {
        return this.extract(0, 0, this.rows, this.cols, undefined);
    }
    forEachCell(callback) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                callback(row, col, this.matrix[row][col]);
            }
        }
    }
    map(mapper) {
        const matrix = Matrix.empty(this.rows, this.cols, undefined);
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const mappedValue = mapper(row, col, this.matrix[row][col]);
                matrix.set(row, col, mappedValue);
            }
        }
        return matrix;
    }
    flattened() {
        const list = [];
        this.forEachCell((_1, _2, value) => list.push(value));
        return list;
    }
    equals(otherMatrix) {
        if (otherMatrix.rows !== this.rows || otherMatrix.cols !== this.cols) {
            return false;
        }
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.matrix[row][col] !== otherMatrix.matrix[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }
    static empty(rows, cols, initialValue) {
        const matrix = [];
        for (let row = 0; row < rows; row++) {
            matrix.push([]);
            for (let col = 0; col < cols; col++) {
                matrix[row].push(initialValue);
            }
        }
        return new Matrix(matrix);
    }
}
exports.default = Matrix;
