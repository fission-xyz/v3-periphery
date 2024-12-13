import { constants, Contract } from 'ethers'
import { waffle, ethers } from 'hardhat'

import { PoolAddressTest } from '../typechain'
import { POOL_BYTECODE_HASH } from './shared/computePoolAddress'
import { expect } from './shared/expect'
import snapshotGasCost from './shared/snapshotGasCost'
import { Fixture } from 'ethereum-waffle'
import completeFixture from './shared/completeFixture'

describe('PoolAddress', () => {
  let poolAddress: PoolAddressTest
  let factory: Contract

  const poolAddressTestFixture: Fixture<{
    factory: Contract
    poolAddress: PoolAddressTest
  }> = async (wallets, provider) => {
    const poolAddressTestFactory = await ethers.getContractFactory('PoolAddressTest')
    const { factory } = await completeFixture(wallets, provider)
    const poolAddress = (await poolAddressTestFactory.deploy()) as PoolAddressTest
    return {
      factory,
      poolAddress,
    }
  }

  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>

  before('create fixture loader', async () => {
    loadFixture = waffle.createFixtureLoader(await (ethers as any).getSigners())
  })

  beforeEach('deploy PoolAddressTest', async () => {
    ;({ poolAddress, factory } = await loadFixture(poolAddressTestFixture))
  })

  describe('#computeAddress', () => {
    it('all arguments equal zero', async () => {
      await expect(poolAddress.computeAddress(constants.AddressZero, constants.AddressZero, constants.AddressZero, 0))
        .to.be.reverted
    })

    it('matches example from core repo', async () => {
      expect(
        await poolAddress.computeAddress(
          factory.address,
          '0x1000000000000000000000000000000000000000',
          '0x2000000000000000000000000000000000000000',
          250
        )
      ).to.matchSnapshot()
    })

    it('token argument order cannot be in reverse', async () => {
      await expect(
        poolAddress.computeAddress(
          factory.address,
          '0x2000000000000000000000000000000000000000',
          '0x1000000000000000000000000000000000000000',
          3000
        )
      ).to.be.reverted
    })

    it('gas cost', async () => {
      await snapshotGasCost(
        poolAddress.getGasCostOfComputeAddress(
          factory.address,
          '0x1000000000000000000000000000000000000000',
          '0x2000000000000000000000000000000000000000',
          3000
        )
      )
    })
  })
})
