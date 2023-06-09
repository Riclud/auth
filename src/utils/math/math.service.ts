import { Injectable } from '@nestjs/common'
import BigNumber from 'bignumber.js'

@Injectable()
export class MathService {
  calcPercentValue(value: string | BigNumber, percent: string | number): string
  calcPercentValue(
    value: string | BigNumber,
    percent: string | number,
    option: { returnBN: boolean },
  ): BigNumber
  calcPercentValue(
    value: string | BigNumber,
    percent: string | number,
    option?: { returnBN: boolean },
  ): BigNumber | string {
    const maxPercent = 100
    const valueBN = typeof value === 'string' ? new BigNumber(value) : value

    const percentValue = valueBN.times(percent).div(maxPercent)

    return option?.returnBN ? percentValue : percentValue.toString()
  }

  findFeePercent(
    valueusd: string | BigNumber,
    fee: {
      percent: number
      min: number
      max?: number
    }[],
  ) {
    const valueBN =
      valueusd instanceof BigNumber ? valueusd : new BigNumber(valueusd)

    let feePercent = 0

    for (const condition of fee) {
      if (valueBN.isGreaterThanOrEqualTo(condition.min)) {
        if (!condition.max) {
          feePercent = condition.percent
          break
        }

        if (valueBN.isLessThanOrEqualTo(condition.max)) {
          feePercent = condition.percent
          break
        }
      }
    }

    return feePercent
  }

  calcFiatRateWithMargin(rate: string, rateMarginPercent: number) {
    const rateBN = new BigNumber(rate)
    const rateMarginPercentInverse = new BigNumber(rateMarginPercent)
      .times(-1)
      .toString() // We store all fiat prices to usd. But rateMarginPercent we pass to usd/fiat

    const rateMarginAmount = this.calcPercentValue(
      rate,
      rateMarginPercentInverse,
      { returnBN: true },
    )

    return rateBN.plus(rateMarginAmount).toString()
  }
}
