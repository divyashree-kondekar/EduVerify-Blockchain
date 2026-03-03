🎓 EduVerify – Blockchain-Based Academic Credentialing

EduVerify is a decentralized academic credentialing platform designed to eliminate degree fraud.
By leveraging Blockchain technology (SHA-256 hashing), it provides a secure, immutable, and instantly verifiable system for universities to issue certificates and for employers to verify them.

🌍 Problem Statement

Academic certificate fraud is a growing global issue. Traditional paper-based certificates:

❌ Can be forged

❌ Are difficult to verify

❌ Require manual authentication

EduVerify solves this using a blockchain-backed verification system that ensures:

🔐 Data Integrity

📜 Immutable Certificate Records

⚡ Instant Verification

🏗️ Project Architecture

The project follows a modular Flask architecture, designed for scalability and containerized deployment.

EDUVERIFY/
│
├── app/
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── blockchain.js
│   │
│   └── templates/
│       ├── index.html
│       └── login.html
│
├── blockchain.py
├── main.py
├── docker-compose.yml
├── Dockerfile
└── requirements.txt
🚀 Key Features
1️⃣ Multi-Tenant University Nodes

Secure login for institutions (e.g., Alpha University, Beta Institute)

Each university can issue certificates independently

Role-based block creation authorization

2️⃣ Immutable Blockchain Ledger (SHA-256)

Each certificate is mined into a block containing:

Student Name

Degree

GPA

Timestamp

Previous Block Hash

Current Block Hash

🔐 Security:
Any modification to student data breaks the cryptographic chain.

🟢 Verification:
A built-in “Verify Integrity” tool recalculates all hashes in real time to ensure the chain is valid.

3️⃣ Dynamic Blockchain Certificates (PDF)

Professional A4 certificate generation

Digital seal stamped with unique Block Hash

Hash on the PDF matches the hash in the live ledger

📌 Technologies used:

html2pdf.js

html2canvas

🛠️ Tech Stack
Category	Technology
Backend	Python (Flask)
Blockchain	Custom SHA-256 Hash Chaining
Frontend	Tailwind CSS (Glassmorphism), JavaScript
PDF Engine	html2pdf.js / html2canvas
DevOps	Docker, Docker Compose
⚙️ Installation & Setup
🐳 Using Docker (Recommended)

Ensure Docker and Docker Compose are installed.

docker-compose up --build

Access the application at:

http://localhost:5000
💻 Manual Setup

Install dependencies:

pip install -r requirements.txt

Run the application:

python main.py
🛡️ Security Demonstration – Simulate Hack

EduVerify includes a built-in "Simulate Hack" feature to demonstrate blockchain immutability.

Steps:

Mine a few certificate blocks

Click Simulate Hack (modifies in-memory data)

Click Verify Integrity

🔴 The system detects hash mismatch
🟢 Status turns RED
✔️ Demonstrates tamper detection

This proves the blockchain structure prevents undetected data manipulation.

🔮 Future Enhancements

🌐 IPFS Integration
Store actual PDF certificates on decentralized storage.

📱 QR Code Verification
Employers can scan and instantly verify certificates.

📜 Smart Contracts
Automated issuance after academic credit completion.

🏛️ Consortium Blockchain
Multiple universities maintaining a shared distributed ledger.

🎯 Use Cases

Universities issuing tamper-proof degrees

Employers verifying academic credentials

Government educational boards

Online certification platforms
