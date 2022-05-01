package helper

import "strings"

// swagger:parameters Response
type Response struct {
	Status  bool        `json:"status"`
	Message string      `json:"message"`
	Errors  []string    `json:"errors"`
	Data    interface{} `json:"data"`
}
type EmptyObj struct {
}

func BuildResponse(status bool, message string, data interface{}) Response {
	var errors = make([]string, 0)
	return Response{
		Status:  status,
		Message: message,
		Errors:  errors,
		Data:    data,
	}
}

func BuildErrorResponse(message string, err string, data interface{}) Response {
	splittedError := strings.Split(err, "\n")
	return Response{
		Status:  false,
		Message: message,
		Errors:  splittedError,
		Data:    data,
	}
}
