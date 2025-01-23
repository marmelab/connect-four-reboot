.PHONY: help build

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install npm dependencies for the cli and spa interfaces
	npm install

build: ## Build both cli and spa interfaces
	npm run build 

dev-cli: ## Run the cli interface
	npm run dev-cli

dev-spa: ## Run the spa server
	npm run dev-spa

dev-api: ## Run the api server
	npm run dev-api

test: ## Run tests
	npm run test

type-check: ## Check types validity
	npm run type-check

clear: ## Cleans up various build-related directories like dist, node_modules, and build for both cli and spa interfaces
	npm run clear 
