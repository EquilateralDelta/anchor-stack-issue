use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod stack_issue {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

const SIZE: usize = 1600;

#[account]
pub struct BigAccount {
    data: [u8; SIZE],
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        payer = signer,
        seeds = ["seed".as_bytes()],
        space = 8 + SIZE,
        bump
    )]
    pub data: Box<Account<'info, BigAccount>>,
    pub system_program: Program<'info, System>,
}
