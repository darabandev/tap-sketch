from .db import db


class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    user_following = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_being_followed = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="follows")

    def to_dict(self):
        return {
            "id": self.id,
            "user_following": self.user_following,
            "user_being_followed": self.user_being_followed
        }
