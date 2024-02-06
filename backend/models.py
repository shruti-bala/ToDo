from exts import db

class tasks(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer(),primary_key = True )
    task = db.Column(db.String(), nullable = False)
    completed = db.Column(db.Boolean(), default = False)
    Userid = db.Column(db.Integer, db.ForeignKey('User.id', name='fk_tasks_Userid'))

    user = db.relationship('User', backref=db.backref('tasks', lazy=True))

    def __repr__(self):
        return f"<{self.task} >"

    def save(self):
        
        db.session.add(self)
        db.session.commit()

    def delete(self):
        
        db.session.delete(self)
        db.session.commit()

    def update(self, task, completed):
       
        self.task = task  
        self.completed = completed    
        db.session.commit()


#user model

class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        """
        returns string rep of object

        """
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
