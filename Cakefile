fs = require 'fs'

{print} = require 'util'
{spawn} = require 'child_process'

build = (callback) ->
	coffee = spawn 'coffee', ['-c', '-o', './public/libs/js', './public/src'] 
	coffee.stderr.on 'data', (data) ->
		process.stderr.write data.toString()

	coffee.stdout.on 'data', (data) ->
		print data.toString() 
	coffee.on 'exit', (code) ->
		callback?() if code is 0

task 'build', 'Build ./public/libs/js/ from ./public/src/', -> 
	build()

task 'watch', 'Watch ./public/src/ for changes', ->
	coffee = spawn 'coffee', ['-cw', '-o', './public/libs/js', './public/src/']
	coffee.stderr.on 'data', (data) -> 
		process.stderr.write data.toString()
	coffee.stdout.on 'data', (data) -> 
		print data.toString()