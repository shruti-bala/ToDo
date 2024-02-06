from flask import Flask, request, jsonify, make_response
from flask_restx import Api, Resource,fields
from config import DevConfig
from models import tasks, User
from exts import db
from flask_migrate import Migrate
from auth import auth_ns
from tasks import task_ns
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_refresh_token, create_access_token, jwt_required
    

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)
with app.app_context():
    db.create_all()
migrate = Migrate(app,db)
JWTManager(app)
CORS(app)
api = Api(app, doc = '/docs')
api.add_namespace(task_ns)
api.add_namespace(auth_ns)



@app.shell_context_processor
def make_shell_context():
    return {"db": db, "Tasks": tasks, "Users": User}
    
if __name__ == "__main__":
    
    app.run()

