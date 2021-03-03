from .db import db, DateTime
import datetime
from .drawing_like import Drawing_Like


class Drawing(db.Model):
    __tablename__ = "drawings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False,)
    caption = db.Column(db.String(200), nullable=False)
    data_uri = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    comments = db.relationship("Comment", back_populates="drawing")
    user = db.relationship("User", secondary=Drawing_Like,
                           back_populates="drawings")
