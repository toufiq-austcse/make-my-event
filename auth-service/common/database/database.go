package database

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
)

const HOSTS_COLLECTION_NAME string = "hosts"

func SetupDatabaseConnection() *mongo.Database {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(os.Getenv("DB_URL")))
	if err != nil {
		fmt.Println("Error in DB connection setup ", err.Error())
		os.Exit(1)
	}
	fmt.Println("MongoDB Connection Success")
	db := client.Database(os.Getenv("DB_NAME"))
	fmt.Println("DB Ready")
	return db
}
