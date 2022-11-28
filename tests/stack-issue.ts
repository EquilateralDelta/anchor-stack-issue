import * as anchor from "@project-serum/anchor";
import { Program, Provider } from "@project-serum/anchor";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { StackIssue } from "../target/types/stack_issue";

describe("stack-issue", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.StackIssue as Program<StackIssue>;

  it("Is initialized!", async () => {
    const payer = await createPayer(program.provider);
    try {
      await program.methods
        .initialize()
        .accounts({
          signer: payer.publicKey,
          data: (
            await PublicKey.findProgramAddress(
              [Buffer.from("seed")],
              program.programId
            )
          )[0],
          systemProgram: SystemProgram.programId,
        })
        .signers([payer])
        .rpc();
    } catch (e) {
      console.dir(e);
      throw e;
    }
  });
});

async function createPayer(provider: Provider) {
  const payer = Keypair.generate();

  await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(payer.publicKey, 100_000_000_000),
    "confirmed"
  );

  return payer;
}
