.PHONY: help build

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

## Install
###########

install: ## Install npm dependencies for all apps
	npm install

install-spa: ## Install npm dependencies spa interfaces
	npm install --workspace connect-four-reboot-spa

install-api: ## Install npm dependencies api interfaces
	npm install --workspace connect-four-reboot-api

install-cli: ## Install npm dependencies cli interfaces
	npm install --workspace connect-four-reboot-cli

##########
## Build

build: ## Build all app
	npm run build 

build-spa: ## Build spa interface
	npm run build-spa

build-api: ## Build api interface
	npm run build-api

build-cli: ## Build cli interface
	npm run build-cli

########
## Dev

dev-cli: ## Run the cli interface
	npm run dev-cli

dev-spa: ## Run the spa server
	npm run dev-spa

dev-api: ## Run the api server
	npm run dev-api

########
## Clear

clear: ## Cleans up various build-related directories like dist, node_modules, and build for all apps
	npm run clear 

########
## Misc

test: ## Run tests
	npm run test

type-check: ## Check types validity
	npm run type-check

docker:
	docker-compose up -d	
