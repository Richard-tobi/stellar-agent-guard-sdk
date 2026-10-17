import type { ContractCall } from './policy';

/**
 * Amount accepted by SAC amount-bearing builders.
 *
 * Strings allow for unsigned integer literals that exceed `Number.MAX_SAFE_INTEGER`
 * (Stellar amounts are `78-bit` unsigned integers). `bigint` is also accepted.
 *
 * This is the natural enforcement point for the amount-type audit issue; if that
 * issue narrows the type further, update this alias and the builders together.
 */
export type SacAmount = string | bigint;

/**
 * Attestation: this file is the single source of truth for SAC arg order.
 * Spec reference: SEC §6.2 (Stellar Asset Contract interface).
 *
 * Arg order is not cosmetic: `transfer` and `transfer_from` differ in shape
 * (`transfer` has no `spender`), and the contracts-repo parse tests exist because
 * positional mistakes are catastrophic. These builders make wrong-order calls
 * impossible for the two functions the guard actually parses.
 */

/**
 * Build a `SAC.transfer` call.
 *
 * SEC §.2 positions: `[from, to, amount]`.
 */
export function sacTransfer(
  token: string,
  from: string,
  to: string,
  amount: SacAmount,
): ContractCall {
  return {
    contractId: token,
    method: 'transfer',
    args: [from, to, amount],
  };
}

/**
 * Build a `SAC.transfer_from` call.
 *
 * SEC §6.2 positions: `[from, spender, to, amount]`.
 */
export function sacTransferFrom(
  token: string,
  from: string,
  spender: string,
  to: string,
  amount: SacAmount,
): ContractCall {
  return {
    contractId: token,
    method: 'transfer_from',
    args: [from, spender, to, amount],
  };
}
