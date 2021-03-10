from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Drawing, db
from sqlalchemy import desc

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/username/<username>", endpoint="get_user")
def user(username):
    user = User.query.filter(User.username == username).one()
    return user.to_dict()


@user_routes.route("/follow", methods=["POST"])
@login_required
def follow_user():
    request_obj = request.get_json()

    follower = User.query.get(request_obj["user_following"])
    followed = User.query.get(request_obj["user_being_followed"])

    followed.followers.append(follower)
    db.session.commit()

    return followed.to_dict()


@user_routes.route("/unfollow", methods=["POST"])
@login_required
def unfollow_user():
    request_obj = request.get_json()

    follower = User.query.get(request_obj["user_following"])
    followed = User.query.get(request_obj["user_being_followed"])

    followed.followers.remove(follower)
    db.session.commit()

    return followed.to_dict()


@user_routes.route("/following/<int:id>")
@login_required
def show_followed_users(id):
    user = User.query.get(id)

    following = [user.id for user in user.follows]

    drawings = Drawing.query.filter(Drawing.user_id.in_(
        following)).order_by(desc(Drawing.created_at)).all()

    return {"drawings": [drawing.to_dict() for drawing in drawings]}


@user_routes.route("/image/<int:id>")
@login_required
def get_profile_img(id):
    user = User.query.get(id)

    return {"profile_img": user.profile_img}
