package authV1

import (
	"github.com/gin-gonic/gin"
	"github.com/make-my-event/auth-service/api/auth/dto"
	"github.com/make-my-event/auth-service/api/auth/models"
	"github.com/make-my-event/auth-service/api/auth/service"
	"github.com/make-my-event/auth-service/common/helper"
	"net/http"
)

type AuthController struct {
	authService service.AuthService
}

func NewAuthController(authService service.AuthService) AuthController {
	return AuthController{
		authService: authService,
	}
}

// register hosts godoc
// @Summary      Create host account
// @Schemes
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Param		 reqeust body dto.HostRegisterRequest true "Register Host"
// @Success      201 {object} helper.Response{status=boolean,message=string,errors=[]string,data=object{token=string,expire_at=int64}} "desc"
// @Failure      400 {object} helper.Response{status=boolean,message=string,errors=[]string,data=object} "desc"
// @Failure      500
// @Router       /register [post]
func (controller AuthController) Register(ctx *gin.Context) {
	var body dto.HostRegisterRequest
	if err := ctx.ShouldBind(&body); err != nil {
		response := helper.BuildErrorResponse("Failed to process the request", err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	currentHost, err := controller.authService.FindByEmail(body.Email)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to find the email", err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, response)
		return
	} else if currentHost != (models.Host{}) {
		response := helper.BuildErrorResponse("This email already exists", "", nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	token, expireAt, err := controller.authService.RegistrationHost(body)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to register", err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, response)
		return
	}
	response := helper.BuildResponse(true, "Registration Successful", gin.H{
		"token":     token,
		"expire_at": expireAt,
	})

	ctx.JSON(http.StatusCreated, response)
	return
}

// login hosts godoc
// @Summary      Login host account
// @Schemes
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Param		 reqeust body dto.HostLoginRequest true "Login Host"
// @Success      201 {object} helper.Response{status=boolean,message=string,errors=[]string,data=object{token=string,expire_at=int64}} "desc"
// @Failure      400 {object} helper.Response{status=boolean,message=string,errors=[]string,data=object} "desc"
// @Failure      500
// @Router       /login [post]
func (controller AuthController) Login(ctx *gin.Context) {
	var body dto.HostLoginRequest
	if err := ctx.ShouldBind(&body); err != nil {
		response := helper.BuildErrorResponse("Failed to process the request", err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	token, expireAt, isPasswordMatched, loginErr := controller.authService.LoginHost(body)
	if loginErr != nil {
		response := helper.BuildErrorResponse("Failed to Login", loginErr.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, response)
		return
	}
	if !isPasswordMatched {
		response := helper.BuildErrorResponse("Incorrect Password", "", nil)
		ctx.AbortWithStatusJSON(http.StatusForbidden, response)
		return
	}
	response := helper.BuildResponse(true, "Login Success", gin.H{
		"token":     token,
		"expire_at": expireAt,
	})
	ctx.JSON(http.StatusOK, response)
	return

}

func (controller AuthController) Me(ctx *gin.Context) {
	response := gin.H{
		"message": "me Endpoint",
	}
	ctx.JSON(200, response)
	return
}
