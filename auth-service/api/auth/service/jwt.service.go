package service

import (
	"github.com/dgrijalva/jwt-go"
	"os"
	"time"
)

type JwtService struct {
	secretKey string
	issuer    string
}

type JwtCustomClaims struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

func getSecretKey() string {
	secretKey := os.Getenv("JWT_SECRET")
	if secretKey == "" {
		secretKey = "sdfsdfsdfsd"
	}
	return secretKey
}

func NewJwtService() JwtService {
	return JwtService{
		secretKey: getSecretKey(),
		issuer:    "auth-service",
	}
}

func (jwtService JwtService) GenerateToken(id string) (token string, expireAt int64, err error) {
	expireAt = time.Now().AddDate(1, 0, 0).Unix()
	claims := JwtCustomClaims{
		UserID: id,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expireAt,
			Issuer:    jwtService.issuer,
			IssuedAt:  time.Now().Unix(),
		},
	}
	myToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, signErr := myToken.SignedString([]byte(jwtService.secretKey))
	if err != nil {
		return "", 0, signErr
	}
	return signedToken, expireAt, nil
}
