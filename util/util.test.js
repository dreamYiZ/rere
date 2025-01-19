



import { generateUUID } from './util';

describe('generateUUID', () => {
    test('generates a unique identifier',
        () => {
            const uuid = generateUUID();
            expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        });

    test('generates different UUIDs for multiple calls', () => {
        const uuid1 = generateUUID(); const uuid2 = generateUUID();
        expect(uuid1).not.toBe(uuid2);
    });
});