import { rest } from 'msw';
import {
  articlesMocks,
  articlesMocks_2_Articles,
} from '../../../__mocks__/articlesMocks';
import {
  expertsMock,
  expertsMock_1_Experts,
  expertsMock_3_Experts,
  expertsMock_4_Experts,
} from '../../../__mocks__/expertsMocks';

const articlesSuccessHandler = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(articlesMocks));
  }
);

export const articlesSuccessHandler_0_Articles = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: [] }));
  }
);

export const articlesSuccessHandler_2_Articles = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(articlesMocks_2_Articles));
  }
);

export const articlesErrorHandler = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
  (req, res, ctx) => {
    return ctx.throw(500, 'Test Error');
  }
);

/*
 * EXPERTS hanlders
 */
const expertsSuccessHandler = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/therapeutists`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expertsMock));
  }
);

export const expertsSuccessHandler_1_Experts = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/therapeutists`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expertsMock_1_Experts));
  }
);

export const expertsSuccessHandler_3_Experts = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/therapeutists`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expertsMock_3_Experts));
  }
);

export const expertsSuccessHandler_4_Experts = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/therapeutists`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(expertsMock_4_Experts));
  }
);

export const expertsErrorHandler = rest.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/therapeutists`,
  async (req, res, ctx) => {
    return res(ctx.status(403));
  }
);

export const handlers = [articlesSuccessHandler, expertsSuccessHandler];
