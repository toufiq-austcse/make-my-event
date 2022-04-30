package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
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

func main() {
	LoadEnv(".env")
	var (
	//db             = database.SetupDatabaseConnection()
	//userRepository = repositories.NewUserRepository(db)
	//todoRepository = repositories.NewTodoRepository(db)
	//userService    = services.NewUserService(userRepository)
	//todoService    = services.NewTodoService(todoRepository)
	//authService    = services.NewAuthService(userService)
	//authController = controllers.NewAuthController(authService)
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

	err := ginEngine.Run(os.Getenv("PORT"))
	if err != nil {
		fmt.Println("Cannot run the project ", err.Error())
		return
	}

}
