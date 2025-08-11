import sqlite3

# Connect to the existing database
conn = sqlite3.connect('quizzes.db')
cursor = conn.cursor()

# Sample students
students = [
    ("Giorgos Papavasileiou", "FG1", "pagiorgos"),
    ("Dimitris Patsias", "FG1", "padimitris"),
    ("Maria Stamou", "FG1", "stamaria"),
    ("Elena Papa", "FG2", "papelena"),
    ("Nikos Aggelopoulos", "FG2", "aggenikos"),
    ("Ioanna Dimitrakopoulou", "FG2", "dimioanna"),
]

# Sample teachers
teachers = [
    ("Grigorios Papadopoulos", "FG1"),
    ("Aggeliki Nikolaou", "FG2"),
]


# Sample multiple-choice quizzes
multiple_choice_quizzes = [
    ("MathF", "FG1", "What is 2 + 2?", "1", "2", "3", "4", "D"),
    ("MathF", "FG1", "What is 3 * 3?", "6", "7", "9", "8", "C"),
]

# Sample right-wrong quizzes
right_wrong_quizzes = [
    ("MathF", "FG1", "Is 5 greater than 3?", True),
    ("MathF", "FG1", "Is 2 less than 1?", False),
]

# Sample fill-in-the-blank quizzes
fill_blank_quizzes = [
    ("MathF", "FG1","What is the square root of 16?", "4"),
    ("MathF", "FG1","What is 10 divided by 2?", "5"),
]


# Insert students
for name, class_code, code in students:
    try:
        cursor.execute(
            "INSERT INTO students (name, class_code, code) VALUES (?, ?, ?)",
            (name, class_code, code)
        )
    except sqlite3.IntegrityError:
        print(f"⚠️ Student '{code}' already exists")

# Insert teachers
for username, class_code in teachers:
    try:
        cursor.execute(
            "INSERT INTO teachers (username, class_code) VALUES (?, ?)", (username, class_code)
        )
    except sqlite3.IntegrityError:
        print(f"⚠️ Teacher '{username}' already exists")

# Insert multiple-choice quizzes
for lesson, class_code, question, answerA, answerB, answerC, answerD, correctAnswer in multiple_choice_quizzes:
    cursor.execute(
        "INSERT INTO multiple_choice_quizzes (lesson, class_code, question, answerA, answerB, answerC, answerD, correctAnswer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (lesson, class_code, question, answerA, answerB, answerC, answerD, correctAnswer)
    )

# Insert right-wrong quizzes
for lesson, class_code, question, correct_answer in right_wrong_quizzes:
    cursor.execute(
        "INSERT INTO right_wrong_quizzes (lesson, class_code, question, correct_answer) VALUES (?, ?, ?, ?)",
        (lesson, class_code, question, correct_answer)
    )

# Insert fill-in-the-blank quizzes
for lesson, class_code, question, answer in fill_blank_quizzes:
    cursor.execute(
        "INSERT INTO fill_blank_quizzes (lesson, class_code, question, answer) VALUES (?, ?, ?, ?)",
        (lesson, class_code, question, answer)
    ) 
   
# Commit changes and close
conn.commit()
conn.close()

print("✅ Sample students and quizzes inserted successfully.")
