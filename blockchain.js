// Real-time UI Update
function updatePreview() {
    document.getElementById('prev-name').innerText = document.getElementById('student').value || "Student Name";
    document.getElementById('prev-degree').innerText = document.getElementById('degree').value || "Degree Name";
    document.getElementById('prev-gpa').innerText = document.getElementById('gpa').value || "0.0";
}

async function fetchChain() {
    const response = await fetch('/chain');
    const data = await response.json();
    const ledger = document.getElementById('ledger');
    ledger.innerHTML = '';

    data.chain.reverse().forEach(block => {
        const div = document.createElement('div');
        div.className = 'block-card p-4 rounded-xl border border-white/5 mb-4 transition-all hover:bg-white/10';
        
        const certs = block.certificates.map(c => 
            `<div class="text-sm text-emerald-400 font-mono mt-2">Verified: ${c.student} ➜ ${c.degree}</div>`
        ).join('') || '<div class="text-xs text-gray-500 italic">System Genesis Block</div>';

        div.innerHTML = `
            <div class="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                <span>Block #${block.index}</span>
                <span>Hash: ${block.previous_hash.substring(0, 12)}...</span>
            </div>
            ${certs}
            <div class="text-[9px] text-gray-600 mt-3 text-right">${new Date(block.timestamp * 1000).toLocaleString()}</div>
        `;
        ledger.appendChild(div);
    });
}

async function issueCertificate() {
    const student = document.getElementById('student').value;
    const degree = document.getElementById('degree').value;
    const gpa = document.getElementById('gpa').value;

    // VALIDATION
    if(!student || !degree || !gpa) {
        alert("⚠️ Block Denied: All fields must be filled to maintain ledger integrity.");
        return;
    }

    const response = await fetch('/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student, degree, gpa })
    });

    if (response.ok) {
        alert('⛓️ Success: Certificate Hashed and Mined!');
        fetchChain();
    }
}


// FEATURE 1: Verify Integrity
async function verifyChain() {
    const response = await fetch('/verify');
    const data = await response.json();
    
    if (data.status === "secure") {
        alert("✅ Ledger Verified: All cryptographic hashes are intact. Data is authentic.");
    } else {
        alert("🚨 ALERT: TAMPERING DETECTED! The chain link has been broken.");
        // Change UI to red to show failure
        document.getElementById('ledger').classList.add('border-red-500', 'bg-red-900/20');
    }
}

async function simulateHack() {
    await fetch('/hack', {method: 'POST'});
    alert("⚠️ Malicious change injected into Block #1. Try verifying the chain now!");
}

// FEATURE 2: Export to PDF
// function downloadPDF() {
//     // 1. Get current date in a clean format (e.g., March 3, 2026)
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     const today = new Date().toLocaleDateString('en-US', options);

//     const studentName = document.getElementById('student').value || "Student";
//     const degreeName = document.getElementById('degree').value || "Degree";
//     const gpaValue = document.getElementById('gpa').value || "0.0";

//     // 2. Inject the dynamic date along with the other data
//     document.getElementById('pdf-name').innerText = studentName;
//     document.getElementById('pdf-degree').innerText = degreeName;
//     document.getElementById('pdf-gpa').innerText = gpaValue;
//     document.getElementById('pdf-date').innerText = today; // Dynamic Date Fixed!

//     const element = document.getElementById('pdf-blueprint');

//     const opt = {
//         margin: 0,
//         filename: `${studentName.replace(/\s+/g, '_')}_EduVerify.pdf`,
//         image: { type: 'jpeg', quality: 1.0 },
//         html2canvas: { 
//             scale: 2, 
//             useCORS: true,
//             width: 1123,
//             height: 794
//         },
//         jsPDF: { 
//             unit: 'px', 
//             format: [1123, 794], 
//             orientation: 'landscape'
//         }
//     };

//     html2pdf().set(opt).from(element).save();
// }

async function downloadPDF() {
    // 1. Fetch real-time data for the Hash
    const response = await fetch('/chain');
    const data = await response.json();
    const latestBlock = data.chain[data.chain.length - 1];
    
    // 2. Prepare dynamic fields
    const studentName = document.getElementById('student').value || "Student";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);

    // 3. Inject into the hidden Blueprint
    document.getElementById('pdf-name').innerText = studentName;
    document.getElementById('pdf-degree').innerText = document.getElementById('degree').value || "Degree";
    document.getElementById('pdf-gpa').innerText = document.getElementById('gpa').value || "0.0";
    document.getElementById('pdf-date').innerText = today;
    document.getElementById('pdf-hash').innerText = latestBlock.previous_hash.substring(0, 32) + "...";

    // 4. THE FIX: Targeting and specific configuration
    const element = document.getElementById('pdf-blueprint');
    
    const opt = {
        margin: 0,
        filename: `Verified_${studentName.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            // These 4 lines prevent the "Half-Page/Clipped" issue:
            scrollY: 0,          
            scrollX: 0,
            windowWidth: 1123,   
            windowHeight: 794    
        },
        jsPDF: { 
            unit: 'px', 
            format: [1123, 794], 
            orientation: 'landscape',
            hotfixes: ['px_scaling']
        }
    };

    // 5. Run the capture
    html2pdf().set(opt).from(element).save();
}

fetchChain();