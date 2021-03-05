from flask import Blueprint, jsonify, request
from app.models import User, Drawing, db
import json

drawing_routes = Blueprint("drawings", __name__)


@drawing_routes.route("/new", methods=["POST"])
def new_drawing():
    drawing_obj = request.get_json()

    drawing = Drawing(
        user_id=drawing_obj["user_id"],
        username=drawing_obj["username"],
        caption=drawing_obj["caption"],
        data_url=drawing_obj["data_url"]
    )

    db.session.add(drawing)
    db.session.commit()

    return drawing.to_dict()


@drawing_routes.route("/<int:id>")
def get_one_drawing(id):
    drawing = Drawing.query.get(id)

    return drawing.to_dict()


@drawing_routes.route("/user/<username>")
def user(username):
    user = User.query.filter(User.username == username).one()
    drawings = Drawing.query.filter(Drawing.user_id == user.id).all()
    data = [drawing.to_dict() for drawing in drawings]

    return json.dumps(data, default=str)
