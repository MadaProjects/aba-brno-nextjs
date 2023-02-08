// jest.setup.js
import '@testing-library/jest-dom';
// TODO should be in api-mocks folder
import { mswServer } from './helpers/tests/api-mocks/msw-server';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());
