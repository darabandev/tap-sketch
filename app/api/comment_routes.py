from flask import Blueprint, request, json
from flask_login import login_required
from app.models import Comment, db
from datetime import datetime
from sqlalchemy import desc

comment_routes = Blueprint("comments", __name__)


def return_comments(drawing_id, comment_id):
    comments = Comment.query.filter(Comment.drawing_id == drawing_id).order_by(
        desc(Comment.created_at)).all()

    data = [comment.to_dict() for comment in comments]
    return json.dumps(data)


@comment_routes.route("/new", methods=["POST"])
@login_required
def new_comment():
    comment_obj = request.get_json()

    user_id = comment_obj["user_id"]
    drawing_id = comment_obj["drawing_id"]
    comment_text = comment_obj["comment_text"]

    comment = Comment(
        user_id=user_id,
        drawing_id=drawing_id,
        comment=comment_text
    )

    db.session.add(comment)
    db.session.commit()

    comments = Comment.query.filter(Comment.drawing_id == drawing_id).order_by(
        desc(Comment.created_at)).all()

    data = [comment.to_dict() for comment in comments]
    return json.dumps(data)


@comment_routes.route("/<int:drawing_id>")
@login_required
def get_comments(drawing_id):
    comments = Comment.query.filter(Comment.drawing_id == drawing_id).order_by(
        desc(Comment.created_at)).all()

    data = [comment.to_dict() for comment in comments]
    return json.dumps(data)


@comment_routes.route("/delete/<int:drawing_id>/<int:comment_id>",
                      methods=["DELETE"])
@login_required
def delete_comment(drawing_id, comment_id):
    comment = Comment.query.get(comment_id)

    db.session.delete(comment)
    db.session.commit()

    return return_comments(drawing_id, comment_id)
