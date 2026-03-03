🎓 EduVerify: Blockchain-Based Academic CredentialingEduVerify is a decentralized academic credentialing platform designed to eliminate degree fraud. By leveraging Blockchain technology, it provides a secure, immutable, and instantly verifiable way for universities to issue certificates and for employers to verify them.🏗️ Project StructureThe project follows a modular Flask architecture, organized for scalability and containerization.PlaintextEDUVERIFY/
├── app/
│   ├── static/               # Assets served by the web server
│   │   ├── css/
│   │   │   └── style.css     # Glassmorphism & Tailwind styling
│   │   └── js/
│   │       └── blockchain.js # Frontend blockchain logic & PDF engine
│   └── templates/            # HTML Views
│       ├── index.html        # Main Dashboard (Verified Ledger)
│       └── login.html        # Multi-tenant University Portal
├── blockchain.py             # Core Blockchain Class (SHA-256 logic)
├── main.py                   # Flask Application entry point
├── docker-compose.yml        # Multi-container orchestration
├── Dockerfile                # Image build configuration
└── requirements.txt          # Python dependencies
🚀 Key Features1. Multi-Tenant University NodesAllows different educational institutions (e.g., Alpha University, Beta Institute) to log in securely and manage their own certificate issuance.2. Immutable Ledger (SHA-256)Each certificate is mined into a block that contains a unique cryptographic hash and the hash of the previous block.Security: Any change to student data breaks the cryptographic link.Verification: A "Verify Integrity" tool checks the entire chain in real-time.3. Dynamic Blockchain CertificatesGenerates professional A4 PDF certificates directly from blockchain data.Digital Seal: Every PDF is stamped with the unique Block Hash.Integrity Proof: The hash on the PDF matches the fingerprint in the live ledger.🛠️ Tech StackCategoryTechnologyBackendPython (Flask)BlockchainCustom SHA-256 ChainingFrontendTailwind CSS (Glassmorphism), JavaScriptPDF Enginehtml2pdf.js / html2canvasDevOpsDocker, Docker Compose⚙️ Installation & SetupUsing Docker (Recommended)Ensure you have Docker and Docker Compose installed.Clone the repository and navigate to the folder.Run the following command:Bashdocker-compose up --build
Access the app at http://localhost:5000.Manual SetupInstall dependencies:Bashpip install -r requirements.txt
Run the application:Bashpython main.py
🛡️ Security Demonstration (Simulate Hack)The project includes a "Simulate Hack" feature.Mine a few certificate blocks.Click Simulate Hack to manually alter data in memory.Click Verify Integrity. The system will detect the hash mismatch and turn the status indicator RED, proving the data has been tampered with.🔮 Future WorkIPFS Integration: Decentralized storage for actual PDF certificate files.QR Code Verification: Direct mobile-scan verification for employers.Smart Contracts: Automated issuance based on academic credit completion.        
