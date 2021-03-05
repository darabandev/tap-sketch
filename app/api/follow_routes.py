from flask import Blueprint, request
from flask_login import login_required
from app.models import User, follow

follow_routes = Blueprint("follows", __name__)


@follow_routes.route("/new", methods=["POST"])
@login_required
def new_follow():
    follow_obj = request.get_json()

    follow = Follow(
        user_being_followed=follow_obj["user_being_followed"],
        user_following=follow_obj["user_following"]
    )

    db.session.add(follow)
    db.session.commit()

    return follow.to_dict()
