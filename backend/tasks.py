import parser
from flask_restx import Resource, Namespace, fields
from flask import request
from models import tasks
from flask_jwt_extended import jwt_required
from flask_restx import reqparse

parser = reqparse.RequestParser()
parser.add_argument('id', type=int, help='User ID')



task_ns = Namespace("tasks", description="All tasks manager")

tasks_model = task_ns.model(
    "Tasks",
    {
        "id": fields.Integer(),
        "task":fields.String(),
        "completed": fields.Boolean()
    }
)


    
@task_ns.route('/tasks')
class TasksResource(Resource):
    @task_ns.marshal_list_with(tasks_model)
    def get(self):
        args = parser.parse_args()
        user_id = args.get('id')
        user_tasks = tasks.query.filter_by(Userid=user_id).all()
        # user_tasks = tasks.query.all()
        return user_tasks
    
    @task_ns.marshal_list_with(tasks_model)
    @task_ns.expect(tasks_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        
        new_task = tasks(
            task = data.get('task'),
            completed = data.get('completed'),
            Userid = data.get('Userid')
        )
        new_task.save()
        return new_task,201

@task_ns.route('/tasks/<id>')
class taskResource(Resource):
    @task_ns.marshal_with(tasks_model)
    @jwt_required()
    def get(self, id):
       
        recipe = tasks.query.get_or_404(id)

        return recipe

    @task_ns.marshal_with(tasks_model)
    @jwt_required()
    def put(self, id):

       

        task_to_update = tasks.query.get_or_404(id)

        data = request.get_json()

        task_to_update.update(data.get("task"), data.get("completed"))

        return task_to_update

    @task_ns.marshal_with(tasks_model)
    @jwt_required()
    def delete(self, id):
        

        task_to_delete = tasks.query.get_or_404(id)

        task_to_delete.delete()

        return task_to_delete