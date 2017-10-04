package recipe

import (
	"gopi/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

const postQuery = `
	INSERT INTO recipe (id, name, description, likes)
	VALUES (:id, :name, :description, :likes)
	RETURNING id
`

// Post create recipe
func (r *Routes) Post(c *gin.Context) {
	data := &models.Challenge{}
	if err := c.BindJSON(data); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	stmt, err := r.Db.PrepareNamed(postQuery)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	var id string
	err = stmt.QueryRow(data).Scan(&id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": id,
	})

}
