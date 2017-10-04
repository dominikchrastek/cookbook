package recipe

import (
	"cookbook/api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

const getQuery = `
	SELECT * FROM recipe WHERE id = $1
`

// Get recipe
func (r *Routes) Get(c *gin.Context) {
	data := &models.Recipe{}
	id := c.Param("id")
	err := r.Db.Get(data, getQuery, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "recipe not found",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})

}
