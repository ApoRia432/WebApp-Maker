DESTDIR = ${HOME}/.local

install:
	bun install
	bun compile
	cp webapp-maker $(DESTDIR)/bin/webapp-maker
