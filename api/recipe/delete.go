package recipe

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const delete = `
DELETE FROM
	recipe
WHERE
	id = $1;
`

// Delete recipe
func (r *Routes) Delete(c *gin.Context) {
	id := c.Param("id")
	if _, err := r.Db.Exec(delete, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})

}
