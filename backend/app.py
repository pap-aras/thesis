from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests (important for React)

DB_PATH = 'quizzes.db'

# Helper function to query the database
def get_student_by_code(code):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, class_code, score FROM students WHERE code=?", (code,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        return None  # No student found

    # Unpack only if row exists
    id, name, class_code, score = row
    return {
        "id": id,
        "name": name,
        "class_code": class_code,
        "score": score
    }


# 📡 API route: Get student by code
@app.route('/api/student/<code>', methods=['GET'])
def get_student(code):
    student_data = get_student_by_code(code)

    if not student_data:
        return jsonify({"error": "Student not found"}), 404

    return jsonify(student_data)

# 📚 API route: Teacher login by class code
@app.route('/api/teacher/login', methods=['POST'])
def teacher_login_by_class_code():
    data = request.json
    class_code = data.get("class_code")

    if not class_code:
        return jsonify({"error": "Παρακαλώ εισάγεται τον κωδικό"}), 400

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, username FROM teachers WHERE UPPER(class_code) = ?", (class_code.upper(),))
    result = cursor.fetchone()
    conn.close()

    if result:
        teacher_id, username = result
        return jsonify({
            "message": "Login successful",
            "teacher_id": teacher_id,
            "username": username,
            "class_code": class_code.upper()
        })
    else:
        return jsonify({"error": "Λάθος κωδικός"}), 401

@app.route('/api/multiple-choice-quizzes', methods=['POST'])
def add_multiple_choice_quiz():
    data = request.json
    teacher_username = 'Grigorios Papadopoulos'  # Replace with actual teacher username from request

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        # Get teacher's class
        cursor.execute('SELECT class_code FROM teachers WHERE username = ?', (teacher_username,))
        result = cursor.fetchone()
        if not result:
            return jsonify({"error": "Teacher not found"}), 400

        teacher_class = result[0]

        # Insert quiz with class
        cursor.execute('''
            INSERT INTO multiple_choice_quizzes (class_code, lesson, question, answerA, answerB, answerC, answerD, correctAnswer)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            teacher_class, data['lesson'], data['question'], data['answerA'], data['answerB'], data['answerC'], data['answerD'], data['correctAnswer']
        ))

        conn.commit()
        conn.close()

        return jsonify({"message": "Quiz saved successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/right-wrong-quizzes', methods=['POST'])
def add_right_wrong_quiz():
    data = request.json
    teacher_username = 'Grigorios Papadopoulos'

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        # Get teacher's class
        cursor.execute('SELECT class_code FROM teachers WHERE username = ?', (teacher_username,))
        result = cursor.fetchone()
        if not result:
            return jsonify({"error": "Teacher not found"}), 400

        teacher_class = result[0]

        # Insert quiz with class
        cursor.execute('''
            INSERT INTO right_wrong_quizzes (class_code, lesson, question, correct_answer)
            VALUES (?, ?, ?, ?)
        ''', (teacher_class, data['lesson'], data['question'], int(data['correctAnswer'])))
        conn.commit()
        conn.close()
        return jsonify({"success": True}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/api/fill-blank-quizzes', methods=['POST'])
def add_fill_blank_quiz():
    data = request.json
    teacher_username = 'Grigorios Papadopoulos'

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

         # Get teacher's class
        cursor.execute('SELECT class_code FROM teachers WHERE username = ?', (teacher_username,))
        result = cursor.fetchone()
        if not result:
            return jsonify({"error": "Teacher not found"}), 400

        teacher_class = result[0]

        # Insert quiz with class
        cursor.execute('''
            INSERT INTO fill_blank_quizzes (class_code, lesson, question, answer)
            VALUES (?, ?, ?, ?)
        ''', (teacher_class, data['lesson'], data['question'], data['answer']))
        conn.commit()
        conn.close()
        return jsonify({"success": True}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/all_quizzes/<grade>', methods=['GET'])
def get_all_quizzes(grade):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # ✅ Enable dictionary-like row access
    cursor = conn.cursor()

    cursor.execute("""
    SELECT 'right_wrong_quizzes' AS type, id, class_code, question,
           correct_answer,
           NULL AS answerA, NULL AS answerB, NULL AS answerC, NULL AS answerD,
           NULL AS answer
    FROM right_wrong_quizzes
    WHERE class_code = ?

    UNION ALL

    SELECT 'multiple_choice_quizzes' AS type, id, class_code, question,
           correctAnswer AS correct_answer,
           answerA, answerB, answerC, answerD,
           NULL AS answer
    FROM multiple_choice_quizzes
    WHERE class_code = ?

    UNION ALL

    SELECT 'fill_blank_quizzes' AS type, id, class_code, question,
           NULL AS correct_answer,
           NULL AS answerA, NULL AS answerB, NULL AS answerC, NULL AS answerD,
           answer
    FROM fill_blank_quizzes
    WHERE class_code = ?
    """, (grade, grade, grade))

    quizzes = cursor.fetchall()
    conn.close()

    result = []
    for q in quizzes:
        if q["type"] == 'right_wrong_quizzes':
            result.append({
                "type": q["type"],
                "id": q["id"],
                "class_code": q["class_code"],
                "question": q["question"],
                "correct_answer": q["correct_answer"]
            })
        elif q["type"] == 'multiple_choice_quizzes':
            result.append({
                "type": q["type"],
                "id": q["id"],
                "class_code": q["class_code"],
                "question": q["question"],
                "correct_answer": q["correct_answer"],
                "answerA": q["answerA"],
                "answerB": q["answerB"],
                "answerC": q["answerC"],
                "answerD": q["answerD"]
            })
        elif q["type"] == 'fill_blank_quizzes':
            result.append({
                "type": q["type"],
                "id": q["id"],
                "class_code": q["class_code"],
                "question": q["question"],
                "answer": q["answer"]
            })

    return jsonify(result)

app.route('/api/quizzes/<lesson>', methods=['GET'])
def get_quizzes(lesson):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    quizzes = []

    # Multiple choice
    cursor.execute("""
        SELECT question, answerA, answerB, answerC, answerD, correctAnswer
        FROM multiple_choice_quizzes
        WHERE lesson = ?
    """, (lesson,))
    for row in cursor.fetchall():
        quizzes.append({
            "question": row["question"],
            "type": "multiple-choice",
            "options": {
                "A": row["answerA"],
                "B": row["answerB"],
                "C": row["answerC"],
                "D": row["answerD"]
            },
            "correctAnswer": row["correctAnswer"]
        })

    # Right wrong
    cursor.execute("""
        SELECT question, correct_answer
        FROM right_wrong_quizzes
        WHERE lesson = ?
    """, (lesson,))
    for row in cursor.fetchall():
        quizzes.append({
            "question": row["question"],
            "type": "right_wrong",
            "correctAnswer": "right" if row["correct_answer"] else "wrong"
        })

    # Fill in the blank
    cursor.execute("""
        SELECT question, answer
        FROM fill_blank_quizzes
        WHERE lesson = ?
    """, (lesson,))
    for row in cursor.fetchall():
        quizzes.append({
            "question": row["question"],
            "type": "fill-blank",
            "correctAnswer": row["answer"]
        })

    conn.close()
    return jsonify(quizzes)

# ▶️ Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

