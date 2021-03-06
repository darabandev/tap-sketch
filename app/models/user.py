from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .drawing_like import Drawing_Like

follows = db.Table(
    "follows",
    db.Column("id", db.Integer, primary_key=True),
    db.Column("user_following", db.Integer, db.ForeignKey("users.id")),
    db.Column("user_being_followed", db.Integer, db.ForeignKey("users.id"))
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.Text)

    comments = db.relationship("Comment", back_populates="user")
    drawings = db.relationship(
        "Drawing", secondary=Drawing_Like, back_populates="user")

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.user_being_followed == id),
        secondaryjoin=(follows.c.user_following == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_img": self.profile_img,
            "followers": [person.id for person in self.followers],
            "follows": [person.id for person in self.follows]
        }
