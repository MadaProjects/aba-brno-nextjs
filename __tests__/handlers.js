import { rest } from 'msw';
import { articlesMocks } from '../__mocks__/articlesMocks';

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

export const handlers = [articlesSuccessHandler];
