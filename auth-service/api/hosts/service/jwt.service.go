package service

import (
	"fmt"
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
		issuer:    "hosts-service",
	}
}

func (jwtService JwtService) GenerateToken(id string) (token string, expireAt int64, err error) {
	fmt.Println("id ", id)
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

func (jwtService JwtService) VerifyToken(token string) (*jwt.Token, error) {
	return jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		_, ok := t.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, fmt.Errorf("unexpected singing method %v", t.Header["alg"])
		}
		return []byte(jwtService.secretKey), nil
	})
}

func (jwtService JwtService) GetUserIdFromToken(token *jwt.Token) (userId string, err error) {
	claims := token.Claims.(jwt.MapClaims)
	fmt.Println("claims ", claims)
	return claims["user_id"].(string), nil
}
