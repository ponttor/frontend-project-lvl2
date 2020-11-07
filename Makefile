install:
	npm install

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules -n --no-warnings jest

.PHONY: test