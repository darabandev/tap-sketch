from .db import db

Drawing_Like = db.Table("drawing_likes",
                        db.Column("drawing_id", db.Integer, db.ForeignKey(
                            "drawings.id"), nullable=False, primary_key=True)
                        db.Column("user_id", db.Integer, db.ForeignKey(
                            "users.id"), nullable=False, primary_key=True)
                        )
