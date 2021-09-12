def create_tables(db):
    cursor = db.cursor()

    cursor.execute("DROP TABLE IF EXISTS answer")
    cursor.execute("DROP TABLE IF EXISTS question")
    cursor.execute("DROP TABLE IF EXISTS user")

    cursor.execute("CREATE TABLE user ( \
                     id INTEGER PRIMARY KEY AUTO_INCREMENT, \
                     name VARCHAR(20) NOT NULL, \
                     surname VARCHAR(20) NOT NULL, \
                     username VARCHAR(20) UNIQUE NOT NULL, \
                     password TEXT NOT NULL \
                  )"
                 )
    cursor.execute("CREATE TABLE question ( \
                     id INTEGER PRIMARY KEY AUTO_INCREMENT, \
                     author_id INTEGER NOT NULL, \
                     created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
                     title TEXT NOT NULL, \
                     body TEXT NOT NULL, \
                     FOREIGN KEY (author_id) REFERENCES user (id) \
                  )"
                 )
    cursor.execute("CREATE TABLE answer ( \
                     id INTEGER PRIMARY KEY AUTO_INCREMENT, \
                     author_id INTEGER NOT NULL, \
                     question_id INTEGER NOT NULL, \
                     created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
                     body TEXT NOT NULL, \
                     FOREIGN KEY (author_id) REFERENCES user (id), \
                     FOREIGN KEY (question_id) REFERENCES question (id) \
                     ON DELETE CASCADE \
                   )"
                 )

    cursor.close()
    db.commit()
