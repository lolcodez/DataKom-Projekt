const gulp    = require('gulp');
const uglify  = require('gulp-uglify');
const webpack = require('webpack-stream');
const named   = require('vinyl-named');

gulp.task(
    'build',
    () => {
        gulp.src('src/*.js')
            .pipe(named())
            .pipe(webpack({
                module: {
                    loaders: [{
                        loader: 'babel-loader'
                    }]
                }
            }))
            .pipe(uglify())
            .pipe(gulp.dest('build/'))
    }
);

gulp.task(
    'devbuild',
    () => {
        gulp.src('src/*.js')
            .pipe(named())
            .pipe(webpack({
                module: {
                    loaders: [{
                        loader: 'babel-loader'
                    }]
                }
            }))
            .pipe(gulp.dest('build/'))
    }
);

gulp.task('default', ['build']);
