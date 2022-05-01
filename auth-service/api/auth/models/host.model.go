package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Host struct {
	ID       primitive.ObjectID `json:"id"`
	Name     string             `json:"name"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
}
