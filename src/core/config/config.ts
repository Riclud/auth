import { DB } from './db'
import { JWT } from './jwt'

export type ConfigType = ReturnType<typeof config>

export const config = () => {
  return {
    PORT: +process.env.PORT || 8000,
    DEFAULT_CURRENCY: 'usd',
    DB: DB(),
    JWT: JWT(),
    PROJECT_FEE: {
      swap: [
        { percent: 0.5, min: 0, max: 100 },
        { percent: 0.1, min: 101 },
      ],
      send: [{ percent: 0.1, min: 0 }],
      buy: [{ percent: 0.1, min: 0 }],
      sell: [{ percent: 0.1, min: 0 }],
    },
    PAYMENT_SYSTEM: {
      fee: [{ percent: 6, min: 0 }],
      limits: {
        buy: { min: 10, max: 3000 },
        sell: { min: 10, max: 1000 },
      },
      metadata: {
        name: 'BlackRabbit',
      },
    },
  }
}