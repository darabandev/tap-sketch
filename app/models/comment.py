from .db import db
# comment


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False,)
    drawing_id = db.Column(db.Integer, db.ForeignKey(
        "drawings.id"), nullable=False,)
    comment = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", back_populates="comments")
    drawing = db.relationship("Drawing", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "drawing_id": self.drawing_id,
            "comment": self.comment,
            "created_at": self.created_at
        }
