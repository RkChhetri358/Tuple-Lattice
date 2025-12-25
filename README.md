UNBLOCK THE ARTIST

A full-stack NFT marketplace integration using Django (DRF), React, and Solidity. This platform allows artists to mint digital assets and distributors to purchase them through on-chain primary sales.


🏗️ System Architecture

The project follows a middleware-based approach where Django acts as a secure bridge between the User Interface and the Ethereum Blockchain.

    Frontend: React.js for transaction signing and asset visualization.

    Backend: Django REST Framework for metadata management and Web3 orchestration.

    Blockchain: Solidity Smart Contract (ERC-721 + ERC-2981 Royalties).

🛠️ Installation & Setup
1. Backend Setup (Django)

Ensure you have Python 3.9+ installed.

Clone the repository and navigate to the root directory.

Install dependencies:
    Bash

    pip install -r requirements.txt

Environment Configuration: Create a .env file in the root or update your settings.py with:

    WEB3_PROVIDER: e.g., http://127.0.0.1:8545 (Ganache/Hardhat)

    CONTRACT_ADDRESS: The deployed address of your ArtMarketplace contract.

Database Initialization:
Bash

    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver

2. Frontend Setup (React)

    Navigate to the frontend folder:
    Bash
    
        npm install
        npm start

3. Smart Contract

    Deploy the ArtMarketplace contract to your local network (Hardhat/Ganache) or Testnet.

    Copy the contract address and the abi.json to the api/ directory.

🔐 Technical Workflow: Primary Purchase

To prevent "Price Mismatch" errors (common when converting ETH to Wei), the system implements a Source of Truth validation:

    Request: The Frontend sends a token_id to the /api/primary-buy/ endpoint.

    Verification: The Django backend queries the Smart Contract mapping (arts) to fetch the exact primaryPrice stored on-chain.

    Execution: Django overrides any frontend-provided price with the on-chain value before signing the transaction.

    Synchronization: Once the blockchain receipt returns status: 1, the Django database updates the Artwork.owner field.

🧪 Unit Conversion Logic

The marketplace operates strictly in Wei to ensure zero precision loss.
Unit	Value in Wei
1 Wei	1
1 Gwei	109
1 Ether	1018

    Note: Always use Python int() or JavaScript BigInt() when handling these values to prevent scientific notation errors (e.g., 2e+15).

📁 Key File Map

    blockchain.py: Core Web3 logic (Minting, Approvals, Sales).

    abi.json: The compiled Smart Contract interface used by Web3.py.

    BuyingAsset.jsx: React component handling checkout and private key signing.

    models.py: Stores artwork metadata, ownership history, and user roles.

📝 Troubleshooting

    Transaction Status 0: Likely an "Approval" issue. Ensure the Artist has called setApprovalForAll for the marketplace address.

    400 Bad Request: Check the Python console for "Diagnostic Logs" regarding price mismatches or missing contract functions.
