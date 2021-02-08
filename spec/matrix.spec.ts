import Matrix from '../src/matrix';

describe('a matrix', () => {
    it('can be created', () => {
        const matrix = new Matrix([
            [1, 2],
            [3, 4],
        ]);

        expect(matrix.get(0, 0)).toBe(1);
        expect(matrix.get(0, 1)).toBe(2);
        expect(matrix.get(1, 0)).toBe(3);
        expect(matrix.get(1, 1)).toBe(4);
    });

    it('can return a default value for out of bounds values', () => {
        const matrix = new Matrix([
            [1, 2],
            [3, 4],
        ]);

        expect(matrix.get(-1, -1)).toBe(undefined);
        expect(matrix.get(-1, -1, 1234)).toBe(1234);
    });
});
