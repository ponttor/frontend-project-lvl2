install:
	npm install

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules -n --no-warnings jest

test-coverage:
	npx -n --experimental-vm-modules -n --no-warnings jest -- --coverage --coverageProvider=v8

.PHONY: test