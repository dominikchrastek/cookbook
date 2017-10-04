package main

import (
	"cookbook/api/recipe"
	"fmt"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "" // postgres user name
	password = "" // postgres user pwd
	dbname   = "cookbook"
)

func main() {
	app := gin.Default()

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	dbc, err := sqlx.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}

	settings := cors.Config{
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE"},
		AllowAllOrigins: true,
	}
	app.Use(cors.New(settings))
	recipe.Register(app, dbc)

	app.Run(":3000") // listen and serve on 0.0.0.0:8080
}
