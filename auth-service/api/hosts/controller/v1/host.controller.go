package authV1

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/make-my-event/auth-service/api/hosts/dto"
	"github.com/make-my-event/auth-service/api/hosts/models"
	"github.com/make-my-event/auth-service/api/hosts/service"
	"github.com/make-my-event/auth-service/common/helper"
	"net/http"
)

type HostController struct {
	hostService service.HostService
}

func NewHostController(authService service.HostService) HostController {
	return HostController{
		hostService: authService,
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
func (controller HostController) Register(ctx *gin.Context) {
	var body dto.HostRegisterRequest
	if err := ctx.ShouldBind(&body); err != nil {
		response := helper.BuildErrorResponse("Failed to process the request", err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	currentHost, err := controller.hostService.FindByEmail(body.Email)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to find the email", err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, response)
		return
	} else if currentHost != (models.Host{}) {
		response := helper.BuildErrorResponse("This email already exists", "", nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	token, expireAt, err := controller.hostService.RegistrationHost(body)
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
// @Success      200 {object} helper.Response{status=boolean,message=string,errors=[]string,data=object{token=string,expire_at=int64}} "desc"
// @Failure      400 {object} helper.Response{status=boolean,message=string,errors=[]string,data=object} "desc"
// @Failure      500
// @Router       /login [post]
func (controller HostController) Login(ctx *gin.Context) {
	var body dto.HostLoginRequest
	if err := ctx.ShouldBind(&body); err != nil {
		response := helper.BuildErrorResponse("Failed to process the request", err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	token, expireAt, isPasswordMatched, loginErr := controller.hostService.LoginHost(body)
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

// login hosts godoc
// @Summary      Get Host Details
// @Schemes
// @Tags         Auth
// @Security Authorization
// @name Authorization
// @Accept       json
// @Produce      json
// @Success      200 {object} helper.Response{status=boolean,message=string,errors=[]string,data=object{id=string,name=string,email=string}} "desc"
// @Failure      400 {object} helper.Response{status=boolean,message=string,errors=[]string,data=object} "desc"
// @Failure      500
// @Router       /me [get]
func (controller HostController) Me(ctx *gin.Context) {
	fmt.Println("called")
	user, isExists := ctx.Get("user")
	if !isExists {
		response := helper.BuildErrorResponse("Unauthenticated", "Invalid token", nil)
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, response)
		return
	}
	host := user.(models.Host)
	response := helper.BuildResponse(true, "Authorized", gin.H{
		"id":	host.ID,
		"name":  host.Name,
		"email": host.Email,
	})
	ctx.JSON(http.StatusOK, response)
	return

}
