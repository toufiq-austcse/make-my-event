package service

import (
	"context"
	"fmt"
	"github.com/make-my-event/auth-service/api/hosts/dto"
	"github.com/make-my-event/auth-service/api/hosts/models"
	"github.com/make-my-event/auth-service/common/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type HostService struct {
	db         *mongo.Database
	jwtService JwtService
}

func NewHostService(db *mongo.Database, jwtService JwtService) HostService {
	return HostService{
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

func (authService HostService) Insert(dto dto.HostRegisterRequest) (host models.Host, err error) {
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

func (authService HostService) FindByEmail(email string) (host models.Host, err error) {
	result := authService.db.Collection(database.HOSTS_COLLECTION_NAME).FindOne(context.TODO(), bson.M{"email": email})
	fmt.Println("result ", result)
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

func (authService HostService) FindById(id string) (host models.Host, err error) {
	hostObjId, typeConvertErr := primitive.ObjectIDFromHex(id)
	if typeConvertErr != nil {
		return models.Host{}, typeConvertErr
	}
	result := authService.db.Collection(database.HOSTS_COLLECTION_NAME).FindOne(context.TODO(), bson.M{"_id": hostObjId})
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

func (authService HostService) RegistrationHost(dto dto.HostRegisterRequest) (token string, expireAt int64, err error) {
	host, insertError := authService.Insert(dto)
	if err != nil {
		return "", 0, insertError
	}
	token, expireAt, tokenErr := authService.jwtService.GenerateToken(host.ID.Hex())
	if tokenErr != nil {
		return "", 0, tokenErr
	}
	return token, expireAt, nil
}

func (authService HostService) LoginHost(dto dto.HostLoginRequest) (token string, expireAt int64, isPasswordMatched bool, err error) {
	host, findErr := authService.FindByEmail(dto.Email)
	if findErr != nil {
		return "", 0, false, findErr
	}
	matched, _ := checkPassword([]byte(dto.Password), []byte(host.Password))
	if !matched {
		return "", 0, false, nil
	}

	token, expireAt, tokenErr := authService.jwtService.GenerateToken(host.ID.Hex())
	if tokenErr != nil {
		return "", 0, false, tokenErr
	}
	return token, expireAt, true, nil
}

func (authService HostService) GetHostInfoFromToken(token string) (id primitive.ObjectID, name string, email string, err error) {
	verifiedToken, verifyErrerr := authService.jwtService.VerifyToken(token)
	if verifyErrerr != nil {
		return primitive.ObjectID{}, "", "", verifyErrerr
	}
	hostId, userErr := authService.jwtService.GetUserIdFromToken(verifiedToken)
	if userErr != nil {
		return primitive.ObjectID{}, "", "", userErr
	}
	fmt.Println("hostId ", hostId)
	host, userErr := authService.FindById(hostId)
	if userErr != nil {
		return primitive.ObjectID{}, "", "", userErr
	}
	if host == (models.Host{}) {
		return primitive.ObjectID{}, "", "", fmt.Errorf("Host not Found")
	}
	return host.ID, host.Name, host.Email, nil

}
