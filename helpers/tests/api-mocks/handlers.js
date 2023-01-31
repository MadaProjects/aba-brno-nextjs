import { rest } from 'msw';
import { articlesMocks } from '../../../__mocks__/articlesMocks';
import {
  expertsMock,
  expertsMock_1_Experts,
  expertsMock_3_Experts,
  expertsMock_4_Experts,
} from '../../../__mocks__/expertsMocks';

const articlesSuccessHandler = rest.get(
  `http://localhost:1337/api/articles`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(articlesMocks));
  }
);

export const articlesErrorHandler = rest.get(
  `http://localhost:1337/api/articles`,
  async (req, res, ctx) => {
    return res(ctx.status(403));
  }
);

/*
 * EXPERTS hanlders
 */
export const expertsSuccessHandler = rest.get(
  `http://localhost:1337/api/therapeutists`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expertsMock));
  }
);

export const expertsSuccessHandler_1_Experts = rest.get(
  `http://localhost:1337/api/therapeutists`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expertsMock_1_Experts));
  }
);

export const expertsSuccessHandler_3_Experts = rest.get(
  `http://localhost:1337/api/therapeutists`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expertsMock_3_Experts));
  }
);

export const expertsSuccessHandler_4_Experts = rest.get(
  `http://localhost:1337/api/therapeutists`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expertsMock_4_Experts));
  }
);

export const expertsErrorHandler = rest.get(
  `http://localhost:1337/api/therapeutists`,
  async (req, res, ctx) => {
    return res(ctx.status(403));
  }
);

export const handlers = [articlesSuccessHandler];
