import sqlite3

# Connect to (or create) the database file
conn = sqlite3.connect('quizzes.db')

# Create a cursor to execute SQL commands
cursor = conn.cursor()

# Create teachers table
cursor.execute('''
    CREATE TABLE teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    class_code TEXT UNIQUE NOT NULL
)
''')

# Create students table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        class_code TEXT NOT NULL,
        code TEXT UNIQUE NOT NULL,
        score INTEGER DEFAULT 0
    )
''')

# Create multiple-choice quiz table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS multiple_choice_quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson VARCHAR(255) NOT NULL,
    class_code TEXT,
    question TEXT NOT NULL,
    answerA TEXT NOT NULL,
    answerB TEXT NOT NULL,
    answerC TEXT NOT NULL,
    answerD TEXT NOT NULL,
    correctAnswer CHAR(1) NOT NULL
    )
''')

# Create right-wrong quiz table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS right_wrong_quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lesson VARCHAR(255) NOT NULL,
        class_code TEXT,
        question TEXT NOT NULL,
        correct_answer BOOLEAN NOT NULL
    )
''')

# Create fill-in-the-blank quiz table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS fill_blank_quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lesson VARCHAR(255) NOT NULL,
        class_code TEXT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL
    )
''')

# Commit changes and close
conn.commit()
conn.close()

print("✅ Database and tables created successfully.")
