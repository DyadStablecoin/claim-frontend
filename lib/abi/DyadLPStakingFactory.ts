export const dyadLPStakingFactoryAbi = [
    {
        inputs: [
        {
            internalType: "address",
            name: "_kerosene",
            type: "address"
        },
        {
            internalType: "address",
            name: "_dnft",
            type: "address"
        },
        {
            internalType: "address",
            name: "_keroseneVault",
            type: "address"
        },
        {
            internalType: "address",
            name: "_vaultManager",
            type: "address"
        }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        inputs: [],
        name: "AlreadyInitialized",
        type: "error"
    },
    {
        inputs: [],
        name: "DirectClaimDisabled",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidBlockNumber",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidBonus",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidProof",
        type: "error"
    },
    {
        inputs: [],
        name: "NewOwnerIsZeroAddress",
        type: "error"
    },
    {
        inputs: [],
        name: "NoHandoverRequest",
        type: "error"
    },
    {
        inputs: [],
        name: "NotOwnerOfNote",
        type: "error"
    },
    {
        inputs: [],
        name: "Paused",
        type: "error"
    },
    {
        inputs: [],
        name: "Unauthorized",
        type: "error"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: true,
            internalType: "uint256",
            name: "noteId",
            type: "uint256"
        },
        {
            indexed: true,
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        },
        {
            indexed: false,
            internalType: "uint256",
            name: "unclaimedBonus",
            type: "uint256"
        }
        ],
        name: "Claimed",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: false,
            internalType: "uint256",
            name: "oldBonus",
            type: "uint256"
        },
        {
            indexed: false,
            internalType: "uint256",
            name: "newBonus",
            type: "uint256"
        }
        ],
        name: "DirectDepositBonusUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: true,
            internalType: "address",
            name: "pendingOwner",
            type: "address"
        }
        ],
        name: "OwnershipHandoverCanceled",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: true,
            internalType: "address",
            name: "pendingOwner",
            type: "address"
        }
        ],
        name: "OwnershipHandoverRequested",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: true,
            internalType: "address",
            name: "oldOwner",
            type: "address"
        },
        {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address"
        }
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: false,
            internalType: "bool",
            name: "paused",
            type: "bool"
        }
        ],
        name: "PausedUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: true,
            internalType: "address",
            name: "lpToken",
            type: "address"
        },
        {
            indexed: true,
            internalType: "address",
            name: "staking",
            type: "address"
        }
        ],
        name: "PoolStakingCreated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: true,
            internalType: "address",
            name: "lpToken",
            type: "address"
        },
        {
            indexed: false,
            internalType: "uint256",
            name: "oldRewardRate",
            type: "uint256"
        },
        {
            indexed: false,
            internalType: "uint256",
            name: "newRewardRate",
            type: "uint256"
        }
        ],
        name: "RewardRateSet",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        }
        ],
        name: "RewardsDeposited",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address"
        },
        {
            indexed: true,
            internalType: "uint256",
            name: "roles",
            type: "uint256"
        }
        ],
        name: "RolesUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
        {
            indexed: false,
            internalType: "bytes32",
            name: "newRoot",
            type: "bytes32"
        },
        {
            indexed: false,
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256"
        }
        ],
        name: "RootUpdated",
        type: "event"
    },
    {
        inputs: [],
        name: "POOL_MANAGER_ROLE",
        outputs: [
        {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "REWARDS_MANAGER_ROLE",
        outputs: [
        {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "cancelOwnershipHandover",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "uint256",
            name: "noteId",
            type: "uint256"
        },
        {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        },
        {
            internalType: "bytes32[]",
            name: "proof",
            type: "bytes32[]"
        }
        ],
        name: "claim",
        outputs: [
        {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "uint256",
            name: "noteId",
            type: "uint256"
        },
        {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        },
        {
            internalType: "bytes32[]",
            name: "proof",
            type: "bytes32[]"
        }
        ],
        name: "claimToVault",
        outputs: [
        {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "pendingOwner",
            type: "address"
        }
        ],
        name: "completeOwnershipHandover",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "_lpToken",
            type: "address"
        }
        ],
        name: "createPoolStaking",
        outputs: [
        {
            internalType: "address",
            name: "",
            type: "address"
        }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        }
        ],
        name: "depositForRewards",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "description",
        outputs: [
        {
            internalType: "string",
            name: "",
            type: "string"
        }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [],
        name: "directDepositBonusBps",
        outputs: [
        {
            internalType: "uint16",
            name: "",
            type: "uint16"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "dnft",
        outputs: [
        {
            internalType: "contract IERC721",
            name: "",
            type: "address"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "getHookFlags",
        outputs: [
        {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "user",
            type: "address"
        },
        {
            internalType: "uint256",
            name: "roles",
            type: "uint256"
        }
        ],
        name: "grantRoles",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "user",
            type: "address"
        },
        {
            internalType: "uint256",
            name: "roles",
            type: "uint256"
        }
        ],
        name: "hasAllRoles",
        outputs: [
        {
            internalType: "bool",
            name: "",
            type: "bool"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "user",
            type: "address"
        },
        {
            internalType: "uint256",
            name: "roles",
            type: "uint256"
        }
        ],
        name: "hasAnyRole",
        outputs: [
        {
            internalType: "bool",
            name: "",
            type: "bool"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "kerosene",
        outputs: [
        {
            internalType: "address",
            name: "",
            type: "address"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "keroseneVault",
        outputs: [
        {
            internalType: "address",
            name: "",
            type: "address"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "lastUpdateBlock",
        outputs: [
        {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "lpToken",
            type: "address"
        }
        ],
        name: "lpTokenToRewardRate",
        outputs: [
        {
            internalType: "uint256",
            name: "rewardRate",
            type: "uint256"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "lpToken",
            type: "address"
        }
        ],
        name: "lpTokenToStaking",
        outputs: [
        {
            internalType: "address",
            name: "staking",
            type: "address"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "merkleRoot",
        outputs: [
        {
            internalType: "bytes32",
            name: "",
            type: "bytes32"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "name",
        outputs: [
        {
            internalType: "string",
            name: "",
            type: "string"
        }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "uint256",
            name: "noteId",
            type: "uint256"
        }
        ],
        name: "noteIdToTotalClaimed",
        outputs: [
        {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
        {
            internalType: "address",
            name: "result",
            type: "address"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "pendingOwner",
            type: "address"
        }
        ],
        name: "ownershipHandoverExpiresAt",
        outputs: [
        {
            internalType: "uint256",
            name: "result",
            type: "uint256"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "paused",
        outputs: [
        {
            internalType: "bool",
            name: "",
            type: "bool"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "token",
            type: "address"
        }
        ],
        name: "recoverERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "token",
            type: "address"
        },
        {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }
        ],
        name: "recoverERC721",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "uint256",
            name: "roles",
            type: "uint256"
        }
        ],
        name: "renounceRoles",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        name: "requestOwnershipHandover",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "user",
            type: "address"
        },
        {
            internalType: "uint256",
            name: "roles",
            type: "uint256"
        }
        ],
        name: "revokeRoles",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "user",
            type: "address"
        }
        ],
        name: "rolesOf",
        outputs: [
        {
            internalType: "uint256",
            name: "roles",
            type: "uint256"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "uint16",
            name: "_directDepositBonusBps",
            type: "uint16"
        }
        ],
        name: "setDirectDepositBonus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "bool",
            name: "_paused",
            type: "bool"
        }
        ],
        name: "setPaused",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address[]",
            name: "lpTokens",
            type: "address[]"
        },
        {
            internalType: "uint256[]",
            name: "rewardRates",
            type: "uint256[]"
        }
        ],
        name: "setRewardRates",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "bytes32",
            name: "_merkleRoot",
            type: "bytes32"
        },
        {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256"
        }
        ],
        name: "setRoot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "totalClaimed",
        outputs: [
        {
            internalType: "uint128",
            name: "",
            type: "uint128"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        {
            internalType: "address",
            name: "newOwner",
            type: "address"
        }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        name: "unclaimedBonus",
        outputs: [
        {
            internalType: "uint96",
            name: "",
            type: "uint96"
        }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "vaultManager",
        outputs: [
        {
            internalType: "contract IVaultManager",
            name: "",
            type: "address"
        }
        ],
        stateMutability: "view",
        type: "function"
    }
] as const;