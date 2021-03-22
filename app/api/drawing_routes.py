from flask import Blueprint, jsonify, request, Response
from flask_login import login_required
from app.models import User, Drawing, db
import json
from sqlalchemy import desc

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
@login_required
def user(username):
    user = User.query.filter(User.username == username).one()
    drawings = Drawing.query.filter(Drawing.user_id == user.id).order_by(
        desc(Drawing.created_at)).all()
    data = [drawing.to_dict() for drawing in drawings]

    return json.dumps(data, default=str)


@drawing_routes.route("/profile", methods=["POST"])
@login_required
def set_profile_image():
    request_obj = request.get_json()

    user_id = request_obj["user_id"]
    drawing_id = request_obj["drawing_id"]

    user = User.query.get(user_id)
    drawing = Drawing.query.get(drawing_id)

    user.profile_img = drawing.data_url
    db.session.commit()

    return Response("{'a':'b'}", status=200, mimetype='application/json')


@drawing_routes.route("/like", methods=["POST"])
@login_required
def like_an_image():
    request_obj = request.get_json()

    user = User.query.get(request_obj["user_id"])
    drawing = Drawing.query.get(request_obj["drawing_id"])

    drawing.user.append(user)

    db.session.commit()

    return drawing.to_dict()


@drawing_routes.route("/unlike", methods=["POST"])
@login_required
def unlike_an_image():
    request_obj = request.get_json()

    user = User.query.get(request_obj["user_id"])
    drawing = Drawing.query.get(request_obj["drawing_id"])

    drawing.user.remove(user)

    db.session.commit()

    return drawing.to_dict()


@drawing_routes.route("/delete", methods=["DELETE"])
@login_required
def delete_drawing():
    request_obj = request.get_json()

    user = User.query.get(request_obj["user_id"])
    drawing = Drawing.query.get(request_obj["drawing_id"])

    db.session.delete(drawing)
    db.session.commit()

    drawings = Drawing.query.filter(Drawing.user_id == request_obj["user_id"]).order_by(
        desc(Drawing.created_at)).all()
    data = [drawing.to_dict() for drawing in drawings]

    return json.dumps(data, default=str)
