package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	authV1 "github.com/make-my-event/auth-service/api/hosts/controller/v1"
	"github.com/make-my-event/auth-service/api/hosts/service"
	"github.com/make-my-event/auth-service/common/database"
	"github.com/make-my-event/auth-service/common/middlewares"
	_ "github.com/make-my-event/auth-service/docs"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
	"log"
	"os"
)

func LoadEnv(envFileName string) {
	err := godotenv.Load(envFileName)
	if err != nil {
		log.Fatal("Error in loading env")
	}
	log.Println("Env Loaded")
}

// @title           Auth Service Api
// @version         1.0

// @host      localhost:3000
// @BasePath  /api/v1/hosts

//@securityDefinitions.apikey Authorization
//@in header
//@name Authorization
//@persistAuthorization true
func main() {
	LoadEnv(".env")
	var (
		db             = database.SetupDatabaseConnection()
		jwtService     = service.NewJwtService()
		hostService    = service.NewHostService(db, jwtService)
		hostController = authV1.NewHostController(hostService)
	)
	ginEngine := gin.Default()
	ginEngine.GET("/", func(context *gin.Context) {
		h := gin.H{
			"message": "Auth Service is running",
		}
		context.JSON(200, h)
		return
	})
	hostV1Route := ginEngine.Group("api/v1/hosts")
	{
		hostV1Route.POST("/register", hostController.Register)
		hostV1Route.POST("/login", hostController.Login)
		hostV1Route.GET("/me", middlewares.JwtAuthMiddleware(hostService), hostController.Me)
	}
	ginEngine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, ginSwagger.PersistAuthorization(true)))

	err := ginEngine.Run(os.Getenv("PORT"))
	if err != nil {
		fmt.Println("Cannot run the project ", err.Error())
		return
	}

}
