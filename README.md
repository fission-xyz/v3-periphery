# Uniswap V3 Periphery

[![Tests](https://github.com/Uniswap/uniswap-v3-periphery/workflows/Tests/badge.svg)](https://github.com/Uniswap/uniswap-v3-periphery/actions?query=workflow%3ATests)
[![Lint](https://github.com/Uniswap/uniswap-v3-periphery/workflows/Lint/badge.svg)](https://github.com/Uniswap/uniswap-v3-periphery/actions?query=workflow%3ALint)

This repository contains the periphery smart contracts for the Uniswap V3 Protocol.
For the lower level core contracts, see the [uniswap-v3-core](https://github.com/micro-capital/v3-core)
repository.

## Usage

In order to run tests, first of all you need to install dependencies:

```bash
yarn install
```

If you do not have `yarn` installed, you can install it by running, please refer to the [yarn documentation](https://classic.yarnpkg.com/en/docs/install):

Then you can run tests:

```bash
yarn test
```

### Deployment

> For seamless and full Uniswap V3 deployment, please refer to the [Uniswap V3 deployment scripts](https://github.com/micro-capital/deploy-v3).
> Below is a general guide on how to deploy ONLY the Uniswap V3 periphery contracts.

To deploy the Uniswap V3 periphery contracts, you can use the deployment scripts in the `scripts` directory.

First of all, you need to create a `.env` file in the root directory of the repository. You can use the `.env.example` file as a template.

### Environment Variables for Uniswap EVM Contract Deployment

Here's a general explanation of the environment variables used for deploying Uniswap EVM contracts:

#### Deployer Private Keys
- `PRIVATE_KEY`: The private key of the account that will be used to deploy the contracts on the Ethereum network.
  (**Must have sufficient balance to cover transaction fees**; Must be in Hexadecimal format, e.g: `1234567890abcdef...`)

#### RPC Configuration
- `INFURA_API_KEY`: This variable should hold your Infura project ID. You need to sign up for an Infura account and create a project to obtain the project ID.

#### Etherscan Configuration
- `ETHERSCAN_API_KEY`: The Etherscan API key is used to verify deployed contracts on Etherscan.

#### Uniswap Contract Configuration
- `V3_FACTORY_ADDRESS`: This variable specifies the address of the Uniswap V3 Factory contract, which can be obtained from previous Uniswap V3 core deployment.
- `WETH9_ADDRESS`: This variable specifies the address of the WETH9 contract (Wrapped Ether). Basically this contract, MUST represent the ERC20 wrapped version of the native currency of the network..
- `NATIVE_CURRENCY_LABEL`: This variable specifies the label of the native currency of the network.
- `FINAL_PROXY_ADMIN_OWNER`: This variable specifies the address of the owner of the proxy admin of the Non-fungible Token Position Descriptor contract.

### Deployment Script

After the `.env` file is created, you can run the deployment script for the network you want to deploy to, for example:

```bash
yarn hardhat migrate --network sepolia --verify
```

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@uniswap/v3-periphery`
and import bytecode imported from artifacts located at
`@uniswap/v3-periphery/artifacts/contracts/*/*.json`.
For example:

```typescript
import {
  abi as SWAP_ROUTER_ABI,
  bytecode as SWAP_ROUTER_BYTECODE,
} from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all Uniswap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Uniswap v3 periphery interfaces are available for import into solidity smart contracts
via the npm artifact `@uniswap/v3-periphery`, e.g.:

```solidity
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract MyContract {
  ISwapRouter router;

  function doSomethingWithSwapRouter() {
    // router.exactInput(...);
  }
}

```
