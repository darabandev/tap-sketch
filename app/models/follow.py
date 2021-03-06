from .db import db


class Follow(db.Model):
    __tablename__ = "follows"
    # __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    user_following = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_being_followed = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_following": self.user_following,
            "user_being_followed": self.user_being_followed
        }
