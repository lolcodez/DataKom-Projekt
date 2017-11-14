'use strict';

const gulp    = require("gulp");
const uglify  = require("gulp-uglify");
const webpack = require("webpack-stream");
const named   = require("vinyl-named");

gulp.task(
    "build",
    () => {
        gulp.src(["src/*.js", "src/*.jsx"])
            .pipe(named())
            .pipe(webpack({
                module: {
                    loaders: [
                        { test: /\.json$/, loader: "json-loader" },
                        { test: /^(\.\/|\/)?node_modules\/.*\.js$/, loader: "env-loader" },
                        { test: /\.jsx?$/, exclude: /^(\.\/|\/)?node_modules\//, loader: "babel-loader" }
                    ]
                }
            }))
            .pipe(uglify())
            .pipe(gulp.dest("build/"))
    }
);

gulp.task(
    "devbuild",
    () => {
        gulp.src(["src/*.js", "src/*.jsx"])
            .pipe(named())
            .pipe(webpack({
                module: {
                    loaders: [
                        { test: /\.json$/, loader: "json-loader" },
                        { test: /\.jsx?$/, exclude: /^(\.\/|\/)?node_modules\//, loader: "babel-loader" }
                    ]
                }
            }))
            .pipe(gulp.dest("build/"))
    }
);

gulp.task("default", ["build"]);
