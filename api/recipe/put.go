package recipe

import (
	"cookbook/api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

const putQuery = `
	UPDATE recipe
	SET name = :name, description = :description, likes = :likes
	WHERE id = :id
	RETURNING id
`

// Put update recipe
func (r *Routes) Put(c *gin.Context) {
	data := &models.Recipe{}
	if err := c.BindJSON(data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	stmt, err := r.Db.PrepareNamed(putQuery)
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
