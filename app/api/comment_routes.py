from flask import Blueprint
from flask_login import login_required
from app.models import Comment, db
from datetime import datetime
from sqlalchemy import desc

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/new", methods=["POST"])
@login_required
def new_comment():
    comment_obj = request.get_json()

    user_id = comment_obj["user_id"]
    drawing_id = comment_obj["drawing_id"]
    comment_text = comment_obj["comment"]

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
