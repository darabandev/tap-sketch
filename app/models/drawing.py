from .db import db
from sqlalchemy import DateTime
import datetime
from .drawing_like import Drawing_Like


class Drawing(db.Model):
    __tablename__ = "drawings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False,)
    username = db.Column(db.String, db.ForeignKey(
        "users.username"), nullable=False)
    caption = db.Column(db.String(200), nullable=False)
    data_url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    comments = db.relationship("Comment", back_populates="drawing")
    user = db.relationship("User", secondary=Drawing_Like,
                           back_populates="drawings")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "username": self.username,
            "caption": self.caption,
            "data_url": self.data_url,
            "created_at": self.created_at,
            "liked_by": [person.id for person in self.user],
            "likes": len(self.user),
            "comments": len(self.comments)
        }
