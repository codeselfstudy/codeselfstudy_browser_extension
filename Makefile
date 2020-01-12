.PHONY: clean

help:
	@echo "clean - remove junk files and other cleanup"

clean:
	rm -rf ./dist
	rm -rf ./coverage
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
	find . -name '__pycache__' -exec rm -rf {} +
