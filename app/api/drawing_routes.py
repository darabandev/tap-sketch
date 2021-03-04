from flask import Blueprint, jsonify, request
from app.models import User, Drawing, db

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
