package dto

// swagger:parameters HostRegisterRequest
type HostRegisterRequest struct {
	// required: true
	Name string `json:"name" binding:"required"`

	// required: true
	Email string `json:"email" binding:"required,email"`

	// required: true
	Password string `json:"password" binding:"required,gte=3"`
}

// swagger:parameters HostLoginRequest
type HostLoginRequest struct {
	// required: true
	Email string `json:"email" binding:"required,email"`

	// required: true
	Password string `json:"password" binding:"required,gte=3"`
}
