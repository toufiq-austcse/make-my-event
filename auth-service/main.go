package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	authV1 "github.com/make-my-event/auth-service/api/auth/controller/v1"
	"github.com/make-my-event/auth-service/api/auth/service"
	"github.com/make-my-event/auth-service/common/database"
	_ "github.com/make-my-event/auth-service/docs"
	"github.com/swaggo/files"       // swagger embed files
	"github.com/swaggo/gin-swagger" // gin-swagger middleware
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
// @BasePath  /api/v1/auth

// @securityDefinitions.basic  BasicAuth
func main() {
	LoadEnv(".env")
	var (
		db = database.SetupDatabaseConnection()
		//userRepository = repositories.NewUserRepository(db)
		//todoRepository = repositories.NewTodoRepository(db)
		//userService    = services.NewUserService(userRepository)
		//todoService    = services.NewTodoService(todoRepository)
		jwtService     = service.NewJwtService()
		authService    = service.NewAuthService(db, jwtService)
		authController = authV1.NewAuthController(authService)
		//todoController = controllers.NewTodoController(todoService)
	)
	ginEngine := gin.Default()
	ginEngine.GET("/", func(context *gin.Context) {
		h := gin.H{
			"message": "Auth Service is running",
		}
		context.JSON(200, h)
		return
	})
	authV1Routes := ginEngine.Group("api/v1/auth")
	{
		authV1Routes.POST("/register", authController.Register)
		authV1Routes.POST("/login", authController.Login)
		authV1Routes.GET("/me", authController.Me)
	}
	ginEngine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	err := ginEngine.Run(os.Getenv("PORT"))
	if err != nil {
		fmt.Println("Cannot run the project ", err.Error())
		return
	}

}
