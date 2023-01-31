// jest.setup.js
import '@testing-library/jest-dom';
// TODO should be in api-mocks folder
import { mswServer } from './helpers/tests/api-mocks/msw-server';
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:1337';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
