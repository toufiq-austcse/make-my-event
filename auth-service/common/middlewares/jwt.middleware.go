package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/make-my-event/auth-service/api/hosts/models"
	"github.com/make-my-event/auth-service/api/hosts/service"
	"github.com/make-my-event/auth-service/common/helper"
	"net/http"
	"strings"
)

func JwtAuthMiddleware(authService service.HostService) gin.HandlerFunc {
	return func(context *gin.Context) {
		authHeader := context.GetHeader("Authorization")
		if authHeader == "" {
			response := helper.BuildErrorResponse("Failed to process the request", "Authorization Required in Header", nil)
			context.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}
		if !strings.HasPrefix(authHeader, "Bearer ") {
			response := helper.BuildErrorResponse("Failed to process the request", "Token must start with Bearer", nil)
			context.AbortWithStatusJSON(http.StatusBadRequest, response)
			return
		}
		headerArr := strings.Split(authHeader, " ")
		id, name, email, err := authService.GetHostInfoFromToken(headerArr[1])
		if err != nil {
			response := helper.BuildErrorResponse("Failed to process the request", err.Error(), nil)
			context.AbortWithStatusJSON(http.StatusInternalServerError, response)
			return
		}
		context.Set("user", models.Host{
			ID:       id,
			Name:     name,
			Email:    email,
			Password: "",
		})
		context.Next()

	}

}
