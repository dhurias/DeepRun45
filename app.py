from flask import Flask, render_template, redirect, url_for, request, session, flash
import psycopg2
from psycopg2.extras import RealDictCursor
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Configuration
class Config:
    SECRET_KEY = 'your_secret_key_here'
    DB_HOST = "drhscit.org"
    DB_NAME = "dr45"
    DB_USER = "dr45"
    DB_PASS = "3015"  # Hardcoded password

app.config.from_object(Config)

# Database connection function
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=app.config['DB_HOST'],
            database=app.config['DB_NAME'],
            user=app.config['DB_USER'],
            password=app.config['DB_PASS'],
            cursor_factory=RealDictCursor
        )
        print("✅ Database connected successfully")
        return conn
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return None

# Main page
@app.route('/')
def user_main():
    return render_template('UserMain.html')

# Register route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        firstname = request.form.get('firstname')
        lastname = request.form.get('lastname')
        studentid = request.form.get('studentid')
        parent_phone = request.form.get('parentphonenum')
        email = request.form.get('emailcreate')
        password = request.form.get('passwordcreate')

        print("📩 Form Data Received:", firstname, lastname, studentid, parent_phone, email)

        if not all([firstname, lastname, studentid, parent_phone, email, password]):
            flash("All fields are required!", "danger")
            return render_template('register.html')

        conn = get_db_connection()
        if conn:
            try:
                cur = conn.cursor()
                cur.execute("SELECT * FROM users WHERE email = %s", (email,))
                existing_user = cur.fetchone()

                if existing_user:
                    flash("Email already exists. Please try a different one.", "danger")
                    cur.close()
                    conn.close()
                    return redirect(url_for('register'))

                password_hash = generate_password_hash(password)

                cur.execute("""
                    INSERT INTO users (firstname, lastname, studentid, parent_phone, email, password)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (firstname, lastname, studentid, parent_phone, email, password_hash))
                
                conn.commit()
                cur.close()
                conn.close()
                
                flash("🎉 Account created successfully!", "success")
                return redirect(url_for('login'))
            except Exception as e:
                flash(f"Error: {e}", "danger")
                print(f"❌ Database error: {e}")
                conn.close()
    
    return render_template('register.html')

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('emaillogin')
        password = request.form.get('passwordlogin')

        if not email or not password:
            flash("Please fill in all fields!", "danger")
            return render_template('login.html')

        conn = get_db_connection()
        if conn:
            try:
                cur = conn.cursor()
                cur.execute("SELECT * FROM users WHERE email = %s", (email,))
                user = cur.fetchone()
                cur.close()
                conn.close()

                if user and check_password_hash(user['password'], password):
                    session['user_id'] = user['studentid']
                    session['email'] = user['email']
                    flash("Login successful!", "success")
                    return redirect(url_for('dashboard'))
                else:
                    flash("Invalid email or password", "danger")
            except Exception as e:
                flash(f"Error: {e}", "danger")
                print(f"❌ Database error: {e}")

    return render_template('login.html')

# Dashboard route
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash("Please log in first.", "warning")
        return redirect(url_for('login'))
    
    return f"Welcome {session['email']}! <a href='{url_for('logout')}'>Logout</a>"

# Logout route
@app.route('/logout')
def logout():
    session.clear()
    flash("Logged out successfully!", "info")
    return redirect(url_for('user_main'))

if __name__ == '__main__':
    app.run(debug=True)
