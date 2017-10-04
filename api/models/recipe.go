package models

type Recipe struct {
	ID          int    `json:"id" db:"id"`
	Name        string `json:"name" db:"name"`
	Description string `json:"description" db:"description"`
	Likes       int    `json:"likes" db:"likes"`
}
