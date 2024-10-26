import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const queries = createQueryKeyStore({
  me: {
    reviews: null,
  },
});
