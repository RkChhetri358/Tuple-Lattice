import json
from web3 import Web3
from django.conf import settings
from .models import Artwork, User

# ---------------------------
# 1. Connect to Blockchain
# ---------------------------
w3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER))

if not w3.is_connected():
    raise Exception("Blockchain not connected")

# ---------------------------
# 2. Load ABI & Contract
# ---------------------------
with open("api/abi.json") as f:
    ABI = json.load(f)

contract = w3.eth.contract(
    address=Web3.to_checksum_address(settings.CONTRACT_ADDRESS),
    abi=ABI
)

# ---------------------------
# 3. Corrected Helper Functions
# ---------------------------
from web3 import Web3
from web3.logs import DISCARD  # <--- IMPORT THIS

# Updated function signature: removed metadata_uri, added file_obj
def mint_art_artist(private_key, royalty, primary_price, title, description, file_obj):
    account = w3.eth.account.from_key(private_key)
    artist_address = account.address

    # 1. Prepare transaction
    # Note: If your smart contract STILL requires a URI string, 
    # you can pass a dummy string or the future URL of the file here.
    tx = contract.functions.mintArt(
        int(royalty),
        int(primary_price)
    ).build_transaction({
        "from": artist_address,
        "nonce": w3.eth.get_transaction_count(artist_address),
        "gas": 600000, 
        "gasPrice": w3.eth.gas_price
    })

    # 2. Sign and Send
    signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    if receipt['status'] != 1:
        raise Exception("Minting transaction failed on-chain")

    # 3. Extract TokenID
    logs = contract.events.Transfer().process_receipt(receipt, errors=DISCARD)
    if not logs:
        raise Exception("Transfer event not found in receipt")
    token_id = logs[0]['args']['tokenId']

    # 4. Save to Database
    artist_user, created = User.objects.get_or_create(
        wallet_address__iexact=artist_address,
        defaults={
            'username': f"Artist_{artist_address[2:8]}", 
            'role': 'artist'
        }
    )

    # Now create the Artwork
    artwork = Artwork.objects.create(
        token_id=token_id,
        artist=artist_user,
        owner=artist_user,
        file=file_obj,
        title=title,
        description=description,
        royalty_percentage=royalty
    )
    
    return token_id


def primary_sale(token_id, private_key, distributor_address, price):
    account = w3.eth.account.from_key(private_key)
    buyer_address = account.address
    target_owner = Web3.to_checksum_address(distributor_address)

    print(f"DEBUG: Payer is {buyer_address}")
    print(f"DEBUG: NFT will be sent to {target_owner}")

    tx = contract.functions.primarySale(
        int(token_id),
        target_owner
    ).build_transaction({
        "from": buyer_address,
        "value": int(price),
        "nonce": w3.eth.get_transaction_count(buyer_address),
        "gas": 400000,
        "gasPrice": w3.eth.gas_price
    })

    signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # CHECK STATUS HERE
    print(f"DEBUG: Transaction Status: {receipt['status']} (1=Success, 0=Fail)")
    
    if receipt['status'] == 0:
        print("ERROR: The transaction reverted! Check if the Artist approved the contract.")
        
    return receipt

def list_for_resale(token_id, private_key, price):
    """Set resale price using the owner's private key."""
    account = w3.eth.account.from_key(private_key)
    owner_address = account.address

    tx = contract.functions.setResalePrice(
        int(token_id),
        int(price)
    ).build_transaction({
        "from": owner_address,
        "nonce": w3.eth.get_transaction_count(owner_address),
        "gas": 200000,
        "gasPrice": w3.eth.gas_price
    })

    signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return w3.eth.wait_for_transaction_receipt(tx_hash)


def buy_resale(token_id, private_key, price):
    """Buy a resale NFT using the buyer's private key."""
    account = w3.eth.account.from_key(private_key)
    buyer_address = account.address

    tx = contract.functions.buyResale(int(token_id)).build_transaction({
        "from": buyer_address,
        "value": int(price),
        "nonce": w3.eth.get_transaction_count(buyer_address),
        "gas": 300000,
        "gasPrice": w3.eth.gas_price
    })

    signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    return w3.eth.wait_for_transaction_receipt(tx_hash)