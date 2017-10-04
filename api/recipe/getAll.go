package recipe

import (
	"cookbook/api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

const getAllQuery = `
	SELECT * FROM recipe;
`

// GetAll recipes
func (r *Routes) GetAll(c *gin.Context) {
	data := &[]models.Recipe{}
	err := r.Db.Select(data, getAllQuery)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})

}
