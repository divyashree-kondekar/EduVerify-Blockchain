import hashlib
import json
from time import time

class Blockchain:
    def __init__(self):
        self.chain = []
        self.pending_certs = []
        # Create Genesis Block
        self.create_block(proof=100, previous_hash='1')

    def create_block(self, proof, previous_hash=None):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'certificates': self.pending_certs,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }
        self.pending_certs = []
        self.chain.append(block)
        return block

    def add_certificate(self, student, degree, gpa):
        self.pending_certs.append({
            'student': student,
            'degree': degree,
            'gpa': gpa,
            'timestamp': time()
        })
        return self.last_block['index'] + 1

    @staticmethod
    def hash(block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    @property
    def last_block(self):
        return self.chain[-1]
    
    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i-1]

            # Check 1: Does the stored previous_hash match the actual hash of the previous block?
            if current['previous_hash'] != self.hash(previous):
                return False
        return True

    def tamper_data(self, index, new_data):
        """A helper function to simulate a hack for demonstration purposes"""
        if 0 <= index < len(self.chain):
            self.chain[index]['certificates'][0]['student'] = new_data
            return True
        return False