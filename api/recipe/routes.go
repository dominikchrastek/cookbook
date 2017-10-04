package recipe

import (
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

type Routes struct {
	Db *sqlx.DB
}

func Register(r *gin.Engine, db *sqlx.DB) {
	routes := &Routes{Db: db}

	g := r.Group("/recipe")

	g.GET("/", routes.GetAll)
	g.GET("/:id", routes.Get)
	g.POST("/:id", routes.Post)
	g.PUT("/:id", routes.Put)
	g.DELETE("/:id", routes.Delete)
}
