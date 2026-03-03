from flask import Flask, jsonify, request, render_template, session, redirect
from blockchain import Blockchain
import os

app = Flask(__name__)
app.secret_key = "eduverify_secret_key" # Required for sessions
edu_chain = Blockchain()

# Mock Multi-tenant Database
USERS = {
    "admin_alpha": {"pwd": "123", "name": "University Alpha", "color": "from-blue-600 to-indigo-600"},
    "admin_beta": {"pwd": "456", "name": "University Beta", "color": "from-emerald-600 to-teal-600"}
}

@app.route('/')
def index():
    if 'user' not in session:
        return render_template('login.html') # We'll create this file next
    return render_template('index.html', user_info=USERS[session['user']])

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = USERS.get(data.get('username'))
    if user and user['pwd'] == data.get('password'):
        session['user'] = data['username']
        return jsonify({"status": "success"})
    return jsonify({"status": "fail"}), 401

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

@app.route('/issue', methods=['POST'])
def issue():
    if 'user' not in session:
        return "Unauthorized", 401

    data = request.get_json()
    # VALIDATION: Prevent empty data
    if not data.get('student') or not data.get('degree') or not data.get('gpa'):
        return jsonify({"message": "Error: All fields are required!"}), 400
    
    edu_chain.add_certificate(data['student'], data['degree'], data['gpa'])
    block = edu_chain.create_block(proof=12345)
    return jsonify({"message": "Certificate Verified & Block Mined", "block": block}), 201

@app.route('/chain', methods=['GET'])
def get_chain():
    return jsonify({'chain': edu_chain.chain, 'length': len(edu_chain.chain)}), 200

@app.route('/verify', methods=['GET'])
def verify():
    valid = edu_chain.is_chain_valid()
    return jsonify({"status": "secure" if valid else "compromised"}), 200

@app.route('/hack', methods=['POST'])
def hack():
    # Simulate an unauthorized database change
    edu_chain.tamper_data(1, "HACKED_NAME")
    return jsonify({"message": "Data tampered in memory!"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)