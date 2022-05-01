package service

import (
	"context"
	"github.com/make-my-event/auth-service/api/auth/dto"
	"github.com/make-my-event/auth-service/api/auth/models"
	"github.com/make-my-event/auth-service/common/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	db         *mongo.Database
	jwtService JwtService
}

func NewAuthService(db *mongo.Database, jwtService JwtService) AuthService {
	return AuthService{
		db:         db,
		jwtService: jwtService,
	}
}

func hashAndSaltPassword(password []byte) (hashPassword string, err error) {
	hashedPassword, hashErr := bcrypt.GenerateFromPassword(password, bcrypt.MinCost)
	if hashErr != nil {
		return "", hashErr
	}
	return string(hashedPassword), nil
}

func checkPassword(givenPassword []byte, dbPassword []byte) (isMatched bool, err error) {
	matchErr := bcrypt.CompareHashAndPassword(dbPassword, givenPassword)
	if matchErr != nil {
		return false, matchErr
	}
	return true, nil
}

func (authService AuthService) Insert(dto dto.HostRegisterRequest) (host models.Host, err error) {
	hashedPassword, hashError := hashAndSaltPassword([]byte(dto.Password))
	if hashError != nil {
		return models.Host{}, hashError
	}
	dto.Password = hashedPassword
	newHost, insertErr := authService.db.Collection(database.HOSTS_COLLECTION_NAME).InsertOne(context.TODO(), dto)
	if insertErr != nil {
		return models.Host{}, insertErr
	}
	return models.Host{
		ID:    newHost.InsertedID.(primitive.ObjectID),
		Name:  dto.Name,
		Email: dto.Email,
	}, nil
}

func (authService AuthService) FindByEmail(email string) (host models.Host, err error) {
	result := authService.db.Collection(database.HOSTS_COLLECTION_NAME).FindOne(context.TODO(), bson.M{"email": email})
	if result.Err() != nil {
		if result.Err().Error() == "mongo: no documents in result" {
			return models.Host{}, nil
		}
		return models.Host{}, result.Err()
	}
	var currentHost models.Host
	if decodeErr := result.Decode(&currentHost); decodeErr != nil {
		return models.Host{}, result.Err()
	}

	return currentHost, nil

}

func (authService AuthService) RegistrationHost(dto dto.HostRegisterRequest) (token string, expireAt int64, err error) {
	host, insertError := authService.Insert(dto)
	if err != nil {
		return "", 0, insertError
	}
	token, expireAt, tokenErr := authService.jwtService.GenerateToken(host.ID.String())
	if tokenErr != nil {
		return "", 0, tokenErr
	}
	return token, expireAt, nil
}

func (authService AuthService) LoginHost(dto dto.HostLoginRequest) (token string, expireAt int64, isPasswordMatched bool, err error) {
	host, findErr := authService.FindByEmail(dto.Email)
	if findErr != nil {
		return "", 0, false, findErr
	}
	matched, _ := checkPassword([]byte(dto.Password), []byte(host.Password))
	if !matched {
		return "", 0, false, nil
	}

	token, expireAt, tokenErr := authService.jwtService.GenerateToken(host.ID.String())
	if tokenErr != nil {
		return "", 0, false, tokenErr
	}
	return token, expireAt, true, nil
}
